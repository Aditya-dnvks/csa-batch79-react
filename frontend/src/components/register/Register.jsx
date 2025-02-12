import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { Button } from "@radix-ui/themes";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm: "",
  });

  const navigation = useNavigate();

  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (event) => {
    setPasswordError(false);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.fullName === "" ||
      formData.confirm === ""
    ) {
      // alert("Please fill the form completely");
      enqueueSnackbar("Please fill the form completely", {
        variant: "error",
      });
      return;
    }

    if (formData.password.length < 5) {
      // alert("Password length must be greater than 5");
      enqueueSnackbar("Password length must be greater than 5", {
        variant: "error",
      });
      setPasswordError(true);
      return;
    }

    if (formData.password !== formData.confirm) {
      enqueueSnackbar("Password are not matching", {
        variant: "error",
      });
      return;
    }

    const existingData = JSON.parse(localStorage.getItem("mediUsers")) || [];
    const filteredData = existingData.filter(
      (each) => each.email === formData.email
    );

    if (filteredData.length >= 1) {
      // alert("User already exists. Please use another email for login");
      enqueueSnackbar(
        "User already exists. Please use another email for login",
        {
          variant: "error",
        }
      );
      return;
    }

    //notistack
    existingData.push(formData);
    localStorage.setItem("mediUsers", JSON.stringify(existingData));

    enqueueSnackbar("User Regsitered Successfully", {
      variant: "success",
    });
    navigation("/");
  };

  return (
    <div className="flex justify-around items-center h-[90vh]">
      <img
        className="w-1/2"
        src="https://img.freepik.com/free-vector/medicine-concept-illustration_114360-1555.jpg"
      />

      <form
        className="flex flex-col border rounded-lg p-6 w-1/3"
        onSubmit={handleSubmit}
      >
        <h1 className="font-semibold text-2xl">Register with us</h1>

        <label htmlFor="fullName" className="mt-3">
          <strong>Full Name</strong>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="border rounded p-1"
        />

        <label htmlFor="email" className="mt-3">
          <strong>Email</strong>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="border rounded p-1"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password" className="mt-3">
          <strong>Password</strong>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="border rounded p-1"
          value={formData.password}
          onChange={handleChange}
        />
        {passwordError && (
          <p className="text-red-600 text-sm">
            Password length must be greater than 5*
          </p>
        )}

        <label htmlFor="confirmPassword" className="mt-3">
          <strong>Confirm Password</strong>
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirm"
          className="border rounded p-1"
          value={formData.confirm}
          onChange={handleChange}
        />

        <div>
          <Button variant="solid" type="submit" size="2" className="mt-4">
            Register
          </Button>
        </div>

        <p>
          Already have an account?
          <span className="text-blue-700">
            <Link to={"/"}> Login Now</Link>
          </span>
        </p>
      </form>
    </div>
  );
}
export default Register;
