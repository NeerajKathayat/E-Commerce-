import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addWish , removeWish } from '../store/wishListSlice';
import productDetailSlice from '../store/productDetailSlice';
const Products = ({ products }) => {

  const dispatch = useDispatch()
  const navigate =useNavigate()
  const wishList  = useSelector((state)=> state.wishList)
  const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated)
 
  const AddWishList=(e,product)=>{
       
    e.stopPropagation()
    e.preventDefault()
     
    if(!isAuthenticated){
          navigate('/login')
          return
       }



       dispatch(addWish(product))
  }

  const RemoveWishList=(e,product)=>{
    console.log("k")
    e.stopPropagation()
    e.preventDefault()

    dispatch(removeWish(product._id))
}
  return (
    <div className='grid grid-cols-1 pb-8 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
      {
        products.map((prod) => (
          <Link to={`/product/${prod._id}`} key={prod.id} className='rounded-lg overflow-hidden shadow-lg  max-w-[300px] group relative'>
            <div className='overflow-hidden'>
              <img className='w-full transition-transform duration-700 ease-in-out transform group-hover:scale-110' src={prod.images[0].url} alt="" />
            </div>
            <div className='flex flex-col gap-2 p-3'>
              <p className='text-gray-30 font-semibold text-sm'>{prod.description}</p>
              <div className='flex gap-3 font-bold'>
                <p className='text-sm'>${prod.newPrice}</p>
                <p className='text-secondary text-sm line-through'>${prod.oldPrice}</p>
              </div>
            </div>

             <div className='absolute top-5 right-4 '>
                {
                  wishList.some(product => product._id == prod._id) ? (
                    <FaHeart onClick={(e)=> RemoveWishList(e,prod)}  className='text-secondary' />
                  ) : (
                    < FaRegHeart  onClick={(e)=> AddWishList(e,prod)}/>
                  )
                }
              
               
             </div>
           
          </Link>
        ))
      }
    </div>
  )
}

export default Products
