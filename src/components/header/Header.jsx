import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/auth";
import { enqueueSnackbar } from "notistack";

function Header() {
  const { isLogin, setLogin, cartData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLogin(false);
    localStorage.setItem("isLogin", JSON.stringify(false));
    navigate("/login");
    enqueueSnackbar("Logout done successfully", { variant: "info" });
  };

  return (
    <nav className="flex justify-between items-center px-6 bg-slate-400">
      <img
        height={70}
        width={70}
        className="py-1"
        src="https://static.vecteezy.com/system/resources/previews/047/656/219/large_2x/abstract-logo-design-for-any-corporate-brand-business-company-vector.jpg"
      />
      <ul className="flex gap-6 px-6 items-center">
        {isLogin ? (
          <>
            <li className="font-semibold">
              <button>
                <Link to={"/"}>Home</Link>
              </button>
            </li>
            <li className="font-semibold flex">
              <Link to={"/cart"}>Cart</Link>
              <sup className="bg-green-700 flex items-center justify-center rounded-full px-2">
                {cartData.length}
              </sup>
            </li>
            <li className="font-semibold">
              <Link to={"/contact"}>Contact Us</Link>
            </li>
            <li className="font-semibold" onClick={handleLogout}>
              Logout
            </li>
          </>
        ) : (
          <>
            <li className="font-semibold">
              <button>
                <Link to={"/"}>Login</Link>
              </button>
            </li>
            <li className="font-semibold">
              <Link to={"/register"}>Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
