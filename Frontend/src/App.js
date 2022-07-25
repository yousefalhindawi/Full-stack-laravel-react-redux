import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { AddProduct } from "./features/users/AddProduct";
import { EditProduct } from "./features/users/EditProduct";
import Login from "./components/admin/login";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import React from "react";
import { ProductList } from "./features/users/ProductList";
import { useEffect } from "react";
import { fetchProducts } from "./features/users/productsSlice";
import { useDispatch,useSelector } from "react-redux";


export default function App() {
  const isLogged = useSelector((state) => state.users.isLogged);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  
  }, [dispatch]);
  return (
    <Router>
      <div>

      <Navbar />
      
        <Switch>
          <Route path="/home">
        <Home />
          </Route>
          <Route path="/login">
        <Login />
          </Route>
          <Route path="/add-product">
            {isLogged ? <AddProduct />: <Home />}
            
          </Route>
          <Route path="/edit-product/:id">
          {isLogged ? <EditProduct />: <Home />}
            
          </Route>
          <Route path="/productList">
          {isLogged ? <ProductList />: <Home />}
            
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}
