import { Button } from 'flowbite-react'
import Image from 'next/image'
export default function VideoCall({dataVideoCall}: {dataVideoCall: any, locale: string}) {
  return (
    <div className='my-20 px-4'>
        <div className='group relative'>
            <div className='bg-gray-100 max-w-screen-md flex items-center mx-auto rounded-full !h-28 md:!h-80 py-3'>
                <div className='md:h-80 md:w-80 md:p-4 group-hover:order-2'>
                    <Image className='rounded-full !h-28 md:!h-full !w-28 md:!w-full duration-300 border-4 md:border-8 border-primary/20' src={"/images/forCartRounded.png"} alt='video call' width={300} height={300} />
                </div>
                <div className='w-3/5 ps-8 space-y-2 group-hover:order-1'>
                    <p className='text-sm text-start md:text-xl font-bold'>{dataVideoCall('videoCall.text')} </p>
                    <Button color='primary' className='group-hover:text-white  group-hover:bg-red-600'>{dataVideoCall('videoCall.booking_now')}</Button>
                </div>
            </div>
        </div>
    </div>
  )
}
