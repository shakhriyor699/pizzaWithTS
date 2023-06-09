import React, { useState, FC } from 'react'
import { CartItem, addItem } from '../../redux/slices/cartSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { Link } from 'react-router-dom'

export type PizzaBlockProps = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
  count: number
}

const PizzaBlock: FC<PizzaBlockProps> = ({ id, title, price, imageUrl, sizes, types }) => {
  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)
  const count = useAppSelector(state => state.cart.items.find((obj) => obj.id === id))
  const typesNames = ['тонкое', 'традиционное']
  const dispatch = useAppDispatch()



  const addPizzaToCart = () => {
    const pizza: CartItem = {
      id,
      title,
      price,
      imageUrl,
      sizes: sizes[activeSize],
      types: typesNames[activeType],
      count: 0
    }
    dispatch(addItem(pizza))
  }




  return (
    <div className='pizza-block__wrapper'>
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img
            className="pizza-block__image"
            src={imageUrl}
            alt="Pizza"
          />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {
              types.map((type, i) => (
                <li onClick={() => setActiveType(i)} key={i} className={activeType === type ? "active" : ''}>{typesNames[type]}</li>
              ))
            }
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li onClick={() => setActiveSize(i)} key={i} className={activeSize === i ? "active" : ''}>{size} см.</li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button onClick={addPizzaToCart} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {count && <i>{count.count}</i>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PizzaBlock