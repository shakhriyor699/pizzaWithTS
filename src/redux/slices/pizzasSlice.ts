import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Sort } from "./filterSlice";


export type FetchPizzasType = {
  category: string;
  sortBy: string;
  searchValue: string;
  pageCount: number;
  order: string;
}
type PizzaItem = {
  id: number
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
  rating: number
}





export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasType>(
  'pizzas/fetchPizzasStatus',
  async (params) => {
    const { category, sortBy, pageCount, order, searchValue } = params
    const { data } = await axios.get<PizzaItem[]>(`https://642fc291b289b1dec4b9436d.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}&search=${searchValue}`)
    return data;
  }
)

interface IPizzaSliceState {
  items: PizzaItem[],
  isLoading: boolean,
  error: string | null
}

const initialState: IPizzaSliceState = {
  isLoading: true,
  items: [],
  error: null
}

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.isLoading = true
        state.items = []
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload
        state.isLoading = false
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.error = 'error'
        state.isLoading = false
        state.items = []
      })
  }
})

export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer