import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { ethers } from 'ethers';
import Dakter from '../../artifacts/contracts/Dakter.sol/Dakter.json'
import accountContext from '@/context/account/accountContext';
import providerContext from '@/context/provider/providerContext';
import toast, { Toaster } from 'react-hot-toast';

const UploadRecords = () => {
    const [records, setRecords] = useState({
        patientId: "",
        doctorId: "",
        patientAddress: '',
        prescriptions: '',
        prescriptionDate: ''
    })
    const { provider, setProvider } = useContext(providerContext)
    const { account, setAccount } = useContext(accountContext)
    const [contract, setContract] = useState('')

    const handleChange = (e) => {
        setRecords({ ...records, [e.target.name]: e.target.value })
    }

    const uploadDataToBlockchain = async (signer) => {
        try {
            const contractAddress = process.env.NEXT_PUBLIC_CELO_CONTRACT_ADDRESS;
            // Create a contract instance
            const contract = new ethers.Contract(contractAddress, Dakter.abi, signer);

            // Call the function on the smart contract to upload data
            const transaction = await contract.addPrescription(
                // Pass your data parameters here
                records.patientId,
                records.doctorId,
                records.patientAddress,
                records.prescriptions,
                records.prescriptionDate,
            );

            // Wait for the transaction to be mined
            const receipt = await transaction.wait();

            // Check if the transaction is successful
            if (receipt && receipt.status === 1) {
                toast.success('Records uploaded successfully!')
                console.log('Records uploaded successfully!');
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
            toast.error(err)
        }
    };

    return (
        <>
            <Toaster />
            <div className='w-1/2 text-white'>
                <h2 className='text-6xl font-jost font-bold pb-10 '>Upload Medical Prescription</h2>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="uploadPhotos flex flex-col items-center justify-center space-y-4 mt-4">
                    <input
                        onChange={handleChange}
                        className='w-full rounded-lg px-4 py-3 bg-[rgba(255,255,255,0.2)] outline-none'
                        type="text"
                        name='patientId'
                        id='patientId'
                        placeholder='Patient ID'
                        value={records.patientId}
                    />
                    <input
                        onChange={handleChange}
                        className='w-full rounded-lg px-4 py-3 bg-[rgba(255,255,255,0.2)] outline-none'
                        type="text"
                        name='doctorId'
                        id='doctorId'
                        placeholder='Patient doctorId'
                        value={records.doctorId}
                    />
                    <input
                        onChange={handleChange}
                        className='w-full rounded-lg px-4 py-3 bg-[rgba(255,255,255,0.2)] outline-none'
                        type="text"
                        name='patientAddress'
                        id='patientAddress'
                        placeholder='Patient patientAddress'
                        value={records.patientAddress}
                    />
                    <textarea
                        onChange={handleChange}
                        className='w-full rounded-lg px-4 py-3 bg-[rgba(255,255,255,0.2)] outline-none'
                        cols={10}
                        rows={5}
                        name='prescriptions'
                        id='prescriptions'
                        placeholder='Patient prescriptions'
                        value={records.prescriptions}
                    />
                    <input
                        onChange={handleChange}
                        className='w-full rounded-lg px-4 py-3 bg-[rgba(255,255,255,0.2)] outline-none'
                        type="date"
                        name='prescriptionDate'
                        id='prescriptionDate'
                        placeholder='Patient prescriptionDate'
                        value={records.prescriptionDate}
                    />
                    <div className="upload w-full">
                        <button onClick={loadProvider} className='bg-white text-black my-2 px-4 py-2 rounded-md'>Upload Prescription</button>
                    </div>
                </motion.div>

            </div>
        </>
    )
}

export default UploadRecords
