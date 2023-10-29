import React, { useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

// Navbar Componnent
function Navbar() {
    const cart = useSelector((state) => state.product)
    return (
        <div className='w-full h-10 fixed top-0 z-50 bg-slate-500 flex items-center justify-between px-12  '>
            <Link to={'/'} className=' text-xl text-white'>E-<span className=' text-yellow-400'>commerce</span></Link>
            <div className='flex items-center gap-2'>
                <Link to={"/cart"} className=' text-white flex items-center gap-1'>cart <ShoppingCartIcon /></Link>
                <span>
                    {/* this is important if we want to display the count of products in cart use cart.leangth */}
                    <h1 className='p-3 h-2 w-2 flex items-center justify-center rounded-full bg-red-600 text-white' > {cart.length} </h1>
                </span>
            </div>
        </div>
    )
}

export default Navbar