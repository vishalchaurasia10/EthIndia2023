import React, { useState } from 'react'
import UserProfile from './UserProfile'
import DoctorProfile from './DoctorProfile'
import { motion } from 'framer-motion'

const UploadProfileDetails = () => {
    const [userType, setUserType] = useState('user')

    return (
        <div className="wrapper flex items-center justify-center w-full pt-28 pb-20 md:pt-40 lg:pt-32 px-3">
            <div className="upload font-jost text-white border border-white lg:w-1/2 rounded-2xl p-6 md:p-8">
                <div className="heading flex items-center">
                    <h1 className='text-7xl  md:text-8xl font-bold pb-4 font-jost bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 capitalize'>{userType} Profile</h1>
                </div>
                <div className="buttons mb-6">
                    <ul className='flex items-center space-x-4'>
                        {userType === 'user' ?
                            <li className=''>
                                <motion.button
                                    onClick={() => { setUserType('doctor') }}
                                    whileHover={{ y: -3, scale: 1.05, boxShadow: '0 0 10px rgba(255,255,255,0.3)' }}
                                    className={`overflow-hidden border border-[rgba(255,255,255,0.4)] before:-translate-x-[20rem] hover:before:translate-x-0 before:block before:absolute before:-inset-3 before:skew-x-[30deg] relative inline-block before:bg-gradient-to-r from-pink-500 to-violet-500 text-white py-2 px-4 mx-1 rounded-md before:transition-all before:duration-500`}>
                                    <span className={`relative font-roboto text-lg transition-all duration-500`}>Register As Doctor</span>
                                </motion.button>
                            </li>
                            :
                            <li className=''>
                                <motion.button
                                    onClick={() => { setUserType('user') }}
                                    whileHover={{ y: -3, scale: 1.05, boxShadow: '0 0 10px rgba(255,255,255,0.3)' }}
                                    className={`overflow-hidden border border-[rgba(255,255,255,0.4)] before:-translate-x-[20rem] hover:before:translate-x-0 before:block before:absolute before:-inset-3 before:skew-x-[30deg] relative inline-block before:bg-gradient-to-r from-pink-500 to-violet-500 text-white py-2 px-4 mx-1 rounded-md before:transition-all before:duration-500`}>
                                    <span className={`relative font-roboto text-lg transition-all duration-500`}>Register As User</span>
                                </motion.button>
                            </li>
                        }
                    </ul>
                </div>
                <div className="uploadContent">
                    {userType === 'user' ? <UserProfile /> : <DoctorProfile />}
                </div>
            </div>
        </div>
    )
}

export default UploadProfileDetails
