'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function Provider({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <Toaster />
                {children}
            </SessionProvider>
        </QueryClientProvider>
    )
}
