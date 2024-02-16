"use client"

import React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Provider({ children, ...props }: ThemeProviderProps) {
    
    return (
        <NextThemesProvider {...props}>
            <ToastContainer />
            {children}
        </NextThemesProvider>
    )
}