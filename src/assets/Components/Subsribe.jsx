import React from 'react'

const Subsribe = () => {
  return (
    <div className='py-20 px-5 max-w-[1430px] mx-auto flex flex-col items-center gap-7'>      
         <h1 className='text-3xl font-semibold tracking-wider'>Get Exclusive offers on Your Email</h1>
         <p className='text-lg font-medium'>SUBSCRIBE TO OUR NEWSLETTER AND STAY UPDATED</p>

        <div className='w-full max-w-[530px]'>
        <input className='bg-slate-10 py-[.6em] px-[1.5em] text-[.9rem] md:text-[1.3rem] w-[75%]  rounded-full outline-none' type="email"  placeholder='Your email address'/>
        <button className='bg-black hover:bg-gray-90 text-white -ml-10  py-[.6em] px-[1.5em] text-[.9rem] md:text-[1.3rem] rounded-full font-semibold'>Subscribe</button>
        </div>
      
    </div>
  )
}

export default Subsribe