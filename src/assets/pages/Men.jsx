import React, { useEffect } from 'react'
import bannerMen from '../images/bannermens.png'
import Products from '../Components/Products'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/productSlice'
import { RiLoader4Fill } from "react-icons/ri";
const Men = () => {
  const dispatch = useDispatch()

  const { data: products, status } = useSelector((state) => state.product.men)

  console.log(status)

  useEffect(() => {

    dispatch(fetchProducts('men'))

  }, [])
  return (
    <div className='mt-[59px]'>
      <div className='flex flex-col gap-10'>
        <img src={bannerMen} alt="" />

        {status == 'loading' ? (
             <div className='flex justify-center mb-10'> 
              <RiLoader4Fill className="animate-spin text-5xl text-secondary" />
             </div>
        ) : (
          <div className='max-w-[1430px] mx-auto px-5'>
            <Products products={products} />
          </div>
        )}
      </div>


    </div>
  )
}

export default Men
