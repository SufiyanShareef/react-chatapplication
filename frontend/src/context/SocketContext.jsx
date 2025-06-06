import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket,setSocket] = useState();
    const [onlineUsers,setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();

    useEffect( () => {
        if(authUser){
            const socket = io("http://localhost:5000",{
                query: {
                    userId: authUser._id,
                },
            });

            setSocket(socket);

            // Listen for new user connections. can be used on both sides of application.
            socket.on("getOnlineUsers",(users)=>{
                setOnlineUsers(users);
            });

            return () => socket.close();
        } else {
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    },[authUser]);

 return <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>

}