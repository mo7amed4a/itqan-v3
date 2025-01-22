'use client';

import { useRouter, usePathname, useParams } from 'next/navigation';
import { i18n } from '@/i18n.config';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathName = usePathname();
  const { locale: currentLocale } = useParams() as { locale: string };

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';

    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) => !pathName.startsWith(`/${locale}/`) && pathName !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
      if (locale === i18n.defaultLocale) return pathName;
      return `/${locale}${pathName}`;
    } else {
      if (locale === i18n.defaultLocale) {
        const segments = pathName.split('/');
        const isHome = segments.length === 2;
        if (isHome) return '/';
        segments.splice(1, 1);
        return segments.join('/');
      }

      const segments = pathName.split('/');
      segments[1] = locale;

      return segments.join('/');
    }
  };

  const handleLocaleChange = (locale: string) => {
    const newPath = redirectedPathName(locale);
    router.push(newPath);
  };

  return (
    <Select
      defaultValue={currentLocale}
      onValueChange={handleLocaleChange}
      // @ts-ignore
      className="flex gap-x-3"
    >
      <SelectTrigger
        className="h-8 w-auto bg-transparent !text-white focus:border-none focus:outline-none focus:ring-0 focus-visible:ring-0 md:h-9"
        aria-label={'Select a locale'}
      >
        <div className="!text-white text-xs text-nowrap">
          <SelectValue placeholder="Select language" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {i18n.locales.map((locale) => (
          <SelectItem value={locale}
            key={locale}  
            // className='w-full flex gap-2 items-center'
            // className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-3 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-start"
            onClick={() => handleLocaleChange(locale)}
          >
            <span>
              {locale === "ar" && "العربية 🇸🇦"}
              {locale === "en" && "English 🇬🇧"}
              {locale === "fa" && " فارسی 🇵🇰"}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
