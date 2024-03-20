
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import 'bootstrap/dist/css/bootstrap.css';
import CartPage from './pages/CartPage';
import ThinksPage from './pages/ThinksPage';
import ProductForm from './pages/ProductForm';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/productpage' element={<ProductPage />} />
          <Route path='/cartpage' element={<CartPage />} />
          <Route path='/thinkspage' element={<ThinksPage />} />
          <Route path='/productform' element={<ProductForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
