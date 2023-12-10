import React, { useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion'
import accountContext from '@/context/account/accountContext';
import providerContext from '@/context/provider/providerContext';
import Dakter from '../../artifacts/contracts/Dakter.sol/Dakter.json'
import { FaUserAlt } from "react-icons/fa";
import { ethers } from 'ethers';

const ScheduleAppointment = () => {

    const { provider, setProvider } = useContext(providerContext)
    const { account, setAccount } = useContext(accountContext)
    const [contract, setContract] = useState('')
    const [doctorList, setDoctorList] = useState([])
    const [appointmentDetails, setAppointmentDetails] = useState({
        patientId: '',
        doctorId: '',
        doctorAddress: '',
        symptoms: '',
        pastMedHistory: '',
        appointmentDate: '',
        appointmentTime: '',
        urgencyLevel: ''
    })

    const handleChange = (e) => {
        setAppointmentDetails(
            { ...appointmentDetails, [e.target.name]: e.target.value }
        )
    }

    const uploadDataToBlockchain = async (signer) => {
        try {
            const contractAddress = process.env.NEXT_PUBLIC_CELO_CONTRACT_ADDRESS;
            // Create a contract instance
            const contract = new ethers.Contract(contractAddress, Dakter.abi, signer);

            // Call the function on the smart contract to upload data
            const transaction = await contract.createAppointment(
                // Pass your data parameters here
                appointmentDetails.patientId,
                appointmentDetails.doctorId,
                appointmentDetails.doctorAddress,
                appointmentDetails.symptoms,
                appointmentDetails.pastMedHistory,
                appointmentDetails.appointmentDate,
                appointmentDetails.appointmentTime,
                appointmentDetails.urgencyLevel,
            );

            // Wait for the transaction to be mined
            const receipt = await transaction.wait();

            // Check if the transaction is successful
            if (receipt && receipt.status === 1) {
                toast.success('Appointment Created successfully!')
                // Show success toaster
            } else {
                console.error('Transaction failed:', receipt);
                toast.error('Transaction failed:', receipt)
                // Show error toaster
            }
        } catch (error) {
            console.error('Error uploading data:', error);
            toast.error('Error uploading data:', error)
            // Show error toaster
        }
    };

    const loadProvider = async () => {
        try {
            const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : null;

            if (provider) {
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);

                let contractAddress = process.env.NEXT_PUBLIC_CELO_CONTRACT_ADDRESS;
                const contract = new ethers.Contract(contractAddress, Dakter.abi, signer);

                setContract(contract);
                setProvider(provider);

                // After connecting the wallet, you can upload data to the blockchain
                await uploadDataToBlockchain(signer);
            } else {
                toast.error("Metamask not found")
            }
        } catch (err) {
            console.log(err);
            toast.error(err)
        }
    };

    const fetchDoctorLists = async () => {
        const endpoint = 'https://api.studio.thegraph.com/query/60925/health3/version/latest';

        const graphqlQuery = `
        {
        doctorCreateds(orderBy: doctorId) {	
				doctorAddress
				name
				age
				gender
				specialization
				consultanceFee
				duration
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
                setDoctorList(data.data.doctorCreateds)
            })
            .catch(error => {
                // Handle errors
                console.error(error);
                toast.error(error)
            });

    }

    const selectDoctor = (name, doctorId, doctorAddress) => {
        setAppointmentDetails({
            ...appointmentDetails,
            doctorId: doctorId,
            doctorAddress: doctorAddress
        })
        toast.success(`Dr. ${name} has been selected`)
    }

    useEffect(() => {
        fetchDoctorLists()
    }, [])

    return (
        <>
            <Toaster />
            <div className="mainContainer min-h-screen text-white flex space-x-12 items-center px-40">
                <div className="appointmentForm w-1/2">
                    <h2 className='text-5xl font-jost font-bold pb-10 '>Enter Appointment Details</h2>
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
                                value={appointmentDetails.patientId}
                            />
                            <select
                                onChange={handleChange}
                                value={appointmentDetails.urgencyLevel}
                                id='urgencyLevel'
                                name='urgencyLevel'
                                className="select w-1/2 rounded-lg px-4 py-3 bg-[rgba(255,255,255,0.2)] outline-none">
                                <option value='' disabled selected>Urgency Level</option>
                                <option value='1' className='text-black'>1</option>
                                <option value='2' className='text-black'>2</option>
                                <option value='3' className='text-black'>3</option>
                                <option value='4' className='text-black'>4</option>
                                <option value='5' className='text-black'>5</option>
                            </select>
                        </div>
                        <textarea
                            onChange={handleChange}
                            className='w-full rounded-lg px-4 py-3 bg-[rgba(255,255,255,0.2)] outline-none'
                            cols={10}
                            rows={5}
                            name='symptoms'
                            id='symptoms'
                            placeholder='Patient symptoms'
                            value={appointmentDetails.symptoms}
                        />
                        <textarea
                            onChange={handleChange}
                            className='w-full rounded-lg px-4 py-3 bg-[rgba(255,255,255,0.2)] outline-none'
                            cols={10}
                            rows={5}
                            name='pastMedHistory'
                            id='pastMedHistory'
                            placeholder='Patient pastMedHistory'
                            value={appointmentDetails.pastMedHistory}
                        />
                        <div className="flex space-x-3 w-full">
                            <input
                                onChange={handleChange}
                                className='w-1/2 rounded-lg px-4 py-3 bg-[rgba(255,255,255,0.2)] outline-none'
                                type="date"
                                name='appointmentDate'
                                id='appointmentDate'
                                placeholder='Patient appointmentDate'
                                value={appointmentDetails.appointmentDate}
                            />
                            <input
                                onChange={handleChange}
                                className='w-1/2 rounded-lg px-4 py-2 bg-[rgba(255,255,255,0.2)] outline-none'
                                type="time"
                                name='appointmentTime'
                                id='appointmentTime'
                                placeholder='Patient appointmentTime'
                                value={appointmentDetails.appointmentTime}
                            />
                        </div>
                        <div className="upload w-full">
                            <button onClick={loadProvider} className='bg-white text-black my-2 px-4 py-2 rounded-md'>Create Appointment</button>
                        </div>
                    </motion.div>
                </div>
                <div className="doctorLists font-jost text-black">
                    <h2 className='text-5xl font-jost font-bold pb-10 text-white text-center'>Select Doctors</h2>
                    <div className="h-[30rem] carousel carousel-vertical rounded-box bg-opacity-25">
                        {
                            doctorList.length > 0 && doctorList.map((doctor, index) => {
                                return (
                                    <div key={index} className="carousel-item h-full">
                                        <div className="card w-96 bg-base-300 shadow-xl">
                                            <div className='flex items-center justify-center pt-6'>
                                                <FaUserAlt className='h-32 w-32 border border-black rounded-full p-2 ' />
                                            </div>
                                            <div className="card-body">
                                                <p>
                                                    <span className='font-bold'>Name:</span>
                                                    <span>{doctor.name}</span>
                                                </p>
                                                <p>
                                                    <span className='font-bold'>Gender:</span>
                                                    <span>{doctor.gender}</span>
                                                </p>
                                                <p>
                                                    <span className='font-bold'>Age:</span>
                                                    <span>{doctor.age}</span>
                                                </p>
                                                <p>
                                                    <span className='font-bold'>Experience:</span>
                                                    <span>{doctor.duration}</span>
                                                </p>
                                                <p>
                                                    <span className='font-bold'>consultanceFee:</span>
                                                    <span>{doctor.consultanceFee}</span>
                                                </p>
                                                <p>
                                                    <span className='font-bold'>specialization:</span>
                                                    <span>{doctor.specialization}</span>
                                                </p>
                                                <button onClick={() => { selectDoctor(doctor.name, index, doctor.doctorAddress) }} className='btn btn-neutral'>Select Doctor</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScheduleAppointment
