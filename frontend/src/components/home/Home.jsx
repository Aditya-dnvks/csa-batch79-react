import "./Home.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MediCard from "../card/MediCard";
import { Box, TextField } from "@mui/material";

function Home() {
  const [data, setData] = useState([]);
  const [searchText, setSearch] = useState("");
  const [loader, setLoader] = useState(false);

  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    const fetchMedicalItems = async () => {
      try {
        setLoader(true);
        const response = await axios.get("http://localhost:3000/csa", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (err) {
        console.error("Error occurred", err);
      } finally {
        setLoader(false);
      }
    };

    fetchMedicalItems();
  }, []);

  // optimizartion - re-rendering
  // useCallback, useMemo,Lazy component, useRef

  const filteredData = data.filter(
    (each) =>
      each.title.toLowerCase().includes(searchText.toLowerCase()) ||
      each.seller.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const putAPI = async () => {
    try {
      // const options = {
      //   method: "POST",
      //   body: JSON.stringify({
      //     id: "3",
      //     title: "SUDARSHAN GHANVATI (ZANDU) TABLET 40'S",
      //     price: 117,
      //     originalPrice: 130,
      //     discount: "10% off",
      //     seller: "By EMAMI LIMITED (ZANDU)",
      //     description: "Ayurvedic tablets for holistic health support.",
      //     category: "Herbal Medicine",
      //     image: "https://d1s24u4ln0wd0i.cloudfront.net/15482_1",
      //     rating: {
      //       rate: 4.3,
      //       count: 150,
      //     },
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };
      // const response = await fetch("http://localhost:3000/csa", options);

      const response = await axios.post(
        "http://localhost:3000/csa",
        {
          title: "BABY DIAPER LARGE (KANGAROO)",
          price: 60,
          originalPrice: 60,
          seller: "By KANGAROO HEALTH CARE",
          description:
            "Large-sized diapers for babies, offering comfort and dryness.",
          category: "Baby Care",
          image: "https://d1s24u4ln0wd0i.cloudfront.net/1238_2",
          rating: {
            rate: 4.7,
            count: 300,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // const options = {
      //   method: "PUT",
      //   body: JSON.stringify({
      //     title: "CSA",
      //     price: 1000,
      //     originalPrice: 4000,
      //     discount: "25% off",
      //     seller: "Aditya",
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      // const response = await fetch("http://localhost:3000/csa/2", options);

      // const response = await axios.delete("http://localhost:3000/csa/2");
      console.log(response);
    } catch (err) {
      console.error("Error occurred", err);
    }
  };
  return (
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
      <button onClick={putAPI}>Post Producst</button>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-5">
        {!loader ? (
          filteredData.length > 0 ? (
            filteredData.map((each) => <MediCard item={each} key={each.id} />)
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
  );
}

// class Home extends React.Component {
//   constructor(props) {
//     super();
//     this.state = {
//       value: 0,
//     };
//   }

//   random = () => {
//     console.log("Hello");
//     this.setState({ value: this.state.value + 10 });
//   };

//   componentDidMount() {}

//   componentDidUpdate() {}

//   componentWillUnmount() {}

//   render() {
//     return (
//       <div onClick={this.random}>
//         JSX{this.state.value}
//       </div>
//     );
//   }
// }

export default Home;

export const age = 10;
export const name = "X";
