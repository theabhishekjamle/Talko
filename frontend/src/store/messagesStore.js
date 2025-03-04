import { create } from "zustand"
import { userAuthStore } from "./userAuthStore";

export const messageStore = create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    isMessageSending:false,

    getUsers:async () =>{
        set({isUsersLoading:true})
        try {
            const response = await fetch('http://localhost:5000/api/message/users', {
                method: 'GET',
                credentials: 'include', 
            });
            
    
            if (response.ok) {
                const data = await response.json();
                set({ users: data });
            } else {
                set({ users: [] });
            }
        } catch (error) {
            console.log('Error in Fetching Users');
            set({ users:[] });
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages:async()=>{
        const {selectedUser} = get();
        set({isMessagesLoading:true})
        try {
            const response = await fetch(`http://localhost:5000/api/message/${selectedUser._id}`, {
                method: 'GET',
                credentials: 'include', 
            });
            
    
            if (response.ok) {
                const data = await response.json();
                set({ messages: data });
            } else {
                set({ messages: [] });
            }
        } catch (error) {
            set({ messages:[] });
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    setSelectedUser:(selectedUser)=>{
        set({selectedUser})
    },

    sendMessage: async(messageData)=>{

        const {selectedUser} = get();
        set({isMessageSending:true})

        try{
            const response = await fetch(`http://localhost:5000/api/message/send/${selectedUser._id}`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
                credentials: 'include',
            });

        }
        catch(error){
            console.log("error at sending message",error)
        }
        finally{
            set({isMessageSending:false})
        }
    },


    deleteChat: async () => {
        const { selectedUser} = get();
      
        if (selectedUser) {
          try {
            const response = await fetch(`http://localhost:5000/api/message/deletemessages/${selectedUser._id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
        
              },
              credentials:'include',
            });
      
            if (response.ok) {
                get().getMessages();
              console.log('Chat deleted successfully');
            
            } else {
              console.error('Failed to delete chat');
            }
          } catch (error) {
            console.error('Error while deleting chat:', error);
          }
        } else {
          console.log('No user selected to delete the chat');
        }
      },
      

    subscribeToMessages:()=>{
        const {selectedUser} = get();
        if(!selectedUser) return;

        const socket = userAuthStore.getState().socket;

        socket.on('newMessage',(newMessage)=>{
            set({messages:[...get().messages,newMessage]})
        })

    },

    unSubscribeFromMessages:()=>{
        const socket = userAuthStore.getState().socket;
        socket.off('newMessage');

    }

}))




