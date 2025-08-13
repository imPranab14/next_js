"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function index() {
  const [showPassword, setShowPassword] = useState(false);
  const [countryApiData, setCountryApiData] = useState([]);
  const [statesData,setStatesData]=useState([])
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  function onSubmit(value) {
    console.log("submit_from_data", value);
  }
  const countryName = watch("countryName");
  
  //Call Api
  async function countryAPi() {
    try {
      const response = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,cca2"
      );
      if (response?.status === 200) {
        setCountryApiData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function statesApi(value) {
    console.log("value", value);
    try {
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
          country: `${value}`,
        }
      );
      if (response?.status === 200) {
        setStatesData(response?.data.data.states);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Api Call useEffect Function
  useEffect(() => {
    countryAPi();
    statesApi(countryName);
  }, [countryName]);

  console.log("statesData",statesData);

  return (
    <>
      <p>input form</p>
      <form onSubmit={handleSubmit(onSubmit)} className="grid w-xl gap-3 pl-2">
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="Enter Full Name"
        />
        {errors.name && <p>name is required</p>}
        <input
          {...register("email", {
            required: { value: true, message: "email is required" },
            validate: async function (value) {
              if (value !== value.toLowerCase())
                return "only need to use lowercase";
              try {
                const response = await axios.post(
                  `http://localhost:8085/check-email?email=${value}`
                );
                if (response.status === 200) return true;
                return "Email already exits";
              } catch {
                return "Error Checking email";
              }
            },
          })}
          type="email"
          placeholder="Enter Your Email"
        />
        {errors.email && errors.email.message}
        <div className="flex">
          <input
            {...register("password", {
              required: { value: true, message: "password is required" },
              minLength: {
                value: 8,
                message: "password must be at least 8 characters",
              },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
          />
          <button type="button" onClick={(e) => setShowPassword(!showPassword)}>
            {showPassword ? "Show" : "Hide"}
          </button>
        </div>
        {errors.password && errors.password.message}
        <input
          {...register("age", {
            required: { value: true, message: "age is required" },
            validate: (value) => (value > 18 ? true : "you must be 18"),
          })}
          type="number"
          placeholder="Enter Your Age"
        />
        {errors.age && errors.age.message}
        <div className="flex gap-1">
          <input {...register("male")} type="radio" />
          <label>Male</label>
          <input {...register("female")} type="radio" />
          <label>female</label>
        </div>

        <div className="flex gap-1">
          <div className="flex gap-1">
            <input type="checkbox" {...register("react")} />
            <label>React JS</label>
          </div>
          <div className="flex gap-1">
            <input type="checkbox" {...register("node")} />
            <label>Node JS</label>
          </div>
        </div>

        {/* Country Dropdown */}
        <select {...register("countryName")}>
          {countryApiData.map((e, index) => (
            <option key={index} value={e?.name.common}>
              {e?.name.common}
            </option>
          ))}
        </select>

         {/* Country Dropdown */}
        <select {...register("statesName")}>
          {statesData.map((e, index) => (
            <option key={index} value={e?.name}>
              {e?.name}
            </option>
          ))}
        </select>

        <input type="submit" />
      </form>
    </>
  );
}
