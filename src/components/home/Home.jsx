import "./Home.css";
import Login from "../login/Login";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/auth";
import axios from "axios";
import MediCard from "../card/MediCard";
import { Box, TextField } from "@mui/material";

function Home() {
  const { isLogin } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [searchText, setSearch] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchMedicalItems = async () => {
      try {
        setLoader(true);
        const response = await axios.get(
          "http://localhost:3000/medicalProducts"
        );
        setData(response.data);
      } catch (err) {
        console.error("Error occurred", err);
      } finally {
        setLoader(false);
      }
    };

    fetchMedicalItems();
  }, []);

  const filteredData = data.filter(
    (each) =>
      each.title.toLowerCase().includes(searchText.toLowerCase()) ||
      each.seller.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      {isLogin ? (
        <div>
          <div className="flex justify-center my-4">
            <Box className="w-[50vw]">
              {/* <TextField.Root
                size="2"
                placeholder="Search the docs…"
                value={searchText}
                onChange={handleSearch}
              /> */}
              <TextField
                id="outlined-required"
                label="Search the products based on Name and Seller"
                value={searchText}
                onChange={handleSearch}
                className="w-[50vw]"
              />
            </Box>
          </div>
          <h1 className="text-2xl mx-5 my-2">Top Trending Products</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-5">
            {!loader ? (
              filteredData.length > 0 ? (
                filteredData.map((each) => (
                  <MediCard item={each} key={each.id} />
                ))
              ) : (
                <div className="flex justify-center w-screen h-[50vh]">
                  <img src="https://cdn.dribbble.com/users/3512533/screenshots/14168376/web_1280___8_4x.jpg" />
                </div>
              )
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-around items-center min-h-[90vh]">
          <Login />
        </div>
      )}
    </div>
  );
}
export default Home;
