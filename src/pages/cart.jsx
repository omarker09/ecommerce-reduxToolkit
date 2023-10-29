import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, quantityMinus, quantityPlus } from '../redux-tookit/slices/eliteslice';

function Cart() {

    const [isLoading, setIsloading] = useState(true)
    const [isError, setIserror] = useState(false)
    const [isData, setIsData] = useState()

    // Get all the Products, using useSelector() Function.
    const products = useSelector((state) => {
        return state.product
    })
    // Check if cart is empty
    function checkData() {
        if (products.length === 0) {
            setIsData(true)
        } else {
            setIsData(false)
        }
    }

    // declare dispatch as useDispatch()
    const dispatch = useDispatch()

    // Calculating The Total price with reduce() so we can loop the data and calc the total price * quantity
    const total = products.reduce((acc, product) => {
        acc += product.price * product.quantity
        return acc;
    }, 0)

    // Increment count function
    function handlePlus(el) {
        dispatch(quantityPlus(el))

    }
    // Decrement count function
    function handleMinus(el) {
        dispatch(quantityMinus(el))
        checkData()
    }
    // Total card price function (its only calculate single card)
    function TotalProduct(el) {
        const tot = el.price * el.quantity
        return tot.toFixed(2)
    }
    // Delete The product By calling deleteProduct() action
    function deleteP(el) {
        dispatch(deleteProduct(el))
    }

    // Here we just check if the API has an error like we do in data.js which handles the error.
    function fetchData() {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                setIsloading(false)
            })
            .catch((err) => {
                setIserror(true)
                setIsloading(false)
            })
    }
    useEffect(() => {
        fetchData()
        checkData()
    }, [])

    return (
        <div className='w-full p-7  flex flex-col gap-2 items-center justify-center'>
            {isLoading ? <div className=' h-96 w-full flex items-center justify-center'><div className='spinner'></div></div> : isError ? <div className=' h-96 w-full flex items-center justify-center'><div className=' text-black'>error something wrong !!</div></div>
                : isData ? <div className=' h-96 w-full flex items-center justify-center'><div className=' text-black'>the cart is empty !!</div></div> :
                    products.map((el) => {
                        return <div key={el.id} className='border border-solid border-gray-300 rounded-lg bg-white mt-4 flex flex-col gap-2 p-2 h-50 w-96 items-center justify-center'>
                            <h1>Title: {el.title} </h1>
                            <img src={el.image} className=' w-40 h-40' />
                            <span>Description: {el.description} </span>
                            <span>price: ${el.price}  </span>
                            <div className=' flex items-center gap-2'>
                                <button className=' bg-blue-500 px-3 text-white rounded-sm' onClick={() => { handleMinus(el) }}>-</button>
                                <span className=' border border-solid border-gray-500 text-black  px-3 rounded-md'>{el.quantity} </span>
                                <button className=' bg-blue-500 px-3 text-white rounded-sm' onClick={() => { handlePlus(el) }}>+</button>
                            </div>
                            <button onClick={() => { deleteP(el) }} className=' bg-red-600 text-white rounded-md p-1'>delete</button>
                            <span className=' border border-solid border-gray-500 text-black p-1 rounded-md'>total product : ${TotalProduct(el)} </span>
                        </div>
                    })
            }
            <div className=' text-white w-full items-center justify-start  flex gap-2  bottom-2'>
                <div className=' bg-black text-white  fixed bottom-2 items-center justify-start p-2 flex gap-2 rounded-xl'>
                    <span>Total : ${total.toFixed(2)} </span>
                    <button className='bg-white text-black p-1 rounded-md'>Checkout</button>
                </div>
            </div>
        </div>
    )
}

export default Cart