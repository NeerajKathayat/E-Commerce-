import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiLoader4Fill } from "react-icons/ri";
import validator from 'validator';
import { CiWarning } from "react-icons/ci";
const Signup = () => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isLoaded, setIsLoaded] = useState(false);
   const [TermsPolicy, setTermsPolicy] = useState(false)
   const [alertEmail, setAlertEmail] = useState('')
   const [alertPassword, setAlertPassword] = useState('')
   const [alertCheckBox, setAlertCheckBox] = useState('')
   const navigate = useNavigate()


   const validateEmail = () => {

      if (!validator.isEmail(email)) {
         setAlertEmail("Please enter a valid email address");
         return false;
      }
      setAlertEmail('')
      return true;
   };

   const validatePassword = () => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
         setAlertPassword("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, and a number");
         return false;
      }

      setAlertPassword('')
      return true

   }

   const handleSignup = async () => {
     
      if (!name || !email || !password) {
         return
      }

      if (!validateEmail()) {
         return;
      }

      if (!validatePassword()) {
         return;
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
         const result = await fetch("http://localhost:4000/signup", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
         })

         const data = await result.json();

         if (data.success) {
            setIsLoaded(false)
            console.log(data.message)
            navigate('/login')
         }
         else {
            console.log(data.message)
         }

      } catch (err) {
         console.log(err)
      }

   }

   return (
      <div className='bg-primary h-screen flex items-start mt-[59px]'>

         <div className='flex flex-col gap-5 bg-white w-[90%] max-w-[500px] rounded-lg mx-auto mt-16 p-7'>
            <h1 className='text-2xl font-bold'>Sign Up</h1>

            <div className='flex flex-col gap-3'>
               <input className='bg-gray-10 p-[10px] outline-none text-sm rounded-md' type="text" placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)} />

               <div className='flex flex-col gap-1'>
                  <input
                     className='bg-gray-10 p-[10px] outline-none text-sm rounded-md'
                     type="email"
                     placeholder='Email Address'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     onBlur={validateEmail}
                  />
                  {alertEmail.length > 0 && (
                     <span className='text-xs text-red-500 font-semibold'>{alertEmail}</span>
                  )}
               </div>
               <div className='flex flex-col gap-1'>
                  <input className='bg-gray-10 p-[10px] outline-none text-sm rounded-md' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} onBlur={validatePassword} />

                  {alertPassword.length > 0 && (
                     <span className='text-xs text-red-500 font-semibold'>{alertPassword}</span>
                  )}
               </div>
            </div>

            <div className='flex flex-col gap-1'>
               <button onClick={handleSignup} className='bg-tertiary hover:bg-neutral-700 text-sm text-white p-2 rounded-md flex justify-center'>{isLoaded ? <RiLoader4Fill className="animate-spin text-xl" />  : 'Continue'}</button>
               <div className='flex gap-1'> 
                        {alertCheckBox && <CiWarning className='text-red-500' />}
                        <span className='text-xs text-red-500 font-semibold'>{alertCheckBox}</span>
                    </div>
            </div>

            <div className='flex gap-1'>
               <span className='font-semibold'>Already have an account?</span>
               <Link to="/login" className='text-secondary font-semibold border-b border-secondary'>Login</Link>
            </div>

            <div className='flex items-start gap-[10px]'>
               <div><input checked={TermsPolicy} type="checkbox" name="Terms&Policy" onChange={() => setTermsPolicy(!TermsPolicy)} /></div>
               <span className='text-gray-20'>By continuing, I agree to the terms of use & privacy policy</span>
            </div>
         </div>
      </div>
   )
}

export default Signup
