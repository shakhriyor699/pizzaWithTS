import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
}


export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum
}

export interface IFilterSliceState {
  categoryId: number;
  pageCount: number;
  searchValue: string;
  sort: Sort
}


const initialState: IFilterSliceState = {
  categoryId: 0,
  pageCount: 1,
  searchValue: '',
  sort: {
    name: "популярности",
    sortProperty: SortPropertyEnum.RATING_DESC,
  }
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload
    },
    setPageCount: (state, action: PayloadAction<number>) => {
      state.pageCount = action.payload
    },
    setFilters(state, action: PayloadAction<IFilterSliceState>) {
      state.categoryId = Number(action.payload.categoryId)
      state.pageCount = Number(action.payload.pageCount)
      state.sort = action.payload.sort
    }
  },
})

export const { setCategoryId, setSort, setPageCount, setFilters, setSearchValue } = filterSlice.actions
export default filterSlice.reducer