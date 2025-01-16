import { Carousel } from "flowbite-react";

export default function CarouselApp({
  children,
  locale,
  className
}: {
  children: React.ReactNode;
  locale: string,
  className?: string
}) {
  return (
    <div dir="ltr">
      <Carousel className={`md:px-20 ${locale === 'ar' ? '[&>div>div]:[direction:rtl]' : ''} ${className}`}>
        {children}
      </Carousel>
    </div>
  );
}

export const CarouselItem = ({children, className}: {children: React.ReactNode, className?: string}) => {
  return <div className={`content text-start ${className}`}>{children}</div>;
};
