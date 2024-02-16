import React from 'react'
import DashboardProvider from './DashboardProvider'

type layoutProps = {
    children?: React.ReactNode
}

export default function layout({ children }: layoutProps) {
    return (
        <DashboardProvider>
            {children}
        </DashboardProvider>
    )
}
