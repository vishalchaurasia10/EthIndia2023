import React, { useContext } from 'react'
import typeContext from '@/context/type/typeContext'
import PatientView from './PatientView'
import DoctorView from './DoctorView'

const Dashboard = () => {

    const { userType } = useContext(typeContext)

    return (
        <div className='bg-black min-h-screen'>
            <h2 className='text-white text-6xl -mb-20 pt-20 font-jost text-center'>Quick Actions</h2>
            {
                userType === 'user' ?
                    <PatientView />
                    :
                    <DoctorView />
            }

        </div>
    )
}

export default Dashboard
