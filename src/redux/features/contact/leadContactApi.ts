import { baseApi } from "../../base/baseApi";

const leadContactApi = baseApi.injectEndpoints({
    endpoints: (build) => ({  
        
        getAllLeadContact: build.query({
            query: () => ({
                url: `/leads/all`,
                method: "GET",
            }),
            transformResponse: (response: any) => response?.data,
        }),  

        

    }) 
})  

export const {useGetAllLeadContactQuery} = leadContactApi;
