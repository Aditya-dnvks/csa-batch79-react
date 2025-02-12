const medProductModel = require("../model/medProductsModel");

const data = [
  {
    id: "1",
    title: "PUDIN HARA CAPSULE 10'S",
    price: 30,
    originalPrice: 30,
    seller: "By DABUR INDIA LIMITED",
    description: "Effective herbal remedy for stomach ailments.",
    category: "Herbal Medicine",
    image:
      "https://d1s24u4ln0wd0i.cloudfront.net/med/10866/pudin-hara-capsule-10s_1727026810cfb959fb098b426b98ac3264cfb45d0e.webp",
    rating: {
      rate: 4,
      count: 120,
    },
  },
  {
    id: "2",
    title: "ROMSON PREMIUM 3PLY FACEMASK",
    price: 8,
    originalPrice: 10,
    discount: "20% off",
    seller: "By ROMSON",
    description: "Premium quality 3-ply facemask for enhanced protection.",
    category: "Protective Gear",
    image:
      "https://d1s24u4ln0wd0i.cloudfront.net/med/16606/romson-premium-3ply-facemask_17347767309379becaa296464e88c85f6f9f4d8710.webp",
    rating: {
      rate: 4.7,
      count: 200,
    },
  },
];

const getData = async (req, res) => {
  const allProducts = await medProductModel.find();
  res.send(allProducts);
};

const getDataById = async (req, res) => {
  const { id } = req.params;

  const newData = await medProductModel.findOne({ _id: id });

  if (!newData) {
    res.status(404).send("No Product with given ID");
    return;
  }

  res.send(newData);
};

const postData = async (req, res) => {
  const newData = req.body;

  if (newData.title == undefined) {
    return res.status(404).send("Please provide input to post data");
  }
  const post = await medProductModel.create(req.body);
  res.send(post);
};

const updateData = async (req, res) => {
  const { id } = req.params;
  const dbRequest = await medProductModel.findOneAndUpdate(
    { _id: id },
    req.body
  );

  if (!dbRequest) {
    return res.status(404).send("No prodcut with given ID found");
  }

  res.send(dbRequest);
};

const deleteData = async (req, res) => {
  const { id } = req.params;

  // const index = data.findIndex((each) => each.id === id);

  const deleteData = await medProductModel.deleteOne({ _id: id });

  if (deleteData.deletedCount === 0) {
    return res.status(404).send("No product with given ID found");
  }

  res.send(deleteData);
};

module.exports = { getData, getDataById, postData, updateData, deleteData };
