import { baseApi } from "../../base/baseApi"

const notificationApi = baseApi.injectEndpoints({
    endpoints: (build) => ({     

        Notification: build.query({ 
            
            query: () => `/notification/admin`,  
        
        }), 
    }) 
}) 
 
export const { useNotificationQuery} =  notificationApi