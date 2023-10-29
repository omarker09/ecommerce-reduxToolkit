import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { addProduct } from '../redux-tookit/slices/eliteslice';

import { useDispatch } from 'react-redux';
function Data() {
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [isLoading, setIsloading] = useState(true)
    const [isError, setIserror] = useState()
    /* For data, I use Fakestoreapi to display products using fetch method.
      I also used Material UI so the buttons look nice:)
    */
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                setData(json)
                setIsloading(false)
            })
            .catch((err) => {
                setIserror(true)
                setIsloading(false)
            })
    }, [])
    const addToCart = (el) => {
        const datas = {
            id: el.id,
            image: el.image,
            title: el.title,
            description: el.description,
            price: el.price
        }
        dispatch(addProduct(datas))
    }
    return (
        <div className='flex w-full justify-center  flex-wrap gap-5 items-center h-full mt-7'>
            {isLoading ? <div className=' h-96 w-full flex items-center justify-center'><div className='spinner'></div></div> : isError ? <div className=' h-96 w-full flex items-center justify-center'><div className=' text-black'>error something wrong !!</div></div> : data.map((el) => {
                // change the card height or width as you want maxWidth & maxHeight
                return <Card key={el.id} sx={{ maxWidth: 445, maxHeight: 600 }}>
                    <CardMedia
                        sx={{ height: 170 }}
                        image={el.image}
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {el.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {el.description}
                        </Typography>
                    </CardContent>
                    <CardActions className='w-full justify-center items-center flex'>
                        <Button variant="text"> ${el.price} </Button>
                        <Button onClick={() => { addToCart(el) }} variant="contained">Add To Cart</Button>
                    </CardActions>
                </Card>
            })}
        </div>
    )
}

export default Data;