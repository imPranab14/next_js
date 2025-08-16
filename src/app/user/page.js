"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function index() {
  const [showPassword, setShowPassword] = useState(false);
  const [countryApiData, setCountryApiData] = useState([]);
  const [statesData, setStatesData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [updateButton, setUpdateButton] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
    setValue,
    reset
  } = useForm();



async function handleCreate(value) {
    try {
      const response = await axios.post(
        "https://next-js-crud-api.onrender.com/create-user",
        {
          name: value.name,
          email: value.email,
          password: value.password,
          age: value.age,
          countryName: value.countryName,
          statesName: value.statesName
        });
      if (response?.status === 201) {
        console.log("response", response?.data);
        getUserApi(); // Refresh user data after submission
      }
    } catch (error) {
      console.log("error", error);
      
    }
  }

async function handleUpdate(value) {
    const updateData = {
      _id: editUserId,
      ...value}
    console.log("update_data", updateData);

    
  try {
      const response = await axios.put(
        "https://next-js-crud-api.onrender.com/update-user",
        updateData);
      if (response?.status === 201) {
        console.log("response", response?.data);
        getUserApi(); // Refresh user data after submission
        reset()
      }
    } catch (error) {
      console.log("error", error);
      
    }
}


  async function onSubmit(value) {
    console.log("submit_from_data", value);
    updateButton ? await handleUpdate(value) : await handleCreate(value);
    

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
  //Call Get User API
  const getUserApi = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        "https://next-js-crud-api.onrender.com/users"
      );
      if (response?.status === 200) {
        setUserData(response?.data);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Api Call useEffect Function
  useEffect(() => {
    countryAPi();
    getUserApi();
    statesApi(countryName);
  }, [countryName]);

  


  //Delete User
  const handleDelete = async (id) => {
    console.log("delete_id", id);
    try {
    const response = await axios.delete(
      `https://next-js-crud-api.onrender.com/delete-user/${id}`
    );
      if (response?.status === 200) {
          getUserApi(); // Refresh user data after deletion
      }
      

    } catch (error) {
      console.log("error", error);
      
    }


  }


  //Edit User
  const handleEdit = (val) => {
    //console.log("edit_val", val);
    setEditUserId(val._id);
    setValue("name", val.name);
    setValue("email", val.email);
    setValue("password", val.password);
    setValue("age", val.age);
    setValue("countryName", val.countryName);
    setValue("statesName", val.statesName);

    setUpdateButton(true);
  }

  return (
    <>
    <div className="w-full flex col-gap-2">
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
            // validate: async function (value) {
            //   if (value !== value.toLowerCase())
            //     return "only need to use lowercase";
            //   try {
            //     const response = await axios.post(
            //       `http://localhost:8085/check-email?email=${value}`
            //     );
            //     if (response.status === 200) return true;
            //     return "Email already exits";
            //   } catch {
            //     return "Error Checking email";
            //   }
            // },
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

        <input type="submit" value={updateButton ? "Update":"Save"} />
      </form>
      <div >
        <h6 className="text-2xl">User Data</h6>
        {loader ? <p>Loading...</p> :
        <table className="w-full">
          <tr>
            <th className="border p-1">Name</th>
            <th className="border p-1">Email</th>
            <th className="border p-1">Age</th>
            <th className="border p-1">Password</th>
            <th className="border p-1">Country</th>
            <th className="border p-1">States</th>
            <th className="border p-1">Edit</th>
            <th className="border p-1">Delete</th>
          </tr>

          {userData.map((val, index) => (
            <tr key={index}>
              <td>{val.name}</td>
              <td>{val.email}</td>
              <td>{val.age}</td>
                <td>{val.password}</td>
              <td>{val.countryName}</td>
              <td>{val.statesName}</td>
              <td>
                <button onClick={(e)=>{
                  handleEdit(val)
                }}>Edit</button>
              </td>
              <td>
                <button onClick={(e)=>
                  handleDelete(val._id)
                }>Delete</button>
              </td>
            </tr>
          ))}
        </table>
}
      </div>
      </div>
    </>
  );
}
