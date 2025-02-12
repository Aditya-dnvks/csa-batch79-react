import { Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Register from "./components/register/Register";
import MediDetails from "./components/details-page/DetilsPage";
import { useContext } from "react";
import { AuthContext } from "./components/auth/auth";
import Cart from "./components/cart/cart";
import Counter from "./components/Counter";
import Login from "./components/login/Login";

function App() {
  const { isLogin } = useContext(AuthContext);
  return (
    <>
      <Header />
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/item-details/:id" element={<MediDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/counter" element={<Counter />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
