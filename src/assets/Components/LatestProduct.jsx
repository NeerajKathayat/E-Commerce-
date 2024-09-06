import React, { useEffect } from 'react'
import { fetchProducts } from '../store/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import Products from './Products'
import { RiLoader4Fill } from "react-icons/ri";
const LatestProducts = () => {

    const dispatch = useDispatch()

    const { data: products, status } = useSelector((state) => state.product.child)

    useEffect(() => {

        dispatch(fetchProducts('child'))

    }, [])

    const childProducts = products.slice(0, 8); // Get only the first 4 men products


    return (

        <div className='py-10 px-5 min-h-screen  flex flex-col items-center gap-10'>
            <h1 className='text-3xl md:text-5xl font-semibold'>Popular Products</h1>
            {status == 'loading' ? (
                <div className='flex justify-center mb-10'>
                    <RiLoader4Fill className="animate-spin text-5xl text-secondary" />
                </div>
            ) : (
                <Products products={childProducts} />
            )}


        </div>
    )
}

export default LatestProducts
