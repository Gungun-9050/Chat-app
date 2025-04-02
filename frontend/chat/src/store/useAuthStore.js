import {create} from "zustand";
import {axiosInstance}  from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

 const BASE_URL = 'http://localhost:3000/'

export const useAuthStore = create((set,get)=>({
    authUser:null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    socket:null,



    isCheckingAuth : true,
    checkAuth: async ()=>{
        try {
            const res =await axiosInstance.get('/check')
            set({authUser:res.data})
            get().connectSocket()

            
        } catch (error) {
           console.log("Unable to check auth",error)
           set({authUser:null})
            
        }finally{set({isCheckingAuth:false})}

    },
    signUp: async (data)=>{
        set({ isSigningUp: true});
        try {
            const res =await axiosInstance.post('/signup',data);
            set({authUser:res.data})
            get().connectSocket()
            toast.success("Account created successfully")            
        } catch (error) {
            toast.error(error.response.data.message)
            
        }finally{set({isSigningUp:false})}

    },
   login: async (data)=>{
    set({ isLoggingIn: true});
    try {
        const res =await axiosInstance.post('/login',data);
        set({authUser:res.data})
        get().connectSocket()

        toast.success("Logged in successfully")            
    } catch (error) {
        toast.error(error.response.data.message)
        
    }finally{set({isLoggingIn:false})}

},



   logout: async ()=>{
    console.log("in log out frontend")
    try {
        await axiosInstance.post('/logout');
        set({authUser : null})
        get().disconnectSocket()

        toast.success("Logged  out successfully")            
    } catch (error) {
        toast.error(error.response.data.message)
        
    }

},


 UpdateProfile : async  (data) =>{
    set({ isUpdatingProfile: true});

    console.log(data);
    

    try {
        const res =await axiosInstance.put('/update-profile',data);
        set({authUser:res.data})
        toast.success(" PROFILE IS UPDATED")            
    } catch (error) {
        toast.error(error.response.data.message)
        
    }finally{set({isUpdatingProfile:false})}

 },

 connectSocket: () => {
    const {authUser} = get()
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
        query: {
            userId : authUser._id
        }
    });
    socket.connect();

    set({socket: socket})
},

disconnectSocket: () => {
    if(get().socket?.connected) get().socket.disconnect();
},  


})
)
