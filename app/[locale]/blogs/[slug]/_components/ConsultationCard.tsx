import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import LinkApp from "@/components/global/LinkApp"
import { getTranslations } from "@/lib/dictionary"


export default async function ConsultationCard({
  link,
  lng
}: {
  link: string,
  lng: any
}) {
  const {blogDetails} = await getTranslations(lng)
  return (
      <Card className="w-full py-6 px-4 flex flex-col items-center gap-6 border-none">
        <h2 className="text-lg text-center font-semibold text-gray-600">
          {blogDetails.talk}
        </h2>
        <div className="relative w-full flex justify-center">
          <Image
            src={"/images/forCartRounded.png"}
            alt="Video consultation illustration"
            width={300}
            height={300}
            className="object-cover rounded-full size-64 border-4 border-gray-300"
          />
        </div>
        <LinkApp href={link}>
          <Button
            className="w-full bg-primary text-white text-lg py-6"
          >
            {blogDetails.btnTalk}
          </Button>
        </LinkApp>
      </Card>
  )
}