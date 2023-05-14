import { PayloadAction, createSlice } from "@reduxjs/toolkit"


export type CartItem = {
  id: string
  title: string
  imageUrl: string
  price: number
  sizes: number
  types: string
  count: number
}

type Minus = {
  id: string
  price: number
}

interface ICartSliceState {
  items: CartItem[],
  totalPrice: number,
  totalCount: number
}


const initialState: ICartSliceState = {
  items: [],
  totalPrice: 0,
  totalCount: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)

      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }
      state.totalPrice += action.payload.price
      state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0)
    },
    minusItem(state, action: PayloadAction<Minus>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)

      if (findItem) {
        findItem.count--
        state.totalPrice -= action.payload.price
        state.totalCount -= 1
      }
      if (findItem?.count === 0) state.items = state.items.filter((obj) => obj.id !== action.payload.id)
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.totalPrice = 0
      state.totalCount = 0
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
      state.totalCount = 0
    }
  }
})

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions
export default cartSlice.reducer