import React, { FC, useState } from 'react'
import debounce from 'lodash.debounce'
import cls from './Search.module.scss'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'
import { useCallback } from 'react'

const Search: FC = () => {
  const [value, setValue] = useState('')

  const dispatch = useDispatch()

  const updateValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str))
    }, 400),
    []
  )
    
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    updateValue(e.target.value)
  }

  return (
    <div className={cls.root}>
      <input value={value} onChange={onChangeInput} className={cls.input} type="text" placeholder='Поиск пиццы...' />
      <svg className={cls.icon} enable-background="new 0 0 50 50" height="50px" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="50px" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="50" width="50" /><circle cx="21" cy="20" fill="none" r="16" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" /><line fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="4" x1="32.229" x2="45.5" y1="32.229" y2="45.5" /></svg>
    </div>

  )

}

export default Search