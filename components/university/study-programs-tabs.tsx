'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

interface Program {
  id: number
  specialization_id: number
  specialization_name: string
  study_years: number
  study_language: string
  fees: string
  annual_fees: number
  has_grant: boolean | null
  old_fees: string | null
}

interface StudyLevel {
  level_id: number
  level_name: string
  programs: Program[]
}

interface StudyProgramsTabsProps {
  studyPrograms: StudyLevel[],
  lng: string,
  university_detailsLang: any
}

export default function StudyProgramsTabs({ studyPrograms, lng, university_detailsLang }: StudyProgramsTabsProps) {
  const [activeTab, setActiveTab] = useState(studyPrograms[0]?.level_id.toString() || '')

  if (studyPrograms.length === 0) {
    return <p className="text-center text-lg">No study programs available.</p>
  }

  return (
    <Tabs value={activeTab} dir={lng === "ar" || lng === "fa" ? "rtl" : "ltr"} onValueChange={setActiveTab} className="w-full">
       <ScrollArea className='w-full' dir={lng === "ar" || lng === "fa" ? "rtl" : "ltr"}>
        <TabsList className="flex gap-4 justify-start rounded-none mb-8 bg-transparent">
          {studyPrograms.map((level) => (
            <TabsTrigger className="bg-transparent border rounded-full px-3 py-1.5" key={level?.level_id} value={level?.level_id?.toString() || ''}>
              {level?.level_name}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation='horizontal'/>
       </ScrollArea>
      {studyPrograms.map((level) => (
        <TabsContent key={level?.level_id} value={level?.level_id?.toString() || ''}>
           <Accordion type="single" collapsible className="w-full -mt-4">
      <AccordionItem value="item-1">
        <AccordionTrigger small>{level?.level_name}</AccordionTrigger>
        <AccordionContent>
      
          <div className="rounded-xl border overflow-hidden">
            <Table dir="rtl" >
              <TableHeader className="bg-primary">
                <TableRow>
                  <TableHead className="font-bold text-right border text-white md:w-2/5">{university_detailsLang.tabs.majors}</TableHead>
                  <TableHead className="font-bold text-right border text-white">{university_detailsLang.tabs.studyYears}</TableHead>
                  <TableHead className="font-bold text-right border text-white">{university_detailsLang.tabs.studyLanguage}</TableHead>
                  <TableHead className="font-bold text-right border text-white">{university_detailsLang.tabs.tuitionFee}</TableHead>
                  <TableHead className="font-bold text-right border text-white w-44">{university_detailsLang.tabs.registration}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {level?.programs?.map((program) => (
                  <TableRow key={program?.id} className="even:bg-muted-foreground/10 py-0">
                    <TableCell className="font-bold md:w-2/5 border py-1 md:py-3 text-nowrap">
                     <span>{program?.specialization_name}</span>
                    </TableCell>
                    <TableCell className='border font-bold py-1 md:py-3 text-nowrap'>{program?.study_years} {university_detailsLang.tabs.years}</TableCell>
                    <TableCell className='border font-bold py-1 md:py-3 text-nowrap'>{program?.study_language}</TableCell>
                    <TableCell className='border font-bold py-1 md:py-3 text-nowrap'>${program?.annual_fees?.toLocaleString()}</TableCell>
                    <TableCell className='border font-bold flex justify-center bg-white md:py-3 text-nowrap py-1'>
                      <Button size="xs"
                        className="bg-primary hover:bg-secondary hover:!scale-x-100 !px-8"
                      >
                        {university_detailsLang.booking_now}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          </AccordionContent></AccordionItem></Accordion>
        </TabsContent>
      ))}
    </Tabs>
  )
}

