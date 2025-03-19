import toast from "react-hot-toast";
import { create } from "zustand";
import {io} from "socket.io-client";

const BASE_URL = "http://localhost:5000"

export const userAuthStore = create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    onlineUsers:[],
    socket:null,



    isCheckingAuth:true,
    checkAuth: async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/check', {
                method: 'GET',
                credentials: 'include', 
            });
            const data = await response.json();
    
            if (response.ok) {
                set({ authUser: data });
                get().connecSocket();
            } else {
                set({ authUser: null });
            }
        } catch (error) {
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },


    signUp: async (formData) =>{
        toast.dismiss(); 
        try {
            set({isSigningUp:true})
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include', 
            });

            const data = await response.json();
            if (response.ok) {
                set({authUser:data})
                toast.success("SignedUp Successfull");
                get().connecSocket();
            } else {
                toast.error(data.message);
                set({authUser:null})
            }
        } catch (error) {
            toast.error("Connection Error");
            set({authUser:null})
        }
        finally{
            set({isSigningUp:false})
        }
    },

    logIn: async (formData) =>{
        toast.dismiss(); 
        try {
            set({isLoggingIn:true})
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include', 
            });

            console.log(response);

            if (response.ok) {
                const data = await response.json();
                set({authUser:data});
                toast.success("LogedIn Successfully");
                get().connecSocket();

            } else {
                toast.error("Invalid credentials");
                set({authUser:null})
            }
        } catch (error) {
            toast.error("Failed to Connect");
            set({authUser:null})
        }
        finally{
            set({isLoggingIn:false})
        }
    },

    logOut:async()=>{
        try{
            const response = await fetch('http://localhost:5000/api/auth/logOut', {
                method: 'GET',
                credentials: 'include', 
            });
            set({authUser:null})
            get().disConnectSocket();
            toast.success("LogedOut Successfully");

        }
        catch(error){
            toast.error("Failed to Connect");


        }
    },

    uploadProfilePic:async(selectedImage)=>{
        console.log("image",selectedImage)
        try {
            set({isUpdatingProfile:true})
            const response = await fetch('http://localhost:5000/api/auth/updateprofile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedImage),
                credentials: 'include', 
            });

            if (response.ok) {
                toast.success('Profile picture updated successfully!');
            } else {
                toast.error("Error in Update");
            }
        } catch (error) {
            toast.error("Failed to Connect");

        }
        finally{
            set({isUpdatingProfile:false})
        }
    },

    connecSocket:async()=>{
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL,{
            query:{
                userId:authUser._id
            }
        });
        socket.connect();
        set({socket:socket});

        socket.on("getOnlineUsers" ,(userIds)=>{
            set({onlineUsers:userIds})
        })
    },

    disConnectSocket:async()=>{
        if(get().socket?.connected){
            get().socket.disconnect();
        }
    }

    
}))