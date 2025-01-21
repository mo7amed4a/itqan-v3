import { getData } from "@/lib/data";
import CardUniOne from "@/components/university/template/CardUniOne";
import CardVideo from "@/components/university/template/CardVedio";
import CardConfessions from "@/components/university/template/CardConfessions";
import CardRank from "@/components/university/template/CardRank";
import CardTableData from "@/components/university/template/CardTableData";
import CardLanguage from "@/components/university/template/CardLanguage";
import CardConditionsAndRegistration from "@/components/university/template/CardConditionsAndRegistration";
import CardFaqs from "@/components/university/template/CardFaqs";
import CardDetails from "@/components/university/template/CardDetails";
import CardHouse from "@/components/university/template/CardHouse";
import Navbar from "@/components/university/template/NavbarForUniversity";
import CardAlbum from "@/components/university/template/CardAlbum";
import BreadcrumbApp from "@/components/global/breadcrumb";
import { getTranslations } from "@/lib/dictionary";

export default async function UniversitiesPage({
  params,
}: {
  params: Promise<{ locale: any; slug: string }>
}) {
  const locale = (await params).locale
  const slug = (await params).slug
  
  const {university_details} = await getTranslations(locale);
  const {breadcrumb} = await getTranslations(locale);
  let data: any = null;
  const response = await getData(`/universities/${slug}/details`, locale);
  data = response?.data;
  console.log(data);
  

  let settings;
  const responseSettings = await getData("/get_settings", locale);
  settings = responseSettings?.data;

  if (data && data?.university) {
    const { university, faqs, study_programs, student_housings } = data;
    return (
      <div className="text-start text-base text-gray-500 scroll-smooth 6xl:!container 6xl:!mx-auto">
        <section className="mt-12 px-4 lg:px-0 container lg:max-w-[85%] 6xl:!container mx-auto">
          <h1 className="text-xl md:text-2xl font-bold text-primary text-start">
            {university.name}
          </h1>
        </section>
        <div className="container lg:max-w-[85%] 6xl:!container mx-auto">
          <BreadcrumbApp lang={breadcrumb} last={university.name}/>
        </div>
        <Navbar lng={locale} name={university.name} />
        <div className="container lg:max-w-[85vw] 6xl:!container 6xl:!mx-auto mx-auto px-4 py-5">
          <h2 className="text-lg md:text-xl font-bold text-gray-500">
            {university_details.university.info} {university.name}
          </h2>
        </div>
        <CardUniOne lng={locale} university={university} />
        <div id="photos" className="6xl:!container 6xl:!mx-auto">
          <CardVideo lng={locale} university={university} />
          <CardAlbum university={university} lng={locale} />
        </div>
{/* 
// nooooooooooo
        {data.specifications && (
          <CardFeatures
            university={university}
            specifications={data.specifications}
            lng={locale}
          />
        )} */}


        {university && (
          <div id="recognitions" className="scroll-mt-96">
            <CardConfessions university={university} dataLng={university_details} />
          </div>
        )}
        {study_programs && study_programs.length > 0 && (
          <div id="specializations" className="scroll-mt-96">
            <CardTableData study_programs={data.study_programs} lng={locale} />
          </div>
        )}
        {university.description && (
          <div id="details" className="scroll-mt-96">
            <CardDetails lng={locale} university={university} />
          </div>
        )}
        
        {student_housings && (
          <CardHouse lng={locale} student_housings={student_housings} />
        )}

        {university && (
          <div id="numbers" className="scroll-mt-96">
            <CardRank university={university} lng={locale} />
          </div>
        )}
        {university && (
          <div id="languages" className="scroll-mt-96">
            <CardLanguage university={university} lng={locale} />
          </div>
        )}

        {data && (
          <div id="terms" className="scroll-mt-96">
            <CardConditionsAndRegistration lng={locale} data={data} />
          </div>
        )}
        
        {faqs && student_housings && study_programs && (
          <div id="faqs" className="scroll-mt-96">
            <CardFaqs
            lng={locale}
              faqs={faqs}
              student_housings={student_housings}
              study_programs={study_programs}
            />
          </div>
        )}
        



<script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": settings?.site_name,
            author: settings?.site_name,
            interactionStatistic: [
              {
                "@type": "InteractionCounter",
                interactionService: {
                  "@type": "WebSite",
                  name: "Twitter",
                  url: "http://www.twitter.com",
                },
                interactionType: "https://schema.org/ShareAction",
                userInteractionCount: "1203",
              },
              {
                "@type": "InteractionCounter",
                interactionType: "https://schema.org/CommentAction",
                userInteractionCount: "78",
              },
            ],
            name: university.name,
          }),
        }}
      />
      
      </div>
    );
  } else
    return (
      <div className="h-[50vh] flex justify-center items-center">
        <h1 className="text-2xl text-gray-500 font-bold">
          University Not Found
        </h1>
      </div>
    );
}
