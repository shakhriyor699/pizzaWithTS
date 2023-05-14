import React, { FC, useCallback } from 'react'
import { setCategoryId } from '../../redux/slices/filterSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'

const Categories: FC = React.memo(() => {
  const dispatch = useAppDispatch()
  const { categoryId } = useAppSelector(state => state.filter)
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  const onClickCategory = useCallback((index: number) => {
    dispatch(setCategoryId(index))
  }, [])

  return (
    <div className="categories">
      <ul>
        {
          categories.map((item, index) => (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={categoryId === index ? 'active' : ''}
            >
              {item}
            </li>
          ))
        }
      </ul>
    </div>
  )
})

export default Categories