import ScheduleAppointment from '@/components/appointments/ScheduleAppointment'
import Transition from '@/components/layout/Transition'
import React from 'react'

const schedule = () => {
    return (
        <>
            <Transition />
            <div>
                <ScheduleAppointment />
            </div>
        </>
    )
}

export default schedule
