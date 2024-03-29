import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState:{
        products:[],
        total:0,
        quantity:0
    },
    reducers:{
        addProduct:(state, action)=>{
            //pass pizza detail as a payload
            state.products.push(action.payload)
            state.quantity+=1
            state.total += action.payload.price*action.payload.quantity
        },
        reset:(state)=>{
            state.products=[],
            state.total=0,
            state.quantity=0
        }
    }
})
export const {addProduct, reset} = cartSlice.actions
export default cartSlice.reducer