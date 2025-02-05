import { Button } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/auth";
import Home, { name, age } from "../home/Home";

const MediCard = ({ item }) => {
  const { cartData, setCartData } = useContext(AuthContext);

  const cartItem = cartData.filter((each) => each.id === item.id); // [] or [{...}]

  const [quantity, setQuantity] = useState(
    cartItem.length > 0 ? cartItem[0].quantity : 0
  );
  const navigation = useNavigate();

  useEffect(() => {
    if (cartItem.length > 0) {
      const newCart = cartData.filter((each) => each.id !== item.id);
      if (quantity === 0) {
        localStorage.setItem("cartData", JSON.stringify(newCart));
        setCartData(newCart);
        return;
      }
      newCart.push({ ...cartItem[0], quantity });
      localStorage.setItem("cartData", JSON.stringify(newCart));
      setCartData(newCart);
      // React --> State update asynchronous
    } else {
      if (quantity === 0) {
        return;
      }
      const newCart = [...cartData, { ...item, quantity }];
      localStorage.setItem("cartData", JSON.stringify(newCart));
      setCartData(newCart);
    }
  }, [quantity]);

  return (
    <div className="flex flex-col justify-between border border-black rounded-xl p-3">
      <div
        className="mb-3"
        onClick={() => navigation(`/item-details/${item.id}`)}
      >
        <img
          src={item.image}
          width={300}
          className="bg-gray-200 rounded-xl mb-2"
        />
        <h1 className="font-bold"> {item.title}</h1>
        <h5 className="text-sm card-seller"> {item.seller}</h5>
        <p className="text-base card-mrp">
          MRP <del>₹{item.originalPrice}</del>
        </p>
        <p className="text-xl flex items-center">
          ₹{item.price}
          {item.discount && (
            <span className="bg-green-700 text-xs mx-1 text-white px-1 rounded-lg font-bold discount">
              {item.discount}
            </span>
          )}
        </p>
      </div>
      {quantity < 1 && (
        <Button onClick={() => setQuantity(quantity + 1)}>ADD TO CART</Button>
      )}
      {quantity >= 1 && (
        <div className="flex items-center gap-3 justify-center border-1 border-orange-500 w-fit mx-auto rounded-md">
          <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
          <h1>{quantity}</h1>
          <Button onClick={() => setQuantity(quantity - 1)}>-</Button>
        </div>
      )}
    </div>
  );
};

export default MediCard;
