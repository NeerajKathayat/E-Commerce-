import React from 'react'

const Breadcrumb = ({product}) => {
  return (
    <div className='flex gap-2 items-center text-[10px] sm:text-sm  md:text-lg '>
    <span>HOME</span>
    <i class="fa-solid fa-chevron-right"></i>
    <span>SHOP</span>
    <i class="fa-solid fa-chevron-right "></i>
    <span className='uppercase'>{product.category}</span>
    <i class="fa-solid fa-chevron-right"></i>
    <span>{product.description}</span>
</div>
  )
}

export default Breadcrumb
