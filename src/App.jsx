import { Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Register from "./components/register/Register";
import MediDetails from "./components/details-page/DetilsPage";
import { useContext } from "react";
import { AuthContext } from "./components/auth/auth";
import Cart from "./components/cart/cart";

function App() {
  const { isLogin } = useContext(AuthContext);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {!isLogin && <Route path="/register" element={<Register />} />}
        <Route path="/item-details/:id" element={<MediDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
