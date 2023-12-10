import Dashboard from '@/components/dashboard/Dashboard'
import Transition from '@/components/layout/Transition'
import React from 'react'

const dashboard = () => {
    return (
        <>
            <Transition />
            <div>
                <Dashboard />
            </div>
        </>
    )
}

export default dashboard
