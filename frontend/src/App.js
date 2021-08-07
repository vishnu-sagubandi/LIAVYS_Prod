import {
  HashRouter as Router,
  Switch,
  Route,Redirect
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header'
import Footer from './components/footer'
import './index.css'
import './css/Hero.css'
import ScrollToTop from './components/scrollTop';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import { Container } from "react-bootstrap";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/ListUsersScreen";
import UserEditScreen from "./screens/UserEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import ShopScreen from "./screens/ShopScreen";
import ProductListScreen from "./screens/ProductListScreen";
import BlogScreen from "./screens/BlogScreen";
import ContactScreen from "./screens/ContactScreen";
import pageNotFound from "./components/pageNotFound";


function App() {
  return (
      <Router>
        <Header/>
        <main className="p-0 m-0">
        <Container fluid className="p-0 m-0">
          <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={HomeScreen}/>
          <Route exact path="/shop" component={ShopScreen}/>
          <Route exact path="/blog" component={BlogScreen}/>
          <Route exact path="/contact" component={ContactScreen}/>
          <Route exact path="/products/:id" component={ProductScreen}/>
          <Route path="/cart/:id?" component={CartScreen}/>
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/register' component={RegisterScreen} />
          <Route exact path='/profile' component={ProfileScreen} />
          <Route exact path='/shipping' component={ShippingScreen} />
          <Route exact path='/payment' component={PaymentScreen} />
          <Route exact path='/placeorder' component={PlaceOrderScreen} />
          <Route exact path='/order/:id' component={OrderScreen} />

          <Route exact path='/admin/userlist' component={UserListScreen} />
          <Route exact path='/admin/productlist' component={ProductListScreen} />
          <Route exact path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route exact path='/admin/orderlist' component={OrderListScreen} />

          <Route component={pageNotFound} />
        </Switch>
        </Container></main>
        <Footer/>
        <ScrollToTop/>
      </Router>
  );
}

export default App;
