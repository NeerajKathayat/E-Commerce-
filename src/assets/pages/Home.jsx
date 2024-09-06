import React, { useEffect } from 'react'
import PopularProducts from '../Components/PopularProducts';
import Hero from '../Components/Hero'
import BannerOffer from '../Components/BannerOffer';
import LatestProduct from '../Components/LatestProduct';
import Subsribe from '../Components/Subsribe';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import { resetCart, setCart } from '../store/cartSlice';
import { setWish , resetWish } from '../store/wishListSlice';
const Home = () => {

    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    useEffect(() => {
        const getUser = async () => {
            try {

                const result = await fetch("http://localhost:4000/auth/login/success", {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                })
                const response = await result.json()
                console.log(response)
                dispatch(login({ token: response.token, userId: response.userId }));

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


            } catch (error) {
                console.log(error)
            }
        }
        if (!isAuthenticated) {
            getUser()
        }
    }, [])

    return (
        <>
            <Hero />
            <PopularProducts />
            <BannerOffer />
            <LatestProduct />
            <Subsribe />

        </>
    )
}

export default Home
