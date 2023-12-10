import Transition from '@/components/layout/Transition'
import Authentication from '@/components/safeAuth/Authentication'
import React from 'react'

const auth = () => {
    return (
        <>
            <Transition />
            <div className='min-h-screen flex items-center justify-center'>
                <Authentication />
            </div>
        </>
    )
}

export default auth
