"use client";
import { useEffect } from 'react';

const TawkTo: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).Tawk_API = (window as any).Tawk_API || {};
      (window as any).Tawk_LoadStart = new Date();
      const s1 = document.createElement("script");
      const s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/6255f7fdb0d10b6f3e6d45a6/1g0ft1dp2'; 
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode?.insertBefore(s1, s0);
    }
  }, []);

  return null;
};

export default TawkTo;
