import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { add, remove } from '../store/cartSlice'
import { Link } from 'react-router-dom'
import { IoMdClose } from "react-icons/io";
import { removeWish } from '../store/wishListSlice';
const WishList = () => {
    const wishList = useSelector((state) => state.wishList)
    const cart = useSelector((state) => state.cart)

    const dispatch = useDispatch();

    const addToCart = (product, e) => {
        e.preventDefault()
        e.stopPropagation();
        console.log(product)
        dispatch(add(product))
    }

    const removeFromCart = (product, e) => {
        e.preventDefault()
        e.stopPropagation();
        console.log(product)
        dispatch(remove(product._id))
    }

    const removeFromWishList = (product , e) =>{
        e.preventDefault()
        e.stopPropagation();
        dispatch(removeWish(product._id))
    }

    return (
        <div className='mt-16  max-w-[1430px] mx-auto'>
            <div className='p-5 text-3xl md:text-2xl font-bold text-center'>WishList</div>
               
            <div className='grid grid-cols-1 gap-5 p-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 '>
                {
                   wishList.length == 0 ? (
                      <div className='text-xl font-semibold flex flex-col gap-4'>
                        <span>WishList is Empty!! </span>
                        <Link to="/men" className='bg-secondary hover:bg-orange-400 text-white text-center p-2 rounded-md'>Add Product</Link>
                      </div>
                   ) : (
                    wishList.map((product) => (
                        <Link to={`/product/${product._id}`} key={product._id} className='rounded-lg overflow-hidden shadow-lg  max-w-[300px] group relative flex flex-col'>
                            <div className='overflow-hidden'>
                                <img className='w-full transition-transform duration-700 ease-in-out transform group-hover:scale-110' src={product.images[0].url} alt="" />
                            </div>
                            <div className='flex flex-col gap-2 p-3'>
                                <p className='text-gray-30 font-semibold text-sm'>{product.description}</p>
                                <div className='flex gap-3 font-bold'>
                                    <p className='text-sm'>${product.newPrice}</p>
                                    <p className='text-secondary text-sm line-through'>${product.oldPrice}</p>
                                </div>
                            </div>

                            <div onClick={(e)=>{removeFromWishList(product,e)}} className='absolute top-3 right-4 text-2xl text-secondary hover:text-red-500'>
                                <IoMdClose />
                            </div>

                            {
                                cart.some(prod => prod._id === product._id) ? (
                                    <button className='py-3 border-2 bg-red-600 text-white font-bold text-sm' onClick={(e) => { removeFromCart(product, e) }}>REMOVE FROM CART</button>) :
                                    (
                                        <button className='py-3 text-white bg-secondary hover:bg-orange-400 font-bold text-sm' onClick={(e) => { addToCart(product, e) }}>ADD TO CART</button>
                                    )
                            }

                        </Link>
                    ))
                   )
                }
            </div>
       </div>
        
    )
}

export default WishList
