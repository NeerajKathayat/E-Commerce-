import React, { useState } from 'react'
import { Link, } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { RiLoader4Fill } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { CiWarning } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { resetCart, setCart } from '../store/cartSlice';
import { resetWish, setWish } from '../store/wishListSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [TermsPolicy, setTermsPolicy] = useState(false)
    const [alertCheckBox, setAlertCheckBox] = useState('')
    const [alertCredential, setAlertCredential] = useState('')
    const [GLoad, setGLoad] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async () => {

        if (!email || !password) {
            return
        }


        if (!TermsPolicy) {
            setAlertCheckBox("Check terms and Condition")
            return
        }
        else {
            setAlertCheckBox('')
        }

        setIsLoaded(true)


        try {
            const result = await fetch("http://localhost:4000/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const data = await result.json();

            if (data.success) {
                console.log(data)

                dispatch(login({ token: data.token, userId: data.userId }))

                setIsLoaded(false)

                // Reset the cart state
                dispatch(resetCart());
                //Reset the wishList State
                dispatch(resetWish())

                const userId = localStorage.getItem('userId')

                // Load the new user's cart
                const newUserCart = localStorage.getItem(`cart_${userId}`);
                // Load the new user's cart
                const newUserWish = localStorage.getItem(`wish_${userId}`);

                if (newUserCart) {
                    dispatch(setCart(JSON.parse(newUserCart)));
                }

                if (newUserWish) {
                    dispatch(setWish(JSON.parse(newUserWish)));
                }

                navigate('/')
            }
            else {
                setAlertCredential("Username or Password is Wrong")
                setIsLoaded(false)
                console.log(data)
            }

        } catch (err) {
            console.log(err)
        }



    }

    const handleOAuth = () => {
        setGLoad(true)
        try {
            window.location.href = "http://localhost:4000/auth/google"
            setTimeout(()=>{
                setGLoad(false)
            },3000)
        } catch (err) {
            console.log(err)

        }
    }

    return (
        <div className='bg-primary h-screen flex items-start mt-[59px]'>
            <div className='flex flex-col gap-5 rounded-lg bg-white w-[90%] max-w-[500px] mx-auto mt-16 p-7'>
                <h1 className='text-2xl font-bold'>Login</h1>

                <div className='flex flex-col gap-3'>
                    <input className='bg-gray-10 p-[10px] outline-none text-sm rounded-md' type="text" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className='bg-gray-10 p-[10px] outline-none text-sm rounded-md' type="text" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {alertCredential.length > 0 && (<span className='text-xs text-red-500 font-semibold'>{alertCredential}</span>)}
                </div>


                <div className='flex flex-col gap-1'>
                    <button onClick={handleLogin} className='bg-tertiary hover:bg-neutral-700 text-sm text-white p-2 rounded-md flex justify-center'>{isLoaded ? <RiLoader4Fill className="animate-spin text-xl" /> : 'Continue'}</button>
                    {alertCheckBox.length > 0 && (
                        <div className='flex gap-1'>
                            <CiWarning className='text-red-500' />
                            <span className='text-xs text-red-500 font-semibold'>{alertCheckBox}</span>
                        </div>
                    )}
                </div>

                <div className='flex gap-1'>
                    <span className='font-semibold'>Create an account?</span>
                    <Link to="/signup" className='text-secondary font-semibold border-b border-secondary'>Click here</Link>
                </div>

                <div className='flex items-start gap-[10px]'>
                    <div><input checked={TermsPolicy} type="checkbox" name="Terms&Policy" onChange={() => setTermsPolicy(!TermsPolicy)} /></div>
                    <span className='text-gray-20'>By continuing, I agree to the terms of use & privacy policy</span>
                </div>

                <div className='text-center text-xl  '>or</div>

                <button onClick={handleOAuth} className='flex items-center border border-[#1976D2] self-center ' >

                    <div className='py-2 px-3'>

                        <FcGoogle className='text-2xl' />
                    </div>

                    <div className='bg-[#1976D2] py-2 px-5 text-white'>{GLoad ? <RiLoader4Fill className="animate-spin text-2xl w-36" /> : 'Sign in with Google'} </div>

                </button>


            </div>
        </div>
    )
}

export default Login
