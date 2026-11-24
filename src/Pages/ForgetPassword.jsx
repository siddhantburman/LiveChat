import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ForgetPassword = () => {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    otp: "",
    password: "",
    cpassword: ""
  })

  const [step, setStep] = useState(1)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const sendOtp = async () => {
    if (!form.email) return toast.error("Email is required")

    let resp = await fetch("https://api.skillsvarz.com/api/forgot-password", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email })
    })

    let res = await resp.json()

    if (resp.status === 200 || resp.status === 201) {
      toast.success("OTP sent to your email")
      setStep(2)
    } else {
      toast.error(res?.error || "Try again")
    }
  }

  const changePassword = async () => {

    if (form.password !== form.cpassword) {
      return toast.error("Passwords do not match")
    }

    let resp = await fetch("https://api.skillsvarz.com/api/reset-password", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        otp: form.otp,
        newPassword: form.password
      })
    })

    let res = await resp.json()

    if (resp.status === 200 || resp.status === 201) {
      toast.success("Password changed successfully")
      setTimeout(() => navigate("/login"), 1000)
    } else {
      toast.error(res?.error || "Failed to reset password")
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#f4faf5] flex items-center justify-center px-4 py-6">

      <div className="w-full max-w-md bg-white p-5 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl shadow-lg shadow-[#a7d9b5]/20 border border-[#dcefe0]">

        {/* Header */}
        <div className="text-center mb-5 md:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#245c38]">
            {step === 1 ? "Forgot Password" : "Reset Your Password"}
          </h2>
          <p className="text-xs sm:text-sm text-[#789783] mt-1">
            {step === 1 
              ? "Enter your email to receive an OTP"
              : "Enter OTP and your new password"}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-5 md:mb-6">
          <div className={`h-1.5 sm:h-2 w-8 sm:w-10 rounded-full ${step >= 1 ? 'bg-[#70c48b]' : 'bg-[#dcefe0]'}`} />
          <div className={`h-1.5 sm:h-2 w-8 sm:w-10 rounded-full ${step === 2 ? 'bg-[#70c48b]' : 'bg-[#dcefe0]'}`} />
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">

          {step === 1 && (
            <>
              {/* Email */}
              <div>
                <label className="text-xs sm:text-sm text-[#557c60]">Email Address</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full mt-1 px-3 sm:px-4 py-2 rounded-lg bg-[#f8fcf9] border border-[#dcefe0] focus:outline-none focus:ring-2 focus:ring-[#70c48b] focus:border-[#70c48b] text-sm text-[#245c38] placeholder:text-[#a3b9a9] transition"
                />
              </div>

              <button
                onClick={sendOtp}
                className="mt-3 w-full bg-[#70c48b] hover:bg-[#55ad72] text-white font-medium py-2.5 rounded-lg transition duration-200 text-sm shadow-md shadow-[#70c48b]/20"
              >
                Send OTP
              </button>
            </>
          )}

          {step === 2 && (
            <>
              {/* OTP */}
              <div>
                <label className="text-xs sm:text-sm text-[#557c60]">OTP</label>
                <input
                  type="number"
                  name="otp"
                  onChange={handleChange}
                  placeholder="Enter OTP"
                  className="w-full mt-1 px-3 sm:px-4 py-2 rounded-lg bg-[#f8fcf9] border border-[#dcefe0] focus:outline-none focus:ring-2 focus:ring-[#70c48b] focus:border-[#70c48b] text-sm text-[#245c38] placeholder:text-[#a3b9a9] transition"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-xs sm:text-sm text-[#557c60]">New Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="w-full mt-1 px-3 sm:px-4 py-2 rounded-lg bg-[#f8fcf9] border border-[#dcefe0] focus:outline-none focus:ring-2 focus:ring-[#70c48b] focus:border-[#70c48b] text-sm text-[#245c38] placeholder:text-[#a3b9a9] transition"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-xs sm:text-sm text-[#557c60]">Confirm Password</label>
                <input
                  type="password"
                  name="cpassword"
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full mt-1 px-3 sm:px-4 py-2 rounded-lg bg-[#f8fcf9] border border-[#dcefe0] focus:outline-none focus:ring-2 focus:ring-[#70c48b] focus:border-[#70c48b] text-sm text-[#245c38] placeholder:text-[#a3b9a9] transition"
                />
              </div>

              <button
                onClick={changePassword}
                className="mt-3 w-full bg-[#70c48b] hover:bg-[#55ad72] text-white font-medium py-2.5 rounded-lg transition duration-200 text-sm shadow-md shadow-[#70c48b]/20"
              >
                Reset Password
              </button>

              {/* Back */}
              <button
                onClick={() => setStep(1)}
                className="text-xs sm:text-sm text-[#789783] hover:text-[#245c38] mt-2 transition"
              >
                ← Back to email
              </button>
            </>
          )}

        </div>

      </div>
    </div>
  )
}

export default ForgetPassword