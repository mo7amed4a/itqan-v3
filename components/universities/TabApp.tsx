import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


interface Program {
  id: number
  specialization_name: string
  study_years: number
  study_language: string
  fees: string
  annual_fees: number
  has_grant: number
}

interface StudyProgram {
  level_id: number
  level_name: string
  programs: Program[]
}

interface Housing {
  id: number
  name: string
  type: string
  capacity: number
  price: string
  beds: number
  meals: number
  internet: number
  description: string
  images: string[]
}

interface FAQ {
  id: number
  question: string
  answer: string
}

interface TabsComponentProps {
  studyPrograms: StudyProgram[]
  studentHousings: Housing[]
  faqs: FAQ[]
}

export async function FaqsComponent({ faqs}: TabsComponentProps) {
    return (
      <Accordion type="single" collapsible className='space-y-4'>
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>
            <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
      )
}
