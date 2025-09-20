import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function SiteTitle({className}:{className?:string}) {
  return (
    <Link className={`flex items-center pt-1 h-8 ${className}`}  href="/">
    <Image className='h-full w-fit' src="/title-h.svg" alt="logo" width={100} height={100} />
    </Link>
  )
}
