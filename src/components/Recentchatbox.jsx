import React from 'react'
import { useNavigate } from 'react-router-dom'

const RecentChatBox = ({ name , email, newchat, id, setChatId, setFriendName, value }) => {

    let redirect = useNavigate()

    return (
        <div 
            onClick={ async ()=>{
                redirect('/user/chat')
                setFriendName(name)

                if(newchat){
                    let chatid = await newchat(id)
                    setChatId(chatid)
                } else {
                    setChatId(value._id)
                }
            }} 
            className="flex items-center gap-2 sm:gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-[#e8f5eb] active:scale-[0.98] transition-all duration-200 group"
        >

            {/* Avatar */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#ccebd4] flex-shrink-0 shadow-sm">
                <img
                    className="w-full h-full object-cover"
                    src={`https://ui-avatars.com/api/?name=${name}&background=e8f5eb&color=245c38`}
                    alt={name}
                />
            </div>

            {/* Name + Message */}
            <div className="flex-1 min-w-0">
                <h2 className="text-xs sm:text-sm md:text-base font-semibold text-[#245c38] truncate">
                    {name}
                </h2>
                <p className="text-[10px] sm:text-xs text-[#789783] truncate">
                    {email}
                </p>
            </div>

            {/* Time */}
            <span className="text-[10px] sm:text-xs text-[#789783] flex-shrink-0">
                2m
            </span>
        </div>
    )
}

export default RecentChatBox