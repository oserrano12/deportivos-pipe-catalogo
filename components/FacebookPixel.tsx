'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useState } from 'react'

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '29573640865570973'

export const pageview = () => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'PageView')
  }
}

// Track specific events (e.g., ViewContent, AddToCart, Purchase)
export const trackEvent = (name: string, options = {}) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', name, options)
  }
}

export default function FacebookPixel() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!loaded) return
    pageview()
  }, [pathname, searchParams, loaded])

  return (
    <Script
      id="fb-pixel"
      strategy="afterInteractive"
      onLoad={() => setLoaded(true)}
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FB_PIXEL_ID}');
        `,
      }}
    />
  )
}
