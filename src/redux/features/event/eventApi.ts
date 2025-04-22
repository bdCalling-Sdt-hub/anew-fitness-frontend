import { baseApi } from "../../base/baseApi";

const eventApi = baseApi.injectEndpoints({
    endpoints: (build) => ({      
  
        createNewEvent: build.mutation({
            query: (data) => ({
                url: "/event",
                method: "POST",
                body: data,
            }),
        }),

    }) 
}) 

export const {useCreateNewEventMutation} = eventApi