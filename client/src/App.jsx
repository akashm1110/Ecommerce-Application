import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminFeatures from "./pages/admin-view/features";
import AdminOrders from "./pages/admin-view/orders";
import AdminProducts from "./pages/admin-view/products";
import ShoppingLayout from "./components/shopping-view/layout";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import UnauthPage from "./pages/unauth-page";
import NotFound from "./pages/not-found";
import CheckAuth from "./components/common/check-auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";


function App() {


  const {user , isAuthenticated  ,isLoading} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch]);

  if(isLoading) return <Skeleton className="w-[800] bg-black h-[600px]"/>

   console.log(isLoading, user);

  return (  
      <div className="flex flex-col overflow-hidden bg-white" >
      <Routes>

          <Route path="/" element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}> </CheckAuth>
          }/>


          {/* For Auth */}
          <Route path = "/auth" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <AuthLayout/>
            </CheckAuth>
          }>
                    <Route path = "login" element={<AuthLogin/>} />
                    <Route path = "register" element={<AuthRegister/>} />

          </Route>

          {/* For Admin */}
          <Route path = "/admin" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <AdminLayout/>
            </CheckAuth>
          }>
                    <Route path = "dashboard" element={<AdminDashboard/>} />
                    <Route path = "features" element={<AdminFeatures/>} />
                    <Route path = "orders" element={<AdminOrders/>} />
                    <Route path = "products" element={<AdminProducts/>} />

          </Route>

          {/* For Shopping */}
          <Route path = "/shop" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <ShoppingLayout/>
          </CheckAuth>
          }>
                      <Route path = "account" element={<ShoppingAccount/>} />
                      <Route path = "checkout" element={<ShoppingCheckout/>} />
                      <Route path = "home" element={<ShoppingHome/>} />
                      <Route path = "listing" element={<ShoppingListing/>} />
                      <Route path="paypal-return" element={<PaypalReturnPage />} />
                      <Route path="payment-success" element={<PaymentSuccessPage />} />
                      <Route path="search" element={<SearchProducts />} />

          </Route>


          {/* For UnauthPage  */}
          <Route path = "/unauth-page" element={<UnauthPage/>}/>

          {/* For NotFound */}
          <Route path = "*" element={<NotFound/>}/>
        </Routes>
      </div>
  );
}

export default App;
