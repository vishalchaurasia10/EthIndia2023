import React, { useContext, useEffect, useState } from 'react'
import accountContext from '@/context/account/accountContext'
import { ethers } from 'ethers';
import toast, { Toaster } from 'react-hot-toast';

const ScheduledAppointments = () => {

    const [appointments, setAppointments] = useState([])
    const { account, setAccount } = useContext(accountContext)

    const fetchAppointments = async () => {
        const endpoint = 'https://api.studio.thegraph.com/query/60925/health3/version/latest';

        const address = account; // Replace with the actual doctor's address

        const graphqlQuery = `
        {
            appointmentCreateds(where: { doctorAddress: "${address}" }) {
                patientId
                doctorId
                patientAddress
                doctorAddress
                symptoms
                pastMedHistory
                appointmentDate
                appointmentTime
                urgencyLevel
            }
        }
        `;

        // Define the request headers
        const headers = {
            'Content-Type': 'application/json',
            // Add any other headers if needed
        };

        // Define the request options
        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ query: graphqlQuery }),
        };

        // Send the request
        fetch(endpoint, options)
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                setAppointments(data.data.appointmentCreateds)
            })
            .catch(error => {
                // Handle errors
                toast.error(error)
                console.error(error);
            });
    }

    useEffect(() => {
        const getAddress = async () => {
            try {
                const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : null;

                if (provider) {
                    await provider.send("eth_requestAccounts", []);
                    const signer = provider.getSigner();
                    const address = await signer.getAddress();
                    setAccount(address);
                } else {
                    toast.error("Metamask not found")
                }
            } catch (err) {
                toast.error(err)
            }
        }
        if (account === '') {
            getAddress()
        } else {
            fetchAppointments()
        }
    }, [account])

    return (
        <>
            <Toaster />
            <h2 className='text-5xl font-jost font-bold pt-10 -mb-32 text-white text-center'>Scheduled Appointments</h2>
            <div className="wrapper flex items-center justify-center h-screen flex-wrap">
                {
                    appointments.length > 0 && appointments.map((appointment, index) => {
                        return (
                            <div className="card truncate w-[30rem] bg-base-100 shadow-xl">
                                {
                                    appointments.length > 0 && appointments.map((appointment, index) => {
                                        return (
                                            <div className="card-body">
                                                <p>
                                                    <span className='font-bold'>Date:</span>
                                                    <span>{appointment.appointmentDate}</span>
                                                </p>
                                                <p>
                                                    <span className='font-bold'>Time:</span>
                                                    <span>{appointment.appointmentTime}</span>
                                                </p>
                                                <p>
                                                    <span className='font-bold'>Doctor Address:</span>
                                                    <span>{appointment.doctorAddress}</span>
                                                </p>
                                                <p>
                                                    <span className='font-bold'>DoctorId:</span>
                                                    <span>{appointment.doctorId}</span>
                                                </p>
                                                <p>
                                                    <span className='font-bold'>PastMedHistory:</span>
                                                    <span>{appointment.pastMedHistory}</span>
                                                </p>
                                                <p>
                                                    <span className='font-bold'>Patient Address:</span>
                                                    <span>{appointment.patientAddress}</span>
                                                </p>
                                                <p>
                                                    <span className='font-bold'>PatientId:</span>
                                                    <span>{appointment.patientId}</span>
                                                </p>
                                                <p>
                                                    <span className='font-bold'>Symptoms:</span>
                                                    <span>{appointment.symptoms}</span>
                                                </p>
                                                <p>
                                                    <span className='font-bold'>Urgency Level:</span>
                                                    <span>{appointment.urgencyLevel}</span>
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ScheduledAppointments
