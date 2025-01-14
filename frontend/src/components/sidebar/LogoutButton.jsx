import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const {loading,logout } = useLogout();
  return (
    <div className='mt-auto'>
      {!loading ? (
        <BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout}/>
      ):(
        <samp className="loading loading-spinner"></samp>
      )}
    </div>
  )
}

export default LogoutButton

//stater code
// import React from 'react'
// import { BiLogOut } from "react-icons/bi";
// const LogoutButton = () => {
//   return (
//     <div className='mt-auto'>
//       <BiLogOut className='w-6 h-6 text-white cursor-pointer'/>
//     </div>
//   )
// }

// export default LogoutButton