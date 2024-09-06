import './App.css'
import NavBar from './assets/Components/NavBar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './assets/pages/Signup';
import Login from './assets/pages/Login';
import { Provider } from 'react-redux';
import Home from './assets/pages/Home';
import store from './assets/store/store';
import Men from './assets/pages/Men';
import Women from './assets/pages/Women';
import ProductDetail from './assets/pages/ProductDetail';
import Cart from './assets/pages/Cart';
import Footer from './assets/Components/Footer';
import Shipping from './assets/pages/Shipping';
import Success from './assets/pages/Success';
import Failed from './assets/pages/Failed';
import WishList from './assets/pages/WishList';
import Kids from './assets/pages/Kids';
import ScrollToTop from './assets/Components/scrollToTop';
import AuthenticatedRoute from './assets/route/AuthenticatedRoute';
import ProtectedRoute from './assets/route/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <NavBar />
        <Routes>
          <Route element={<AuthenticatedRoute />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishList" element={<WishList />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/shipping" element={<Shipping />} />
          </Route>

          <Route path="/success" element={<Success />} />
          <Route path="/failed" element={<Failed />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
