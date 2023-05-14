import React, { useEffect, useRef, FC } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useSelector } from 'react-redux'
import Categories from '../components/Categories'
import SortPopUp, { list } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Pagination from '../components/Pagination'
import qs from 'qs'
import { Link, useNavigate } from 'react-router-dom'

import { IFilterSliceState, setFilters, setPageCount } from '../redux/slices/filterSlice'
import { FetchPizzasType, fetchPizzas } from '../redux/slices/pizzasSlice'
import Skeleton from '../components/PizzaBlock/Skeleton'


const Home: FC = () => {
  const navigate = useNavigate()
  const sort = useAppSelector(state => state.filter.sort)
  const dispatch = useAppDispatch()
  const { categoryId, pageCount, searchValue } = useAppSelector(state => state.filter)
  const { items, isLoading } = useAppSelector(state => state.pizza)
  const isSearch = useRef(false)
  const isMounted = useRef(false)


  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as FetchPizzasType
  //     const sort = list.find(obj => obj.sortProperty === params.sortBy)
  //     dispatch(setFilters({
  //       categoryId: Number(params.category),
  //       pageCount: Number(params.pageCount),
  //       searchValue: params.searchValue,
  //       sort: sort || list[0]
  //     }))
  //     isSearch.current = true
  //   }
  // }, [])

  useEffect(() => {
    isSearch.current = false
    if (!isSearch.current) {
      getPizzas()
    }
    // isSearch.current = false
    window.scrollTo(0, 0)
  }, [categoryId, sort.sortProperty, pageCount, searchValue]);

  const getPizzas = () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    dispatch(
      fetchPizzas({
        category,
        sortBy,
        order,
        pageCount,
        searchValue
      })
    )
  }

  const onChangePage = (pageNumber: number) => {
    dispatch(setPageCount(pageNumber))
  }


  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       pageCount
  //     })
  //     navigate(`?${queryString}`)
  //   }
  //   isMounted.current = true
  // }, [categoryId, sort.sortProperty, pageCount]);

  const skeleton = [...new Array(10)].map((_, index) => <Skeleton key={index} />)
  const pizzas = items.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <SortPopUp />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading ? skeleton : pizzas
        }
      </div>
      <Pagination value={pageCount} onPageChange={onChangePage} />
    </div>
  )
}
export default Home