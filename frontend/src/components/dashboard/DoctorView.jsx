import React from 'react'
import { MdChat } from "react-icons/md";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { FcCalendar } from "react-icons/fc";
import Link from 'next/link'

const DoctorView = () => {
    return (
        <div className='flex items-center justify-center flex-wrap space-x-4 min-h-screen'>
            <Link href='/scheduled'>
                <div className="scheduled flex flex-col items-center justify-center bg-opacity-25 card w-96 h-96 bg-base-100 shadow-xl">
                    <FcCalendar className='w-40 h-40' />
                    <h2 className='text-white font-jost text-2xl'>Scheduled Appointments</h2>
                </div>
            </Link>
            <Link href='/chat'>
                <div className="chat flex flex-col items-center justify-center card bg-opacity-25 w-96 h-96 bg-base-100 shadow-xl">
                    <MdChat className='w-40 h-40 text-white' />
                    <h2 className='text-white font-jost text-2xl'>Chat</h2>
                </div>
            </Link>
            <Link href='/uploadRecords'>
                <div className="upload flex flex-col items-center justify-center card bg-opacity-25 w-96 h-96 bg-base-100 shadow-xl">
                    <BsFillCloudUploadFill className='w-40 h-40 text-white' />
                    <h2 className='text-white font-jost text-2xl'>Upload Records</h2>
                </div>
            </Link>
        </div>
    )
}

export default DoctorView
