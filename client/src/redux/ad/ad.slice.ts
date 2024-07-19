import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Ad } from '../../types/ad.types'

type StateType = {
    ads: Ad[]
}

const adSlice = createSlice({
    name: 'ad',
    initialState: { ads: [] } as StateType,
    reducers: {
        setAds:(state: StateType,action:PayloadAction<Ad[]>)=>{
            state.ads=action.payload
         },
        // setAdById: (state: StateType, action: PayloadAction<number>) => {
        //     state.ads.filter(a => a.id == action.payload)
        // },
        // setAdById: (state: StateType, action: PayloadAction<number>) => {
        //     return state.ads.find(ad => ad.id === action.payload);
        // },
        
        addAd: (state: StateType, action: PayloadAction<Ad>) => {
            state.ads.push(action.payload)
        },
        deleteAd: (state: StateType, action: PayloadAction<number>) => {
            state.ads = state.ads.filter(a => a.id != action.payload)
        },
        updateAd: (state: StateType, action: PayloadAction<Ad>) => {
            const p = state.ads.filter(pp => pp.id === action.payload.id)
            state.ads = state.ads.filter(p => p.id !== action.payload.id)
            p[0].title = action.payload.title
            p[0].context=action.payload.context
            state.ads = [...state.ads, p[0]]
        }
    }
})

export const { addAd, deleteAd, updateAd, setAds } = adSlice.actions

export default adSlice.reducer