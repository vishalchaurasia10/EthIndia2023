import Transition from '@/components/layout/Transition'
import UploadRecords from '@/components/uploadRecords/UploadRecords'
import React from 'react'

const uploadRecords = () => {
    return (
        <>
            <Transition />
            <div className='min-h-screen flex items-center justify-center'>
                <UploadRecords />
            </div>
        </>
    )
}

export default uploadRecords
