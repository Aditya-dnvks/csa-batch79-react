import { Rating } from "@mui/material";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../auth/auth";

const MediDetails = () => {
  const { id } = useParams();
  const [itemData, setData] = useState([]);
  const { cartData, setCartData } = useContext(AuthContext);
  const cartItem = cartData.filter((each) => each.id === id); // [] or [{...}]

  const [quantity, setQuantity] = useState(
    cartItem.length > 0 ? cartItem[0].quantity : 0
  );

  useEffect(() => {
    if (cartItem.length > 0) {
      const newCart = cartData.filter((each) => each.id !== id); // rest all items --> Cart Item --> Currentitem
      if (quantity === 0) {
        localStorage.setItem("cartData", JSON.stringify(newCart));
        setCartData(newCart);

        return;
      }
      newCart.push({ ...cartItem[0], quantity });
      localStorage.setItem("cartData", JSON.stringify(newCart));
      setCartData(newCart);
    } else {
      if (quantity === 0) {
        return;
      }
      cartData.push({ ...itemData, quantity });
      localStorage.setItem("cartData", JSON.stringify(cartData));
      setCartData(cartData);
    }
  }, [quantity]);

  useEffect(() => {
    const fetchMedicalItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/medicalProducts/${id}`
        );
        setData(response.data);
      } catch (err) {
        console.error("Error occurred", err);
      }
    };

    fetchMedicalItem();
  }, []);

  return (
    <div>
      {itemData.length === 0 ? (
        <>Loading...</>
      ) : (
        <>
          <div className="flex border justify-center border-black rounded-xl p-3 w-fit m-3">
            <img
              src={itemData.image}
              width={450}
              className="bg-gray-200 rounded-xl mb-2"
            />
            <div className="px-3">
              <div className="mb-3">
                <h1 className="font-semibold text-xl">{itemData.title}</h1>
                <h1 className="text-sm text-gray-500">{itemData.seller}</h1>
                <h1 className="bg-gray-500 p-1 rounded-full w-fit text-white text-sm">
                  {itemData.category}
                </h1>
              </div>
              <h1 className="mb-3">
                <strong>Description:</strong> {itemData.description}
              </h1>
              <div className="flex items-cente mb-3">
                <Rating
                  name="read-only"
                  value={itemData.rating.rate}
                  precision={0.5}
                  readOnly
                />
                <h1>{`(${itemData.rating.count} Reviews)`}</h1>
              </div>
              <h1 className="text-lg text-gray-500">
                MRP{" "}
                <span className="line-through">₹{itemData.originalPrice}</span>
              </h1>
              <h1 className="text-3xl mb-3">
                ₹{itemData.price}{" "}
                <span className="text-sm text-red-500">
                  {itemData.discount}
                </span>
              </h1>
              {quantity < 1 && (
                <Button onClick={() => setQuantity(quantity + 1)}>
                  ADD TO CART
                </Button>
              )}
              {quantity >= 1 && (
                <div className="flex items-center gap-3 justify-center border-1 border-orange-500 w-fit rounded-md">
                  <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
                  <h1>{quantity}</h1>
                  <Button onClick={() => setQuantity(quantity - 1)}>-</Button>
                </div>
              )}
            </div>
          </div>
          <div className="border border-black rounded-xl p-3 w-fit m-3">
            <h1 className="font-bold text-2xl mb-3">Product Summary</h1>
            <table className="w-[50vw]">
              <tr>
                <th className="bg-orange-200 text-xl">Offer Price</th>
                <td>₹{itemData.originalPrice}</td>
              </tr>
              <tr>
                <th className="bg-orange-200 text-xl">Your Savings</th>
                <td>
                  {`₹${itemData.price}`} <span>{`(${itemData.discount})`}</span>
                </td>
              </tr>
            </table>
          </div>
        </>
      )}
      <style>{`table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
    text-align: center;

}
th {
  text-align: center;
}`}</style>
    </div>
  );
};

export default MediDetails;
