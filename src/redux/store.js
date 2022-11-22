import { configureStore } from "@reduxjs/toolkit";
import { addBannerReducer, allBannersReducer, deleteBannerReducer } from "./reducers/bannerReducer";
import { allCategoriesReducer, categoryReducer, newCategoryReducer } from "./reducers/categoryReducer";
import { chartReducer, chartSalesReducer } from "./reducers/chartReducer";
import { allNurseriesReducer } from "./reducers/nurseryReducer";
import { allOrdersReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";
import { productDetailsReducer, productsReducer,newProductReducer,productReducer } from "./reducers/productReducers";
import { ordersTicketReducer } from "./reducers/ticketsReducer";
import { allUsersReducer, userReducer, verifyUserReducer } from "./reducers/userReducer";






const Store = configureStore({
  reducer: {
    products: productsReducer,
     productDetails: productDetailsReducer,
     user: userReducer,
     verifyUser : verifyUserReducer,
     addBanner : addBannerReducer,
     banners : allBannersReducer,
     deleteBanner: deleteBannerReducer,
     allOrders : allOrdersReducer,
     allNurseries : allNurseriesReducer,
     orderDetails : orderDetailsReducer,
     ordersTicket : ordersTicketReducer,
     allCategories : allCategoriesReducer,
     newCategory : newCategoryReducer,
    // categoryDetails : categoryDetailsReducer,
     category : categoryReducer,
     allUsers : allUsersReducer,
     order : orderReducer,
     chart:chartReducer,
     chartSales:chartSalesReducer,
    // userDetails : userDetailsReducer,
    // forgotPassword : forgotPasswordReducer,
    // deleteCart : deleteCartItemReducer,
    // shippingInfo : saveShippingReducer,
    // shippingDetails : shippingDetails,
    // newOrder : newOrderReducer,
    // myOrders : myOrdersReducer,
    // orderDetails : orderDetailsReducer,
    // newReview : newReviewReducer,
    newProduct : newProductReducer,
    product : productReducer,
    // productReviews : productReviewsReducer,
    // reviews : reviewReducer,
    
    
    // newWishlist :newWishlistReducer,
    // myWishlist : myWishlistReducer,
    // deleteWishlist : deleteWishlistItemReducer,


    
    
  },

  
  
});

export default Store;
