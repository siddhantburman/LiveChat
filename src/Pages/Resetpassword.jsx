import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { toast } from 'react-toastify'

const Resetpassword = () => {
  const navigate = useNavigate()
  const { user } = useOutletContext()

  const [resetpassword, setResetpassword] = useState({
    password: "",
    cpassword: ""
  })

  const handlepass = (e) => {
    setResetpassword({ ...resetpassword, [e.target.name]: e.target.value })
  }

  const changepassword = async () => {
    if (resetpassword.password === resetpassword.cpassword) {
      let url = "https://api.skillsvarz.com/api/user/" + user._id

      let resp = await fetch(url, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: resetpassword.password })
      })

      if (resp.status === 200 || resp.status === 201) {
        toast.success("Password changed")
        setTimeout(() => {
          navigate("/login")
        }, 1000)
      } else {
        toast.error("Something went wrong")
      }
    } else {
      toast.error("Confirm password does not match")
    }
  }

  const deleteAccount = async () => {
    let conf = confirm("Are you sure you want to delete?")
    if (conf) {
      let resp = await fetch("https://api.skillsvarz.com/api/user/" + user._id, {
        method: 'DELETE',
      })

      let res = await resp.json()

      if (resp.status === 200 || resp.status === 201) {
        toast.success(res?.message || "Account Deleted")
        setTimeout(() => {
          navigate('/login')
        }, 500)
      }
      else toast.error(res?.error || "Try Again")
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#f4faf5] flex items-center justify-center p-4 sm:p-6">

      <div className="w-full max-w-md bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg shadow-[#a7d9b5]/20 border border-[#dcefe0]">

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 text-[#245c38]">
          Reset Password
        </h2>

        {/* Form */}
        <div className="flex flex-col gap-4">

          {/* Password */}
          <div>
            <label className="text-sm text-[#557c60]">New Password</label>
            <input
              onChange={handlepass}
              type="password"
              name="password"
              placeholder="Enter new password"
              className="w-full mt-1 px-3 sm:px-4 py-2 rounded-lg bg-[#f8fcf9] border border-[#dcefe0] focus:outline-none focus:ring-2 focus:ring-[#70c48b] focus:border-[#70c48b] text-sm text-[#245c38] placeholder:text-[#a3b9a9] transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-[#557c60]">Confirm Password</label>
            <input
              onChange={handlepass}
              type="password"
              name="cpassword"
              placeholder="Confirm password"
              className="w-full mt-1 px-3 sm:px-4 py-2 rounded-lg bg-[#f8fcf9] border border-[#dcefe0] focus:outline-none focus:ring-2 focus:ring-[#70c48b] focus:border-[#70c48b] text-sm text-[#245c38] placeholder:text-[#a3b9a9] transition"
            />
          </div>

          {/* Change Password */}
          <button
            onClick={changepassword}
            className="mt-3 bg-[#70c48b] hover:bg-[#55ad72] text-white font-medium py-2.5 rounded-lg transition duration-200 text-sm shadow-md shadow-[#70c48b]/20"
          >
            Change Password
          </button>

          {/* Delete Account */}
          <button
            onClick={deleteAccount}
            className="mt-2 bg-[#e8f5eb] hover:bg-[#d8eddd] text-[#245c38] font-medium py-2.5 rounded-lg transition duration-200 text-sm border border-[#dcefe0]"
          >
            Delete Account
          </button>

        </div>

      </div>
    </div>
  )
}

export default Resetpassword