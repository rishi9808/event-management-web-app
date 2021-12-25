/* eslint-disable indent */
import React from "react"
import { useNavigate } from "react-router-dom"
import { Forms } from "../components/Forms"
import fetcher from "../utils/fetcher"

const registrationInputs = [
  { name: "name", type: "text", label: "Name" },
  { name: "email", type: "email", label: "Email Id" },
  { name: "password", type: "password", label: "Password" },
  { name: "dateOfBirth", type: "date", label: "Date Of Birth" },
  {
    name: "rollNo",
    type: "number",
    pattern: "[1-9][0-9][0-9][0-9][0-9][0-9][0-9]",
    label: "RollNo",
  },
  { name: "branch", type: "text", label: "Branch" },
  { name: "batch", type: "number", label: "Batch" },
  { name: "mobileNo", type: "phone", label: "Mobile No" },
]

const Register = () => {
  const navigate = useNavigate()

  async function registerUser(formData) {
    const response = await fetcher("api/user/register", {
      method: "POST",
      body: JSON.stringify(formData),
    })

    if (response.status === 200) {
      alert("Successfully registered ")
      navigate("/login")
    }
  }

  return (
    <div className="flex flex-col justify-center items-center m-2">
      <h1 className="text-xl uppercase">Register</h1>

      <Forms inputs={registrationInputs} onSubmit={registerUser} />
    </div>
  )
}

export default Register
