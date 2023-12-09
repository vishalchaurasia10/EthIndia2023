import React, { useState } from 'react'
import { motion } from 'framer-motion'

const UserProfile = () => {
    const [patientDetails, setPatientDetails] = useState({
        patientId: '',
        name: '',
        age: '',
        dob: '',
        gender: '',
        address: '',
    })

    const handleChange = (e) => {
        setPatientDetails({ ...patientDetails, [e.target.name]: e.target.value })
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="uploadPhotos flex flex-col items-center justify-center space-y-4 mt-4">
                <div className="flex space-x-2 w-full">
                    <input 
                        onChange={handleChange}
                        className='w-1/2 rounded-lg px-4 py-2 bg-[rgba(255,255,255,0.2)] outline-none'
                        type="text"
                        name='patientId'
                        id='patientId'
                        placeholder='Patient ID'
                        value={patientDetails.patientId}
                    />
                    <select className="select w-1/2 rounded-lg px-4 py-2 bg-[rgba(255,255,255,0.2)] outline-none">
                        <option disabled selected>Gender</option>
                        <option className='text-black'>Male</option>
                        <option className='text-black'>Female</option>
                        <option className='text-black'>Cannot Say</option>
                    </select>
                </div>
                <input
                    onChange={handleChange}
                    className='w-full rounded-lg px-4 py-3 bg-[rgba(255,255,255,0.2)] outline-none'
                    type="text"
                    name='name'
                    id='name'
                    placeholder='Patient name'
                    value={patientDetails.name}
                />
                <div className="flex space-x-3 w-full">
                    <input
                        onChange={handleChange}
                        className='w-1/2 rounded-lg px-4 py-3 bg-[rgba(255,255,255,0.2)] outline-none'
                        type="text"
                        name='age'
                        id='age'
                        placeholder='Patient age'
                        value={patientDetails.age}
                    />
                    <input
                        onChange={handleChange}
                        className='w-1/2 rounded-lg px-4 py-2 bg-[rgba(255,255,255,0.2)] outline-none'
                        type="text"
                        name='dob'
                        id='dob'
                        placeholder='Patient dob'
                        value={patientDetails.dob}
                    />
                </div>
                <textarea
                    onChange={handleChange}
                    value={patientDetails.address}
                    className='w-full rounded-lg px-4 py-2 bg-[rgba(255,255,255,0.2)] outline-none'
                    placeholder='Patient address'
                    name="address"
                    id="address"
                    cols="30" rows="4"
                />

                <input type="file" className="file-input w-full text-black" />
                <div className="upload w-full">
                    <button className='bg-white text-black my-2 px-4 py-2 rounded-md'>Upload</button>
                </div>
            </motion.div>
        </>
    )
}

export default UserProfile
