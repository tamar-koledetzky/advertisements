import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Category } from '../../types/category.type'

type StateType = {
    categories: Category[]
}

const CategorySlice = createSlice({
    name: 'category',
    initialState: { categories: [] } as StateType,
    reducers: {
        getCategories:(state: StateType,action:PayloadAction<Category[]>)=>{
            state.categories=action.payload
         },
        
    }
})

export const { getCategories } =CategorySlice.actions

export default CategorySlice.reducer