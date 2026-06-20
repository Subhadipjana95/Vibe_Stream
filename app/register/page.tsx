"use client"

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';

const Register = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>('');

    const router = useRouter();

    const validatePassword = (confirmVal: string): void => {
        if (password !== confirmVal) {
            setErrorMessage('Password do not match')
        }
        else {
            setErrorMessage('')
        }
    }
    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmPassword(value);
        validatePassword(value);
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Registration failed")
            }
            console.log(data)
            router.push('/login')

        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className='bg-background h-screen w-full flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='min-w-72 bg-muted border rounded-xl p-4 flex flex-col items-center justify-center gap-4'>
                <h1 className="text-xl text-foreground font-medium text-center">
                    Register
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
                        className={cn("w-full outline-none border border-ring focus:ring-2 ring-ring/40 rounded-sm px-2 py-1 text-sm",
                            errorMessage ? "border-destructive ring-destructive/40" : ""
                        )}
                        type="password"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }}
                    />
                </div>
                <div className="w-full flex flex-col items-start gap-1">
                    <label htmlFor="confirmPassword" className='text-xs text-foreground tracking-tight font-semibold'>Confirm Password</label>
                    <input
                        aria-label='Password'
                        placeholder='Re-enter the Password'
                        className={cn("w-full outline-none border border-ring focus:ring-2 ring-ring/40 rounded-sm px-2 py-1 text-sm",
                            errorMessage ? "border-destructive ring-destructive/40" : ""
                        )}
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    {errorMessage && (
                        <p className='text-destructive text-xs'>
                            {errorMessage}
                        </p>
                    )}
                </div>
                <button type='submit' className='w-full bg-primary text-primary-foreground rounded-md p-1.5 font-medium tracking-tight mt-2'>
                    Register
                </button>
                <p className='text-xs text-muted-foreground'>Already have an account? <span onClick={() => router.push('/login')} className='text-primary hover:underline cursor-pointer'>Login</span>
                </p>
            </form>
        </div>
    )
}

export default Register