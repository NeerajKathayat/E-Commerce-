import React, { useEffect, useState } from 'react'
import logo from '../images/logo.svg'
import { MdCategory, MdHomeFilled, MdShop2, MdContacts } from "react-icons/md";
import { FaOpencart } from "react-icons/fa6";
import { RiUserLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { remove } from '../store/cartSlice'
import { FaHeart } from "react-icons/fa";
import { resetCart } from '../store/cartSlice';
const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [toggleTab, setToggleTab] = useState(0)

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleLoginBtn = () => {

        setIsOpen(false)
        navigate('/login')
    }

    const handleLogoutBtn = () => {
        const logouth = async () => {
            let response = await fetch("http://localhost:4000/logout", {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })
            response = await response.json()
            console.log(response)
        }

        logouth()

        setIsOpen(false)
        console.log("hh")
        dispatch(logout())
        console.log("kk")
        dispatch(resetCart())
        navigate('/login')
    }

    const removeFromCart = (product) => {
        console.log(JSON.stringify(product))
        dispatch(remove(product._id))
    }


    return (
        <div className='shadow-sm px-5 py-0 fixed top-0 w-full bg-white z-10'>

            <div className='flex justify-between items-center max-w-[1430px] mx-auto'>
                <img src={logo} alt="" />

                <div className='relative '>
                    <ul className='hidden  lg:flex relative w-[500px] pb-[2px]'>
                        
                        <li onClick={() => setToggleTab(0)} className='w-[20%] ' > <Link className={`flex gap-[4px] items-center justify-center font-semibold ${toggleTab === 0 ? 'text-secondary' : 'text-black'}`} 

 to="/">
                            <MdHomeFilled/>
                            Home
                        </Link>
                        </li>

                        <li onClick={() => setToggleTab(1)} className='w-[20%]' > <Link className={`flex gap-[4px] items-center justify-center font-semibold ${toggleTab === 1 ? 'text-secondary' : 'text-black'}`} 

 to="/men">
                            <MdCategory />
                            Men's
                        </Link>
                        </li>


                        <li onClick={() => setToggleTab(2)} className='w-[20%] '>  <Link className={`flex gap-[4px] items-center justify-center font-semibold ${toggleTab === 2 ? 'text-secondary' : 'text-black'}`} 

 to="/women">
                                <MdShop2 />
                                Women's
                            </Link>
                        </li>

                        <li onClick={() => setToggleTab(3)} className='w-[20%] '>  <Link className={`flex gap-[4px] items-center justify-center font-semibold ${toggleTab === 3 ? 'text-secondary' : 'text-black'}`} 

 to="/kids">
                               <MdContacts />
                                kids
                            </Link>
                        </li>


              


                        <li onClick={() => setToggleTab(4)} className='w-[20%] '>   <Link className={`flex gap-[4px] items-center justify-center font-semibold ${toggleTab === 4 ? 'text-secondary' : 'text-black'}`} 

 to="/wishList">
                                <FaHeart />
                                WishList
                            </Link>
                        </li>
                    </ul>

                    <div
                                className={`absolute bottom-0 left-0 h-[2px]   bg-[#FFBA00] transition-transform duration-300 ease-in-out`}
                                style={{ width: '20%', transform: `translateX(${100 * toggleTab}%)` }}
                            ></div>
                </div>



                <div className='hidden lg:flex gap-[20px] items-center font-semibold'>

                    <div className='relative group cursor-pointer py-4'>
                        <div className='border border-gray-500 rounded-2xl p-1'><FaOpencart /></div>
                       {cart.length>0 &&  <div className='absolute top-[6px] -right-[17px] w-5 h-5 rounded-full flexCenter text-white bg-secondary hover:bg-orange-400
                         flex justify-center items-center text-[12px]'><span>{cart.length}</span></div>}


                        {
                            cart.length == 0 ?
                                (

                                    <div className='bg-white p-5 text-black absolute top-14 -right-[9px] hidden group-hover:flex flex-col gap-3 w-[300px]'>
                                        <span className='text-gray-20 font-semibold'>Cart is Empty!!</span>
                                        <Link to="/cart" className='bg-secondary hover:bg-orange-400 rounded-md text-white text-sm text-center p-2'>Go to Cart</Link>

                                    </div>

                                )

                                :
                                (
                                    <div className='bg-white p-5 text-black absolute top-14 -right-[9px] hidden group-hover:flex flex-col gap-3 w-[300px]'>
                                        <div className='flex flex-col gap-4'>
                                            {cart.map((prod) => {
                                                return <div key={prod._id} className='flex gap-4'>
                                                    <div className='flex gap-4'>
                                                        <img src={prod.images[0].url} className='rounded-full w-9 h-9' alt={prod.name} />
                                                        <div className='flex flex-col gap-1'>
                                                            <div className='text-xs'>{prod.description}</div>
                                                            <div className='text-xs'>₹{prod.newPrice}</div>
                                                        </div>
                                                    </div>

                                                    <i class="fa-solid fa-trash hover:text-red-700" onClick={() => { removeFromCart(prod) }} ></i>

                                                </div>
                                            })}
                                        </div>

                                        <Link to="/cart" className='bg-secondary hover:bg-orange-400 rounded-md text-white text-sm text-center p-2'>Go to Cart</Link>

                                    </div>
                                )
                        }

                    </div>


                    {
                        isAuthenticated ? (
                            <div onClick={handleLogoutBtn} className='flex gap-2 items-center cursor-pointer bg-secondary hover:bg-orange-400 text-white py-2 px-5 rounded-3xl'>
                                <CiLogout />

                                <span className='text-sm'>Logout</span>
                            </div>
                        ) : (
                            <Link to="/login" className='flex gap-2 items-center cursor-pointer bg-secondary hover:bg-orange-400 text-white py-2 px-5 rounded-3xl'>
                                <RiUserLine />
                                <span className='text-sm'>Login</span>
                            </Link>
                        )
                    }


                </div>






                <div className='lg:hidden flex items-center gap-6'>
                    <div className='relative group cursor-pointer py-4'>
                        <div className='border border-gray-500 rounded-2xl p-1'><FaOpencart /></div>
                       {cart.length> 0 &&  <div className='absolute top-[6px] -right-[17px] w-5 h-5 rounded-full flexCenter text-white bg-secondary hover:bg-orange-400 flex justify-center items-center text-[12px]'><span>{cart.length}</span></div>}


                        {
                            cart.length == 0 ?
                                (

                                    <div className='bg-white p-5 text-black absolute top-14 -right-[9px] hidden group-hover:flex flex-col gap-3 w-[300px]'>
                                        <span className='text-gray-20 font-semibold'>Cart is Empty!!</span>
                                        <Link to="/cart" className='bg-secondary hover:bg-orange-400 rounded-md text-white text-sm text-center p-2'>Go to Cart</Link>

                                    </div>

                                )

                                :
                                (
                                    <div className='bg-white p-5 text-black absolute top-14 -right-[9px] hidden group-hover:flex flex-col gap-3 w-[300px]'>
                                        <div className='flex flex-col gap-4'>
                                            {cart.map((prod) => {
                                                return <div key={prod._id} className='flex gap-4'>
                                                    <div className='flex gap-4'>
                                                        <img src={prod.images[0].url} className='rounded-full w-9 h-9' alt={prod.name} />
                                                        <div className='flex flex-col gap-1'>
                                                            <div className='text-xs'>{prod.description}</div>
                                                            <div className='text-xs'>₹{prod.newPrice}</div>
                                                        </div>
                                                    </div>

                                                    <i class="fa-solid fa-trash hover:text-red-700" onClick={() => { removeFromCart(prod) }} ></i>

                                                </div>
                                            })}
                                        </div>

                                        <Link to="/cart" className='bg-secondary hover:bg-orange-400 rounded-md text-white text-sm text-center p-2'>Go to Cart</Link>

                                    </div>
                                )
                        }

                    </div>

                    <div onClick={() => setIsOpen(true)} className='border border-gray-500 rounded-full px-[5px] py-1 h-[26px] cursor-pointer group'>
                        <GiHamburgerMenu className='group-hover:text-secondary' />
                    </div>
                </div>



                {
                    isOpen && (
                        <div className=' bg-black/50 backdrop-blur-sm  fixed inset-0' onClick={() => { setIsOpen(false) }}>
                            <ul className='flex flex-col gap-10 absolute top-0 right-0 bg-white h-screen px-10 py-12 w-[200px]' onClick={(e) => { e.stopPropagation() }}>
                                <li onClick={()=>setToggleTab(0)}>  <Link className={`flex gap-[4px] items-center font-semibold hover:text-secondary ${toggleTab == 0 ? 'text-secondary' : 'text-black'}  

`} to="/">
                                    <MdHomeFilled />
                                    Home
                                </Link>
                                </li>

                               
                                <li onClick={()=>setToggleTab(1)}>  <Link className={`flex gap-[4px] items-center font-semibold hover:text-secondary ${toggleTab == 1 ? 'text-secondary' : 'text-black'}  

`} to="/men">
                                        <MdCategory />
                                        Men's
                                    </Link>
                                </li>

                                <li onClick={()=>setToggleTab(2)}>  <Link className={`flex gap-[4px] items-center font-semibold hover:text-secondary ${toggleTab == 2 ? 'text-secondary' : 'text-black'}  

`} to="/women">
                                        <MdShop2 />
                                        Women's
                                    </Link>
                                </li>



                                <li onClick={()=>setToggleTab(3)}>  <Link className={`flex gap-[4px] items-center font-semibold hover:text-secondary ${toggleTab == 3 ? 'text-secondary' : 'text-black'}  

`} to="/kids">
                                    <MdContacts />
                                    kids
                                </Link>
                                </li>

                                <li onClick={()=>setToggleTab(4)}>  <Link className={`flex gap-[4px] items-center font-semibold hover:text-secondary ${toggleTab == 4 ? 'text-secondary' : 'text-black'}  

`} to="/wishList">
                                        <FaHeart />
                                        WishList
                                    </Link>
                                </li>


                                <IoMdCloseCircleOutline onClick={() => setIsOpen(false)} className='absolute right-7 top-7 cursor-pointer text-xl hover:text-secondary' />


                                {
                                    isAuthenticated ? (
                                        <div onClick={handleLogoutBtn} className='flex gap-2 items-center cursor-pointer bg-secondary hover:bg-orange-400 text-white py-2 px-5 rounded-3xl'>
                                            <CiLogout />

                                            <span className='text-sm'>Logout</span>
                                        </div>
                                    ) : (
                                        <div onClick={handleLoginBtn} className='flex gap-2 items-center cursor-pointer bg-secondary hover:bg-orange-400 text-white py-2 px-5 rounded-3xl'>
                                            <RiUserLine />

                                            <span className='text-sm'>Login</span>
                                        </div>
                                    )
                                }





                            </ul>



                        </div>
                    )
                }

            </div>

        </div>

    )
}

export default NavBar
