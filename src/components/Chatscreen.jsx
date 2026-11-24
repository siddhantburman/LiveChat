import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

const Chatscreen = () => {

  let redirect = useNavigate()
  const { user, chatId, friendName } = useOutletContext()

  const [newMessage, setNewMessage] = useState('')
  const [chats, setChats] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    if (!chatId) return redirect("/user")

    let token = JSON.parse(localStorage.getItem("user_token"))

    const fetchChats = async () => {
      let resp = await fetch('https://api.skillsvarz.com/api/messages/' + chatId, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      let res = await resp.json()
      setChats(res)
    }

    fetchChats()
  }, [chatId, refresh])

  // 👤 Friend Message
  const you = (value) => (
    <div className="flex items-end gap-2">
      <img
        className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-[#dcefe0]"
        src={`https://ui-avatars.com/api/?name=${value.sender.name}&background=e8f5eb&color=245c38`}
        alt=""
      />

      <div className="bg-[#e8f5eb] border border-[#dcefe0] px-3 py-2 rounded-xl max-w-[75%] md:max-w-xs shadow-sm">
        <p className="text-xs md:text-sm text-[#245c38] break-words">
          {value.content}
        </p>
        <span className="text-[9px] md:text-[10px] text-[#789783]">
          {new Date(value.createdAt).toLocaleTimeString()}
        </span>
      </div>
    </div>
  )

  // 🙋 My Message
  const me = (value) => (
    <div className="flex items-end justify-end gap-2">
      <div className="bg-[#70c48b] px-3 py-2 rounded-xl max-w-[75%] md:max-w-xs text-right shadow-sm shadow-[#70c48b]/20">
        <p className="text-xs md:text-sm text-white break-words">
          {value.content}
        </p>
        <span className="text-[9px] md:text-[10px] text-[#e8f5eb]">
          {new Date(value.createdAt).toLocaleTimeString()}
        </span>
      </div>

      <img
        className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-[#dcefe0]"
        src={`https://ui-avatars.com/api/?name=${value.sender.name}&background=70c48b&color=fff`}
        alt=""
      />
    </div>
  )

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    let token = JSON.parse(localStorage.getItem('user_token'))

    let resp = await fetch('https://api.skillsvarz.com/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ chatId, content: newMessage })
    })

    if (resp.status === 200 || resp.status === 201) {
      setNewMessage("")
      setRefresh(!refresh)
    }
  }

  return (
    <div className="h-screen w-full flex flex-col bg-[#f4faf5]">

      {/* Header */}
      <div className="flex items-center justify-between px-3 md:px-6 py-3 md:py-4 border-b border-[#dcefe0] bg-gradient-to-r from-[#e8f5eb] to-[#d8eddd]">

        <div className="flex items-center gap-2 md:gap-3">
          <img
            className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#c5e5cd]"
            src={`https://ui-avatars.com/api/?name=${friendName}&background=70c48b&color=fff`}
            alt=""
          />

          <div>
            <h2 className="font-semibold text-sm md:text-base text-[#245c38]">
              {friendName}
            </h2>
            <p className="text-xs md:text-sm text-[#789783]">
              Active now
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 md:gap-4 text-[#557c60] text-sm md:text-base">
          <button className="hover:text-[#245c38] transition">📞</button>
          <button className="hover:text-[#245c38] transition">🎥</button>
          <button className="hover:text-[#245c38] transition">⋮</button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3">
        {chats.map((value, index) => (
          <div key={index}>
            {value.sender._id === user._id ? me(value) : you(value)}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 md:p-4 border-t border-[#dcefe0] bg-white flex flex-col sm:flex-row items-center gap-2 sm:gap-3">

        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="w-full flex-1 px-3 md:px-4 py-2 rounded-lg bg-[#f8fcf9] border border-[#dcefe0] focus:outline-none focus:ring-2 focus:ring-[#70c48b] focus:border-[#70c48b] text-sm text-[#245c38] placeholder:text-[#a3b9a9] transition"
        />

        <button
          onClick={sendMessage}
          className="w-full sm:w-auto bg-[#70c48b] px-5 py-2 rounded-lg text-white font-medium hover:bg-[#55ad72] transition duration-200 text-sm shadow-md shadow-[#70c48b]/20"
        >
          Send
        </button>

      </div>

    </div>
  )
}

export default Chatscreen