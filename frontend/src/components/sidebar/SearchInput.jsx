import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';
const SearchInput = () => {
  
  const [search,setSearch] = useState("");
  const {setSelectedConversation} = useConversation();
  const { conversations } = useGetConversations();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;
    if(search.length < 2 ){
      return toast.error("search must be at least 2 characters");
    }
    const conversation = conversations.find((item) => item.fullName.toLowerCase().includes(search.toLowerCase()));
    if(conversation) {
      setSelectedConversation(conversation);
      setSearch("");
      } else toast.error("no such user found");
  };

  return (
    <form onSubmit={handleSubmit} className='flex item-center gap-2'>
        <input type="text" placeholder='Search_' className='input input-bordered rounded-full'
         value={search} onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className='btn btn-circle bg-sky-500 text-white'>
            <IoIosSearch className='w-6 h-6 outline-none'/>
        </button>
    </form>
  )
};

export default SearchInput;


//Starter code for searchinput.jsx
// import { IoIosSearch } from "react-icons/io";
// const SearchInput = () => {
//   return (
//     <form className='flex item-center gap-2'>
//         <input type="text" placeholder='Search_' className='input input-bordered rounded-full'/>
//         <button type="submit" className='btn btn-circle bg-sky-500' text-white>
//             <IoIosSearch className='w-6 h-6 outline-none'/>
//         </button>
//     </form>
//   )
// }

// export default SearchInput
