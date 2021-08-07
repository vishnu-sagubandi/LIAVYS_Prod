import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer,productDetailsReducer,productReviewCreateReducer,productTopRatedReducer,productDeleteReducer,categoryListReducer,heroCarouselReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userDetailsReducer, userLoginReducer,userRegisterReducer, userUpdateProfileReducer,userListReducer,userDeleteReducer, userUpdateReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer,paymentTokenReducer,orderPayReducer, orderListReducer,orderDeliverReducer } from './reducers/orderReducers'

const reducer=combineReducers({
    productList:productListReducer,
    categoryList:categoryListReducer,
    productDetails:productDetailsReducer,
    productReviewCreate:productReviewCreateReducer,
    productTopRated:productTopRatedReducer,
    productDelete:productDeleteReducer,
    heroCarousel:heroCarouselReducer,

    cart:cartReducer,

    userLogin : userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,


    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderListMy:orderListMyReducer,
    paymentToken:paymentTokenReducer,
    orderPay:orderPayReducer,
    orderList:orderListReducer,
    orderDeliver:orderDeliverReducer
})

const cartItemsFromStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const userInfoFromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
const shippingAddressFromStorage=localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{}

const initialState={
    cart:{
        cartItems: cartItemsFromStorage, 
        shippingAddress: shippingAddressFromStorage
    } ,
    userLogin:{userInfo:userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store;