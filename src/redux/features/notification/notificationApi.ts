import { baseApi } from "../../base/baseApi"

const notificationApi = baseApi.injectEndpoints({
    endpoints: (build) => ({     

        NotificationQuery: build.query({ 
            
            query: (id) => `/notification/${id}`,  
        
        }), 
    }) 
}) 
 
export const { useNotificationQueryQuery} =  notificationApi