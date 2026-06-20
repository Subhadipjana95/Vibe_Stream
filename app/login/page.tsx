"use client"

import React, { useState } from 'react'
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import { signIn } from 'next-auth/react'

function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter()
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })
        if(res?.error){
            console.log(res.error)
        }
        else{
            router.push('/')
        }
    }
    return (
        <div className='bg-background h-screen w-full flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='min-w-72 bg-muted border rounded-xl p-4 flex flex-col items-center justify-center gap-4'>
                <h1 className="text-xl text-foreground font-medium text-center">
                    Login
                </h1>
                <div className="w-full flex flex-col items-start gap-1">
                    <label htmlFor="email" className='text-xs text-foreground tracking-tight font-semibold'>Email</label>
                    <input
                        aria-label='Email'
                        type="email"
                        placeholder='johndoe@gmail.com'
                        className='w-full outline-none border border-ring focus:ring-2 ring-ring/40 rounded-sm px-2 py-1 text-sm'
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }}
                    />
                </div>
                <div className="w-full flex flex-col items-start gap-1">
                    <label htmlFor="password" className='text-xs text-foreground tracking-tight font-semibold'>Password</label>
                    <input
                        aria-label='Password'
                        placeholder='Enter your Password'
                        className={cn("w-full outline-none border border-ring focus:ring-2 ring-ring/40 rounded-sm px-2 py-1 text-sm"
                        )}
                        type="password"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }}
                    />
                </div>
                <button type='submit' className='w-full bg-primary text-primary-foreground rounded-md p-1.5 font-medium tracking-tight mt-2'>
                    Login
                </button>
                <button onClick={() => signIn("github")} className='w-full bg-primary text-primary-foreground rounded-md p-1.5 text-xs font-medium tracking-tight cursor-pointer'>
                    Login with GitHub
                </button>
                <p className='text-xs text-muted-foreground'>Haven't registered yet? <span onClick={() => router.push('/register')} className='text-primary hover:underline cursor-pointer'>Register</span>
                </p>
            </form>
        </div>
    )
}

export default Login