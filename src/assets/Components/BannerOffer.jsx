import React from 'react'

const BannerOffer = () => {
    return (
        <div className='bg-banneroffer bg-cover bg-no-repeat py-10'>
            <div className='max-w-[1430px] mx-auto flex flex-col gap-4 items-start px-5'>
                <h1 className='text-2xl md:text-3xl font-bold'>Summer Sale 50%</h1>
                <p className='text-sm md:text-lg font-semibold'>Men's Leather Formal Wear Shoes</p>
                <button className='bg-black text-white py-[.5em] px-[1.2em] rounded-full text-[1rem] md:text-[1.5rem]  font-semibold'>Go to store</button>
            </div>
        </div>

    )
}

export default BannerOffer
