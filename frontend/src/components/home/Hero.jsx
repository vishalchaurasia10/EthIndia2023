import React from 'react'
import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
    return (
        <>
            <Link href='/auth'>
                <button className='btn absolute z-50 top-6 right-6 cursor-pointer'>Authenticate</button>
            </Link>
            <motion.div className='h-screen relative flex items-center justify-center px-14 lg:px-20 text-center'>
                <motion.h1 className="tagline relative leading-20 font-jost text-6xl md:text-8xl font-bold`">
                    <motion.span
                        className='text-white'
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, delay: 0.4 }}>
                        Seamlessly Connect with Your Doctors </motion.span>
                    <motion.span
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                        className='text-6xl  md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9b5afc] to-[#00CC99]'> Empowering Patients Through Secure Blockchain Interactions</motion.span>
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        // transition={{ duration: 1.2}}
                        className='h-[0.2rem] lg:-bottom-32 lg:mx-80 w-full lg:w-1/2 lg:absolute bg-gradient-to-r from-[#9b5afc] to-[#00CC99]'>

                    </motion.div>
                </motion.h1>
            </motion.div>
        </>
    )
}

export default Hero

