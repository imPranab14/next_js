"use client";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function index() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(value) {
    console.log(value);
  }

  console.log("error", errors);

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
        <input
          {...register("password")}
          type="password"
          placeholder="Enter Your Password"
        />
        <button>Show</button>
        <input
          {...register("age")}
          type="number"
          placeholder="Enter Your Age"
        />
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
        <input type="submit" />
      </form>
    </>
  );
}
