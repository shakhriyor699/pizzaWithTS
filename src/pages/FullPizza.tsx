import React, { FC } from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Skeleton from '../components/PizzaBlock/Skeleton';
import axios from 'axios';

const FullPizza: FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string
    title: string
    price: number
  }>()
  const { pizzaId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const res = await axios(`https://642fc291b289b1dec4b9436d.mockapi.io/items/${pizzaId}`)
        setPizza(res.data)

      } catch (error) {
        alert('Такой пиццы нет (')
        navigate('/')
      }
    }
    fetchPizza()
  }, []);

  if (!pizza) {
    return <Skeleton />
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  )
}

export default FullPizza