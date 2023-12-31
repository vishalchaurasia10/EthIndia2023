import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { ethers } from 'ethers';
import Dakter from '../../artifacts/contracts/Dakter.sol/Dakter.json'
import accountContext from '@/context/account/accountContext';
import providerContext from '@/context/provider/providerContext';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

const UserProfile = () => {
    const [patientDetails, setPatientDetails] = useState({
        patientId: '',
        name: '',
        age: '',
        dob: '',
        gender: '',
        address: '',
    })
    const { provider, setProvider } = useContext(providerContext)
    const { account, setAccount } = useContext(accountContext)
    const [contract, setContract] = useState('')
    const router = useRouter()

    const handleChange = (e) => {
        setPatientDetails({ ...patientDetails, [e.target.name]: e.target.value })
    }

    const uploadDataToBlockchain = async (signer) => {
        try {
            const contractAddress = process.env.NEXT_PUBLIC_CELO_CONTRACT_ADDRESS;
            // Create a contract instance
            const contract = new ethers.Contract(contractAddress, Dakter.abi, signer);

            // Call the function on the smart contract to upload data
            const transaction = await contract.createPatient(
                // Pass your data parameters here
                patientDetails.name,
                patientDetails.age,
                patientDetails.dob,
                patientDetails.gender,
                patientDetails.address,
            );

            // Wait for the transaction to be mined
            const receipt = await transaction.wait();

            // Check if the transaction is successful
            if (receipt && receipt.status === 1) {
                toast.success('Data uploaded successfully!')
                console.log('Data uploaded successfully!');
                router.push('/dashboard')
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
                console.log("Metamask not found");
                toast.error("Metamask not found")
            }
        } catch (err) {
            console.log(err);
            toast.error(err)
        }
    };

    return (
        <>
            <Toaster />
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
                    <select
                        onChange={handleChange}
                        value={patientDetails.gender}
                        id='gender'
                        name='gender'
                        className="select w-1/2 rounded-lg px-4 py-2 bg-[rgba(255,255,255,0.2)] outline-none">
                        <option value='' disabled selected>Gender</option>
                        <option value='male' className='text-black'>Male</option>
                        <option value='female' className='text-black'>Female</option>
                        <option value='cannotsay' className='text-black'>Cannot Say</option>
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
                    <button onClick={loadProvider} className='bg-white text-black my-2 px-4 py-2 rounded-md'>Upload</button>
                </div>
            </motion.div>
        </>
    )
}

export default UserProfile
