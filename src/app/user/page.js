"use client";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function index() {
  const [showPassword,setShowPassword]=useState(false)
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  function onSubmit(value) {
    console.log(value);
  }

  console.log("error", errors);
  //console.log("showPassword",showPassword);

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
                console.log("response", response);
                if (response.status === 200) return "emil id available";
                else return "emil if already exits";
              } catch {
                return "Error checking email";
              }
            },
          })}
          type="email"
          placeholder="Enter Your Email"
        />
        {errors.email && errors.email.message}
        <div className="flex">
        <input
          {...register("password",{
            required: {value:true ,message:"password is required"},
            minLength:{value:8 ,message:"password must be at least 8 characters"},
          })}
          type={showPassword ? "text" : "password"}
          placeholder="Enter Your Password"
        />
        <button type="button" onClick={(e)=> setShowPassword(!showPassword)}>{showPassword? "Show": "Hide"}</button>
        </div>
        {errors.password && errors.password.message}
        <input
          {...register("age", {
            required: { value: true, message: "age is required" },
            validate: (value) => value > 18 ? true : "you must be 18"
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

      <select>
        <option value="volvo">Volvo</option>
      </select>
        <input type="submit" />
      </form>
    </>
  );
}
