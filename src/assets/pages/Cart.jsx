import React,{useEffect, useState} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { IoIosStarOutline } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import { remove , increaseQuantity , decreaseQuantity } from '../store/cartSlice'
import { IoCloseOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { setCurrentOrder } from '../store/orderSlice';
import { useNavigate } from 'react-router-dom';
const Cart = () => {

    const navigate = useNavigate()
    const [couponCode, setCouponCode] = useState('');
    const [discount , setDiscount] = useState('');
    const [finalAmount , setFinalAmount] = useState('')
    const [totalCost , setTotalCost] = useState('')
    const [couponAlert , setCouponAlert] = useState('')

    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()
  
    console.log("Ggg" + JSON.stringify(cart))

    const coupons = {
        'SAVE10': 10, // 10% discount
        'SAVE20': 20, // 20% discount
    };

    useEffect(()=>{

        const TC = cart.reduce((acc,ele)=>{
            return acc+=(ele.newPrice * ele.quantity)
      },0)


      let Disc=0;

      if(couponAlert){
          let lastTwoDigits = Number(couponAlert.slice(-2));
          Disc = TC * (lastTwoDigits/100)
      }
      else{
        Disc = TC * (5/100)
      }
        
      const FA = TC - Disc

      setTotalCost(TC)

      setDiscount(Disc)

      setFinalAmount(FA);

    },[cart])

    



    const removeFromCart = (product) => {
        console.log(JSON.stringify(product))
        dispatch(remove(product._id))
    }

    const IncreaseQuantity = (product) =>{
        console.log(product)
        dispatch(increaseQuantity(product._id))
         
    }

    const DecreaseQuantity = (product) =>{
        dispatch(decreaseQuantity(product._id))
    }



    const applyCoupon = () => {
        if(couponAlert){
            setCouponCode('');
            alert("Coupon Already applied")
            return
        } 

        console.log(couponCode)
        if (coupons[couponCode]) {
            const discountPercentage = coupons[couponCode];
            const newDiscount = (totalCost * discountPercentage) / 100;
               setDiscount(newDiscount);
               setFinalAmount(totalCost - newDiscount);

               let CA = "#SAVE"+coupons[couponCode]
               setCouponCode('');
               setCouponAlert(CA)
        } else {
            alert('Invalid Coupon Code');
            setCouponCode('');
        }
    }

const RemoveCouponCode = ()=>{
    
    let Disc = totalCost * (5/100)
     
    const FA =  totalCost- Disc
 
   setDiscount(Disc)
   setFinalAmount(FA)

   setCouponAlert('')
}    


   const proceedToCheckout = ()=>{
    dispatch(setCurrentOrder({finalAmount,items:cart}))
    navigate('/shipping')
   }


    return (
        <div className='mt-20 max-w-[1430px] mx-auto p-5 flex flex-col gap-4  md:flex-row items-start'>

            <div className='border border-slate-300 rounded-lg p-3 w-full md:w-[60%]'>

                <h1 className='py-2 px-2 font-bold text-lg'>Cart Items</h1>


                {
                    cart.length == 0 ? (
                         
                     <div className='font-semibold flex flex-col items-center gap-4'>
                            <h1 className='text-gray-20 font-semibold text-center'>Your cart is empty</h1>
                            <Link to="/men" className='bg-secondary hover:bg-orange-400 text-white text-center p-2 rounded-md max-w-40'>Add Product</Link>
                      </div>
                    ) :  (

                        cart.map((prod) => (
                            <div className='px-2 py-4 flex flex-col gap-5 justify-between'>
    
                                <div className='h-[1px] w-full bg-slate-300' />
    
                                <div className='flex flex-col gap-4 sm:flex-row sm:justify-between '>
    
                                    <div className='flex items-center gap-3'>
    
                                        <div className='max-w-[140px] rounded-lg overflow-hidden'>
                                            <img className='' src={prod.images[0].url} alt="" />
                                        </div>
    
                                        <div className='flex flex-col gap-[6px]'>
                                            <h1 className="text-lg font-bold">{prod.name}</h1>
                                            <p className="text-xs font-semibold text-gray-500">{prod.description}</p>
    
                                            <div className='flex gap-2'>
                                                {
                                                    [...Array(5)].map((_, index) => (
                                                        <span>
                                                            {prod.ratings > index ? <IoStar className='text-secondary text-sm md:text-lg' /> : <IoIosStarOutline className='text-secondary text-sm md:text-lg' />}
                                                        </span>
    
                                                    ))
                                                }
    
                                            </div>
    
                                            <div className="text-sm font-semibold text-gray-600">Delivery by Wed, Aug 28</div>
                                        </div>
                                    </div>
    
                                    <div className='flex flex-row justify-between font-semibold items-center  sm:flex-col sm:gap-2'>
                                        <div className='bg-gray-200 text-lg py-2 px-3 rounded-2xl'><span className='sm:hidden'>Price: </span>${prod.newPrice * prod.quantity}</div>
    
                                        <div className='bg-gray-200 text-lg py-2 px-4 rounded-2xl flex gap-3'>
                                            <span onClick={()=>{DecreaseQuantity(prod)}} className='text-red-400 cursor-pointer'><i class="fa-solid fa-minus"></i></span>
                                            <span className=''>{prod.quantity}</span>
                                            <span onClick={()=>{IncreaseQuantity(prod)}} className='text-green-400 cursor-pointer'><i class="fa-solid fa-plus"></i></span>
    
                                        </div>
                                        
                                         <div onClick={()=>{removeFromCart(prod)}} className='cursor-pointer'><i class="fa-solid fa-trash-can text-xl hover:text-red-500 "></i></div>
                                    </div>
                                </div>
                            </div>
                        ))

                    )
                    
                }
            </div>

{/* coupencode */}
           {cart.length > 0 && (
                <div className='w-full md:w-[40%] flex flex-col gap-4'>
                <div className='border border-slate-300 rounded-lg py-4 px-5  flex flex-col items-start gap-2'>
                    <h1 className='font-bold text-lg'>Your Coupon Code Enter Here</h1>
                    <div className='w-full max-w-[530px] flex'>
                        <input className='bg-slate-10 py-[.6em] px-[1.5em] text-[.6rem] md:text-[1rem] w-[75%]  rounded-full outline-none' type="email" placeholder='Coupon Code' value={couponCode} onChange={(e)=> setCouponCode(e.target.value)} />
                        <button onClick={applyCoupon} className='bg-black text-white -ml-10  py-[.6em] px-[1.5em] text-[.6rem] md:text-[1rem] rounded-full font-semibold'>Submit</button>
                    </div>

                    {couponAlert && 
                         <div className='bg-slate-10 text-[10px] rounded-full py-1 px-2 flex gap-1 items-center'>
                            <i class="fa-solid fa-tags rotate-180 transform scale-y-[-1]"></i>
                            <span>{couponAlert}</span>
                            <IoCloseOutline onClick={RemoveCouponCode} className='text-sm cursor-pointer'/>
                        </div>}
                </div>



                <div className='border border-slate-300 rounded-lg py-3 px-5 flex flex-col gap-2'>
                    <h1 className='py-2 font-bold text-lg'>Price Details</h1>

                    <div className='h-[1px] w-full bg-slate-300' />

                    <div className='py-4 flex flex-col gap-3'>
                        <div className='flex justify-between'>
                            <div className='font-semibold text-[16px]'>Price ({cart.length} items)</div>
                            <div className='font-semibold text-[16px]'>{totalCost}</div>
                        </div>

                        <div className='flex justify-between'>
                            <div className='font-semibold text-[16px]'>Discount</div>
                            <div className='font-semibold text-green-500 text-[16px]'>-${discount}</div>
                        </div>

                        <div className='flex justify-between'>
                            <div className='font-semibold text-[16px]'>Delivery Charges</div>
                            <div className='font-semibold text-[16px]'><span className='line-through text-gray-20'>$2</span> <span className='text-green-500'>Free</span></div>
                        </div>

                        <div className='h-[1px] w-full bg-slate-300' />

                        <div className='flex justify-between'>
                            <div className='font-extrabold text-[16px]'>Total Amount</div>
                            <div className='font-extrabold text-[16px]'>${finalAmount}</div>
                        </div>

                    </div>

                    <div className='text-green-500 font-semibold'>You will save ${discount+2} on this order</div>

                    <div className='h-[1px] my-2 w-full bg-slate-300' />


                    <button onClick={proceedToCheckout} className='p-2 border text-center border-secondary text-secondary hover:bg-secondary hover:text-white rounded-full'>
                         Checkout
                    </button>



                </div>
            </div>
           )}
        </div>
    )
}

export default Cart
