import React, { useEffect, useState } from 'react'
import Recentchatbox from './Recentchatbox'
import { FiSettings } from "react-icons/fi";
import { LogOutIcon, MessageCircleCheck, Settings, User2Icon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ user, setFriendName, chatId, setChatId}) => {
  const navigate = useNavigate()
  const [isenable, setIsenable] = useState(true)
  const [search, setSearch] = useState([])
  const [chats, setChats] = useState([])
  const [inputSearch, setInputSearch] = useState("")

  // 🔍 Search API
  const searchData = async (event) => {
    setInputSearch(event.target.value)
    let url = "https://api.skillsvarz.com/api/user/search?query="
    let resp = await fetch(url + event.target.value)
    let res = await resp.json()

    if (resp.status === 200 || resp.status === 201) {
      setSearch(res)
    } else {
      setSearch([])
    }
  }

  useEffect(() => {
    let user_token = JSON.parse(localStorage.getItem('user_token'))
    let url = "https://api.skillsvarz.com/api/chats"
    let fetchapi = async () => {
      let resp = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user_token}`
        }
      })
      let res = await resp.json()
      setChats(res)

    }
    fetchapi()
  }, [])

  let newchat = async (userId) => {
    let user_token = JSON.parse(localStorage.getItem('user_token'))
    let url = "https://api.skillsvarz.com/api/chats"
    let resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user_token}`
      },
      body: JSON.stringify({ userId: userId })

    })
    let res = await resp.json()
    // console.log(res)
    return res._id
  }

  return (
    <>
      {isenable ? (

        // ================= CHAT VIEW =================
        <div className="h-screen w-[27%] min-w-[260px] bg-[#f4faf5] text-[#245c38] flex flex-col justify-between border-r border-[#dcefe0]">

          {/* Top */}
          <div className="p-4">

            {/* Search */}
            <div className="mb-4">
              <input
                type="search"
                value={inputSearch}
                placeholder="Search chats..."
                onChange={(event)=>{searchData(event)}}
                className="w-full px-4 py-2 rounded-lg bg-white border border-[#dcefe0] text-[#245c38] placeholder-[#a3b9a9] focus:outline-none focus:ring-2 focus:ring-[#70c48b] focus:border-[#70c48b] transition"
              />
            </div>

            {/* Recent Chats */}
            <div className="space-y-2 overflow-y-auto scroll-hide scrollbar-hide max-h-[75vh] pr-1">

              {/* 🔁 Dynamic search results */}
              {inputSearch ? <>
                <h2 className="text-[#557c60] text-sm px-2 mb-2">Search results...</h2>
                {search.length>0? search.map((item, index) => (
                  <Recentchatbox key={index} name={item.name} email={item.email} id={item._id} newchat={newchat} setChatId={setChatId} setFriendName={setFriendName}/>
                ))
                : (
                  <span className="text-sm text-[#789783] px-2">No Recent Chats..</span>
                )}</> :
                (
                  <>
                    <h2 className="text-[#557c60] text-sm px-2 mb-2">Recent Chats...</h2>
                    {chats.length===0? <></> :
                      chats.map((val,index)=>{
                        let newuser = val.users.find((u)=>{
                          return u._id!==user._id
                        })
                        return <Recentchatbox key={index} name={newuser.name} email={newuser.email} setChatId={setChatId} setFriendName={setFriendName} value={val} />
                      })
                    }
                  </>
                )
              }

            </div>
          </div>

          {/* Bottom User */}
          <div className="p-4 border-t border-[#dcefe0] flex items-center gap-3 hover:bg-[#e8f5eb] cursor-pointer transition">

            <div className="relative">
              <img
                className="w-10 h-10 rounded-full border border-[#ccebd4]"
                src={`https://ui-avatars.com/api/?name=${user.name}&background=e8f5eb&color=245c38`}
                alt="user"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#70c48b] border-2 border-[#f4faf5] rounded-full"></span>
            </div>

            <div className="flex items-center justify-between w-full">
              <div>
                <h2 className="font-semibold text-[#245c38]">{user.name}</h2>
                <p className="text-sm text-[#789783]">Online</p>
              </div>

              <FiSettings
                className="text-xl text-[#557c60] cursor-pointer hover:text-[#55ad72] hover:rotate-90 transition duration-300"
                onClick={() => setIsenable(false)}
              />
            </div>
          </div>

        </div>

      ) : (

        // ================= SETTINGS VIEW =================
        <div className="w-[20%] min-w-[260px] h-screen bg-[#f4faf5] text-[#245c38] flex flex-col border-r border-[#dcefe0]">

          {/* Search */}
          <div className="p-3 border-b border-[#dcefe0]">
            <input
              type="search"
              placeholder="Search here..."
              className="w-full px-3 py-2 rounded-lg bg-white border border-[#dcefe0] text-[#245c38] placeholder-[#a3b9a9] outline-none focus:ring-2 focus:ring-[#70c48b] focus:border-[#70c48b] transition"
            />
          </div>

          {/* Settings */}
          <div className="flex-1 overflow-y-auto p-3">
            <h2 className="text-[#557c60] text-sm px-2 mb-4">Settings</h2>

            <button
              onClick={() => setIsenable(true)}
              className="flex items-center gap-2 my-2 w-full p-2 rounded-lg bg-white border border-[#dcefe0] hover:bg-[#e8f5eb] hover:border-[#ccebd4] transition"
            >
              <MessageCircleCheck className="text-[#55ad72]" />
              <span>My Chats</span>
            </button>

            <button
              onClick={() => navigate("/user/resetpassword")}
              className="flex items-center gap-2 my-2 w-full p-2 rounded-lg bg-white border border-[#dcefe0] hover:bg-[#e8f5eb] hover:border-[#ccebd4] transition"
            >
              <Settings className="text-[#55ad72]" />
              <span>Setting</span>
            </button>

            <button
              onClick={() => navigate("/user/profile")}
              className="flex items-center gap-2 my-2 w-full p-2 rounded-lg bg-white border border-[#dcefe0] hover:bg-[#e8f5eb] hover:border-[#ccebd4] transition"
            >
              <User2Icon className="text-[#55ad72]" />
              <span>Profile</span>
            </button>

            <button
              className="flex items-center gap-2 my-2 w-full p-2 rounded-lg bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition"
            >
              <LogOutIcon className="text-red-500" />
              <span>LogOut</span>
            </button>
          </div>

          {/* User Bottom */}
          <div className="h-[70px] bg-white flex items-center gap-3 px-3 border-t border-[#dcefe0]">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#ccebd4]">
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}&background=e8f5eb&color=245c38`}
                alt=""
              />
            </div>
            <h2 className="font-medium text-[#245c38]">{user.name}</h2>
          </div>

        </div>

      )}
    </>
  )
}

export default Sidebar