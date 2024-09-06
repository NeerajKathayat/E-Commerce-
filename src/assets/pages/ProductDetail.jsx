import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchProductDetail } from '../store/productDetailSlice'
import { IoIosStarOutline } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import { add, remove } from '../store/cartSlice';
import SimilarProduct from '../Components/SimilarProducts';
import Breadcrumb from '../Components/Breadcrumb';
const ProductDetail = () => {
    const { productId } = useParams()
    console.log(productId)

    const [Tab , setTab] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const product = useSelector((state) => state.productDetail.product);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    const cart = useSelector((state) => state.cart)

    const [size , setSize ]= useState('S')


    useEffect(() => {
        dispatch(fetchProductDetail(productId));
    }, [dispatch, productId])

    const addToCart = (product) => {
        if(!isAuthenticated){
            navigate("/login")
            return
        }
        console.log(product)
        dispatch(add(product))
    }

    const removeFromCart = (product) => {
        console.log(product)
        dispatch(remove(product._id))
    }

    const BuyNow = () =>{
           
    }
    return (
        <div className='bg-primary mt-[59px]'>
            <div className=' max-w-[1430px] mx-auto px-5 py-20 flex flex-col gap-8'>
                
              {product &&   <Breadcrumb product={product}/>}
                
                
                {
                    product && (
                        <div className='flex flex-col lg:flex-row gap-10'>

                            <div className='flex gap-2'>

                                <div className='flex flex-col gap-[7px]'>
                                    <img className='max-h-[99px]' src={product.images[0].url} alt="" />
                                    <img className='max-h-[99px]' src={product.images[0].url} alt="" />
                                    <img className='max-h-[99px]' src={product.images[0].url} alt="" />
                                    <img className='max-h-[99px]' src={product.images[0].url} alt="" />
                                </div>
                                
                               <div>
                               <img  src={product.images[0].url} alt="" />
                               </div>
                            </div>

                            <div className='flex flex-col gap-[18px]'>
                                <h1 className='text-xl  md:text-2xl font-bold'>{product.description}</h1>

                                <div className='flex gap-2'>
                                    {
                                        [...Array(5)].map((_, index) => (
                                            <span>
                                                {product.ratings > index ? <IoStar className='text-secondary text-sm md:text-lg' /> : <IoIosStarOutline className='text-secondary text-sm md:text-lg' />}
                                            </span>

                                        ))
                                    }
                                    <span>(122)</span>
                                </div>

                                <div className='flex gap-2'>
                                    <span className='font-bold text-sm md:text-lg'>${product.newPrice}</span>
                                    <span className='text-secondary font-bold text-sm md:text-lg line-through decoration-[2px] '>${product.oldPrice}</span>
                                </div>


                                <div className='flex flex-col gap-3'>
                                    <p className='font-bold text-sm md:text-lg'>Select Size:</p>

                                    <div className='flex gap-3'>
                                        <span onClick={()=> setSize('S')} className={`py-3 cursor-pointer px-4 border-2 ${size === 'S' ? 'border-black' : 'border-gray-400'} text-sm`}>S</span>
                                        <span onClick={()=> setSize('M')} className={`py-3 cursor-pointer px-4 border-2 ${size === 'M' ? 'border-black' : 'border-gray-400'} text-sm`}>M</span>
                                        <span onClick={()=> setSize('L')} className={`py-3 cursor-pointer px-4 border-2 ${size === 'L' ? 'border-black' : 'border-gray-400'} text-sm`}>L</span>
                                        <span onClick={()=> setSize('XL')} className={`py-3 cursor-pointer px-4 border-2 ${size === 'XL' ? 'border-black' : 'border-gray-400'} text-sm`}>XL</span>

                                    </div>

                                </div>


                                {
                                    cart.some(prod => prod._id == product._id) ? (
                                        <button className='py-3 border-2 bg-red-600 text-white font-bold text-sm' onClick={() => { removeFromCart(product) }}>REMOVE FROM CART</button>) :
                                        (
                                            <button className='py-3 border-2 border-black hover:bg-black hover:text-white font-bold text-sm' onClick={() => { addToCart(product) }}>ADD TO CART</button>
                                        )
                                }

                                <button onClick={()=>{BuyNow}} className='py-3 bg-black text-white font-bold text-sm hover:bg-transparent hover:text-black border-2 hover:border-black'>BUY IT NOW</button>

                                <div>
                                    <p className='text-sm md:text-lg'><span className='font-bold '>Category : </span>{product.category} | {product.name} | Crop Top</p>
                                    <p className='text-sm md:text-lg'><span className='font-bold'>Tags : </span> Modern | Latest</p>
                                </div>

                            </div>





                        </div>
                    )
                }

                <div className='flex gap-3'>
                    <button onClick={()=> setTab(1)} className={`py-[.5em] px-[1.5em] text-[.7rem] md:text-[1.1rem] border border-black ${Tab == 1 ? 'bg-black text-white': 'text-black bg-transparent'}  font-bold`}>Description</button>
                    <button onClick={()=> setTab(2)} className={`py-[.5em] px-[1.5em] text-[.7rem] md:text-[1.1rem] border border-black ${Tab == 2 ? 'bg-black text-white': 'text-black bg-transparent'}  font-bold`}>Care Guide</button>
                    <button onClick={()=> setTab(3)} className={`py-[.5em] px-[1.5em] text-[.7rem] md:text-[1.1rem] border border-black ${Tab == 3 ? 'bg-black text-white': 'text-black bg-transparent'}  font-bold`}>Size Guide</button>

                </div>


               {Tab == 1 &&  <div >
                 Our premium collection of clothing combines timeless style with modern functionality. Crafted from the finest materials, each piece is designed to offer both comfort and elegance, ensuring you look and feel your best on any occasion. From casual wear to formal attire, our garments are tailored to perfection, featuring intricate details and a flawless finish. Whether you're dressing up for a special event or looking for something versatile for everyday wear, our collection has something to suit every taste and style.
                </div>}

               {Tab == 2 &&  <div>To maintain the quality and longevity of your clothing, follow these simple care instructions. Machine wash in cold water with like colors to prevent color bleeding. Use a mild detergent to preserve the fabric's softness and texture. Avoid using bleach or harsh chemicals, as they can damage the fabric. For best results, air dry your clothes or tumble dry on low heat. If ironing is necessary, use a low heat setting and iron inside out to protect any prints or embellishments. By following these care guidelines, you'll keep your garments looking fresh and new for years to come.</div>}


               {Tab == 3 && (
                  <div className='flex flex-col gap-5'>
                    <div>Finding the perfect fit is essential for comfort and style. Our size guide provides detailed measurements to help you choose the right size for your body type. Measure your bust, waist, and hips, and compare them to our size chart to ensure the best fit. If you're between sizes, we recommend choosing the larger size for a more comfortable fit. Our garments are designed to accommodate different body shapes, so whether you prefer a slim fit or a more relaxed silhouette, you'll find something that suits your preference. Remember, a well-fitting garment not only looks great but also feels great to wear.</div>
                    <div className='grid grid-cols-5 gap-2 text-sm max-w-[600px]'> 
                        <div className='font-bold text-base w-[83px]   text-center'>Size</div>
                        <div className='font-bold text-base  text-center'>S</div>
                        <div className='font-bold text-base text-center'>M</div>
                        <div className='font-bold text-base text-center'>L</div>
                        <div className='font-bold text-base text-center'>XL</div>

                        <div className='font-bold text-base w-[83px] '>Chest(in)</div>
                        <div className=' text-center'>36-38</div>
                        <div className='text-center'>38-40</div>
                        <div className='text-center'>42-44</div>
                        <div className='text-center'>46-48</div>

                        <div className='font-bold text-base w-[83px]  '>Waist(in)</div>
                        <div className='text-center'>30-32</div>
                        <div className='text-center'>32-34</div>
                        <div className='text-center'>36-38</div>
                        <div className='text-center'>40-42</div>

                        <div className='font-bold text-base w-[83px] '>Hips(in)</div>
                        <div className='text-center'>36-38</div>
                        <div className='text-center'>38-40</div>
                        <div className='text-center'>42-44</div>
                        <div className='text-center'>46-48</div>

                        <div className='font-bold text-base w-[83px] '>Chest(cm)</div>
                        <div className='text-center'>91-96</div>
                        <div className='text-center'>96-101</div>
                        <div className='text-center'>106-111</div>
                        <div className='text-center'>116-121</div>

                        <div className='font-bold text-base w-[83px] '>Waist(cm)</div>
                        <div className='text-center'>76-81</div>
                        <div className='text-center'>81-86</div>
                        <div className='text-center'>91-96</div>
                        <div className='text-center'>101-106</div>
                      
                        <div className='font-bold text-base w-[83px] '>Hips(cm)</div>
                        <div className='text-center'>91-96</div>
                        <div className='text-center'>96-101</div>
                        <div className='text-center'>106-111</div>
                        <div className='text-center'>116-121</div>
                    </div>
                 </div>
                )}
            </div>

             {product && (
                <SimilarProduct category={product.category}/>
             )}
        </div>
    )
}

export default ProductDetail
