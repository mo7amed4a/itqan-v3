import LinkApp from '@/components/global/LinkApp'
import { Button } from '@/components/ui/button'
import { getTranslations } from '@/lib/dictionary'

export default async function Timeline({
  settings,
  lng
}: {
  lng: any
  settings: {
    step1_title: string
    step1_link: string
    step1_icon: string
    step2_title: string
    step2_link: string
    step2_icon: string
    step3_title: string
    step3_link: string
    step3_icon: string
    step4_title: string
    step4_link: string
    step4_icon: string
    step5_title: string
    step5_link: string
    step5_icon: string
  }
}) {
  const steps = [
    {
      id: 1,
      title: settings.step1_title,
      link: settings.step1_link
    },
    {
      id: 2,
      title: settings.step2_title,
      color: 'bg-teal-600',
      link: settings.step2_link
    },
    {
      id: 3,
      title: settings.step3_title,
      link: settings.step3_link,
      color: 'bg-teal-600'
    },
    {
      id: 4,
      title: settings.step4_title,
      link: settings.step4_link,
      color: 'bg-teal-600'
    },
    {
      id: 5,
      title: settings.step5_title,
      link: settings.step5_link,
      color: 'bg-teal-600'
    }
  ]
  const { home } = await getTranslations(lng)

  return (
    <div className='mx-auto max-w-md space-y-4 p-6 md:hidden'>
      {steps.map((step, index) => (
        <div key={step.id} className='relative'>
          {/* Vertical line */}
          {index < steps.length - 1 && (
            <div
              className='absolute right-[1.65rem] top-16 h-8 w-0.5 bg-gray-200'
              aria-hidden='true'
            />
          )}

          <div className='flex items-start gap-4 relative'>
            {/* Number circle */}
            <div
              className={`${step.id === 1 ? 'bg-secondary' : 'bg-primary'} flex size-12 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white`}
            >
              {step.id}
            </div>

            {/* Content card */}
            <div className='flex-1 rounded-lg bg-[#F5F7F9] p-2 shadow-sm'>
              <div className='rounded-md bg-white text-center flex flex-col items-center p-2'>
                <span className='mb-1 text-lg font-bold text-primary'>
                  {step.title}
                </span>
                <LinkApp href={step.link}>
                  <Button
                    variant='default'
                    className='h-6 bg-primary text-white group-hover:bg-secondary md:h-12 md:w-40'
                  >
                    {home.steps.read_more}
                  </Button>
                </LinkApp>
              </div>
            </div>
            <span className='absolute top-[20%] end-0 w-2 bg-secondary h-[60%] rounded-e-full'></span>
          </div>
        </div>
      ))}
    </div>
  )
}
