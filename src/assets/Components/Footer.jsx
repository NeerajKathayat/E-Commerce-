import React from 'react'
import { FaFacebookSquare, FaInstagramSquare, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
const Footer = () => {
    return (
        <div className='bg-primary px-5 py-20 '>


            <div className='max-w-[1260px] mx-auto'>
                <h1 className='font-bold text-xl'>Shopee</h1>
                <div className='flex gap-6 flex-row justify-between  flex-wrap  py-7'>

                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold text-lg'>Learn More</h1>
                        <div className='text-gray-30'>About Us</div>
                        <div className='text-gray-30'>Categories</div>
                        <div className='text-gray-30'>Exchange Policy</div>
                        <div className='text-gray-30'>Order Now</div>
                        <div className='text-gray-30'>FAQ</div>
                        <div className='text-gray-30'>Privacy Policy</div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold text-lg '>Our Community</h1>
                        <div className='text-gray-30'>Terms and Conditions</div>
                        <div className='text-gray-30'>Special Offers</div>
                        <div className='text-gray-30'>Customer Reviews</div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold text-lg '>Contact Us</h1>
                        <div className='flex gap-2'>
                            <p className='text-gray-30'>Contact Number:</p>
                            <p className='text-gray-30'>123-456-7890</p>
                        </div>
                        <div className='flex gap-2'>
                            <p className='text-gray-30'>Email Address:</p>
                            <p className='text-gray-30'>info@shopee.com</p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold text-lg'>Social</h1>
                        <div className='flex gap-3'>
                            <FaFacebookSquare />
                            <FaInstagramSquare />
                            <FaTwitter />
                            <FaYoutube />
                            <FaLinkedin />
                        </div>
                    </div>

                </div>
            </div>

            <div className='max-w-[1200px] mx-auto h-[1px] bg-slate-300'></div>

            <div className='pt-12'>
                <p className='text-gray-30 text-center'>2024 Shopeee | All rights reserved.</p>

            </div>


        </div>
    )
}

export default Footer
