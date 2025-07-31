"use client";
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

  return (
    <>
      <p>input form</p>
      <form onSubmit={handleSubmit(onSubmit)} className="grid w-xl gap-3 pl-2">
        <input
          {...register("name")}
          type="text"
          placeholder="Enter Full Name"
        />
        <input
          {...register("email")}
          type="email"
          placeholder="Enter Your Email"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Enter Your Password"
        />
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
