import Link from 'next/link'
import React from 'react'

export default function SiteTitle({className}:{className?:string}) {
  return (
    <Link className={`text-2xl font-semibold ${className}`} href="/">
    🖥️ Gadget Hunter
    </Link>
  )
}
