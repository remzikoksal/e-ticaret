import Header from "./Header";
import Footer from "./Footer";
import HomePage from "../pages/HomePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Shop from "../pages/Shop";
import Contact from "../pages/Contact";
import About from "../pages/About";
import ProductDetail from "../pages/ProductDetails"; 
import ScrollToTop from "./ScroolToTop";
import Signup from "../pages/Signup";
import RolesRedirect from "../pages/RolesRedirect";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import ProtectedRoute from "../routes/ProtectedRoute";

function PageContent() {
  return (
    <Router>
      <ScrollToTop behavior="auto" />
      <Header />
      <main className="min-h-screen bg-white">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route
            path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
            exact
            component={ProductDetail}
          />
          <Route
            path="/shop/:gender/:categoryName/:categoryId"
            exact
            component={Shop}
          />
          <Route path="/product/:productId" exact component={ProductDetail} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/roles" exact component={RolesRedirect} />
          <Route path="/login" exact component={Login} />
          <Route path="/cart" exact component={Cart} />
          <ProtectedRoute path="/checkout" exact component={Checkout} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default PageContent;
