'use client'

import { useEffect, useState } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'
import FacebookPixel from './FacebookPixel'

export function Analytics() {
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('cookieConsent') === 'accepted') {
      setHasConsent(true)
    }
  }, [])

  if (!hasConsent) return null

  return (
    <>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || 'GTM-TGKPL943'} />
      <FacebookPixel />
    </>
  )
}
