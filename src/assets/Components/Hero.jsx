import React from 'react'
import { IoIosStar } from "react-icons/io";
import { MdOutlineLocalOffer } from 'react-icons/md';
import { Link } from 'react-router-dom';
const Hero = () => {
    return (
        <div className='bg-hero  bg-cover bg-center bg-no-repeat h-[calc(100vh-4rem)] mt-[59px] mx-auto'>

            <div className='max-w-[1430px] mx-auto'>
                <div className='flex flex-col gap-7  max-w-[500px] pt-24 pl-9'>
                     <div className='flex flex-col gap-3 md:gap-4'>
                     <h1 className='text-4xl md:text-5xl font-bold '>Digital Shopping </h1>
                     <h1 className='text-4xl md:text-5xl font-bold'>Hub Junction</h1>
                     </div>
                    <p className='text-sm text-gray-50'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat cum dolorem natus ut facere molestiae corrupti architecto maxime laborum, corporis nulla blanditiis perspiciatis ratione unde eos deleniti</p>

                    <div className='flex gap-2 md:gap-3 items-center'>
                        <IoIosStar /><IoIosStar /><IoIosStar /><IoIosStar />
                        <div className='flex gap-1'>
                            <span className='font-bold'>198k</span>
                            <span>Excellent Reviews</span>
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <Link to="/women" className='bg-black hover:bg-gray-90 text-white  py-[.5em] px-[1.2em] rounded-full text-[1rem] md:text-[1.4rem]   font-medium'>Shop now </Link>
                        <button className='flex gap-1 items-center bg-white hover:bg-slate-10 py-[.5em] px-[1.2em] rounded-full text-[1rem] md:text-[1.5rem]  '><MdOutlineLocalOffer /> offers</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Hero
