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
 
        updateLeadStatus: build.mutation({
            query: (data) => {
                return {
                    url: `/leads/status/${data.id}`,
                    method: "PUT",
                    body: data,
                };
            }
        }), 

        addLeadContact: build.mutation({
            query: (data) => {
                return {
                    url: `/leads/add`,
                    method: "POST",
                    body: data,
                };
            }
        }), 

        updateLeadContact: build.mutation({
            query: ({id ,data}) => {
                return {
                    url: `/leads/update/${id}`,
                    method: "PUT",
                    body: data,
                };
            }
        }),

        deleteLeadContact: build.mutation({
            query: (id) => {
                return {
                    url: `/leads/delete/${id}`,
                    method: "DELETE",
                };
            }
        }),   

        getLeadById: build.query({
            query: (id) => ({
                url: `/leads/${id}`,
            }),
            transformResponse: (response: any) => response?.data,
        }),
 
        addMultipleLeadContact: build.mutation({
            query: (data) => {
                return {
                    url: `/leads/upload`,
                    method: "POST",
                    body: data,
                };
            }
        })
    }) 
})  

export const {useGetAllLeadContactQuery , useUpdateLeadStatusMutation , useAddLeadContactMutation , useUpdateLeadContactMutation , useDeleteLeadContactMutation , useGetLeadByIdQuery , useAddMultipleLeadContactMutation} = leadContactApi;
