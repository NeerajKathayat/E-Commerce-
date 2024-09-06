import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAddress, addPastOrder } from '../store/orderSlice';
import {loadStripe} from '@stripe/stripe-js'
const Shipping = () => {
    const currentOrder = useSelector((state) => state.order.currentOrder);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const placeOrder = async () => {
        
        dispatch(updateAddress(formData));

        // Handle order placement logic here (e.g., send order to server)
        const stripe = await loadStripe("pk_test_51OwNtxSJKvr7JgZN96Ht50kQCT1O0go4IMEpxU6tEhxk437XoI6vzw7q2Stf8qCLZwNV4UGrsfHv6C8BeJAAK1X100eCkn0Veq")
        
        const body = {
            products: currentOrder,
        }

        const headers = {
            "Content-Type":"application/json"
        }

        const response = await fetch("http://localhost:4000/create-checkout-session",{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        })
        const data  = await response.json()

        const result = stripe.redirectToCheckout({
            sessionId:data.id
        })

        if(result.error){
            console.log(result.error)
        }

        dispatch(addPastOrder());

      
        // Redirect to a confirmation page or another section
    };

    return (
        <div className='max-w-[1430px] mx-auto p-5 mt-16 flex flex-col gap-5 lg:flex-row lg:items-start'>
            <div className='flex flex-col gap-9 border border-slate-300 rounded-lg p-3 lg:w-[60%]'>
                <div>
                    <h1 className='text-xl font-bold'>Delivery Information</h1>
                    <p className='text-sm text-gray-30'>Use a permanent address where you can receive mail</p>
                </div>

                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-3'>
                        <label className='font-semibold'>Full name</label>
                        <input 
                            className='border border-gray-20 rounded-md p-2' 
                            type="text" 
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='flex flex-col gap-3'>
                        <label className='font-semibold'>Email address</label>
                        <input 
                            className='border border-gray-20 rounded-md p-2' 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='flex flex-col gap-3 '>
                        <label className='font-semibold'>Phone</label>
                        <input 
                            className='border border-gray-20 rounded-md p-2' 
                            type="text" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='flex flex-col gap-3'>
                        <label className='font-semibold'>Street address</label>
                        <textarea 
                            className='border border-gray-20 rounded-md p-2' 
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            rows="2"
                        />
                    </div>

                    <div className='flex flex-col lg:flex-row gap-4'>
                        <div className='flex flex-col gap-3 lg:w-[31%]'>
                            <label className='font-semibold'>City</label>
                            <input 
                                className='border border-gray-20 rounded-md p-2' 
                                type="text" 
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='flex flex-col gap-3 lg:w-[31%]'>
                            <label className='font-semibold'>State / Province</label>
                            <input 
                                className='border border-gray-20 rounded-md p-2' 
                                type="text" 
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='flex flex-col gap-3 lg:w-[31%]'>
                            <label className='font-semibold'>ZIP / Postal code</label>
                            <input 
                                className='border border-gray-20 rounded-md p-2' 
                                type="text" 
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-3 border border-slate-300 rounded-lg px-3 py-5 lg:w-[30%]'>
                <h1 className='text-xl font-semibold'>Summary</h1>
                <div className='flex justify-between'>
                    <h1>Subtotal</h1>
                    <p>$ {currentOrder.finalAmount}</p>
                </div>
                <div className='flex justify-between'>
                    <h1>Total Items in Cart</h1>
                    <p>{currentOrder.items.length} items</p>
                </div>
                <p className='text-sm text-gray-30'>Shipping and taxes calculated at checkout.</p>
                <button 
                    className='bg-secondary hover:bg-orange-400 text-white p-2 rounded-md'
                    onClick={placeOrder}
                >
                    Order Now
                </button>
            </div>
        </div>
    );
};

export default Shipping;
