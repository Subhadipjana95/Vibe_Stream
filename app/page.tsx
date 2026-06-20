import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <Link href='/register' className='text-background bg-foreground border rounded-md px-2 py-1 tracking-tight font-medium'>
        Get Started
      </Link>
    </div>
  )
}

export default page
