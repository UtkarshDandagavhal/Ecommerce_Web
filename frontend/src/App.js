import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import axios from "axios";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js"
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import Contact from "./component/layout/Contact/Contact.js";
import About from  "./component/layout/About/About.js"
import ProductReviews from "./component/Admin/ProductReviews";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/contact" component={Contact}/>
      <Route exact path="/about" component={About}/>
      <ProtectedRoute exact path="/account" component={Profile} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute
        exact
        path="/password/update"
        component={UpdatePassword}
      />

      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />

      <Route exact path="/login" component={LoginSignUp} />

      <Route exact path="/cart" component={Cart} />
      <ProtectedRoute exact path="/shipping" component={Shipping} />
      <ProtectedRoute exact path="/success" component={OrderSuccess} />

      <ProtectedRoute exact path="/orders" component={MyOrders} />
      <Switch>
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
      </Switch>

      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/dashboard"
        component={Dashboard}
      />

      <ProtectedRoute
        exact
        path="/admin/products"
        isAdmin={true}
        component={ProductList}
      />
    
    <ProtectedRoute
          exact
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
        />

<ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component = {UpdateProduct}
        />

<ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
        />
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <Footer />
    </Router>
  );
}

export default App;
