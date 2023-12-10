import Transition from '@/components/layout/Transition'
import UploadProfileDetails from '@/components/profileDetails/UploadProfileDetails'
import React from 'react'

const profile = () => {
    return (
        <>
            <Transition />
            <div>
                <UploadProfileDetails />
            </div>
        </>
    )
}

export default profile
