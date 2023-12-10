import ScheduledAppointments from '@/components/appointments/ScheduledAppointments'
import Transition from '@/components/layout/Transition'
import React from 'react'

const scheduled = () => {
    return (
        <>
            <Transition />
            <div className='min-h-screen'>
                <ScheduledAppointments />
            </div>
        </>
    )
}

export default scheduled
