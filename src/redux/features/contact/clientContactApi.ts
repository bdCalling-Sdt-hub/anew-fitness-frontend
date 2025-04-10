import { baseApi } from "../../base/baseApi";

const clientContactApi = baseApi.injectEndpoints({
    endpoints: (build) => ({    

        getAllClientContact: build.query({
            query: () => {
                return{
                    url: `/contact/clients/get`,
                    method: "GET",
                }    
            },
            transformResponse: (response: any) => response?.data,
        }), 

        addClientContact: build.mutation({
            query: (data) => {
                return {
                    url: `/contact/clients/add`,
                    method: "POST",
                    body: data,
                };
            }
        }), 

        updateClientContact: build.mutation({
            query: ({id ,data}) => {
                return {
                    url: `/contact/clients/${id}`,
                    method: "PUT",
                    body: data,
                };
            }
        }),

        deleteClientContact: build.mutation({
            query: (id) => {
                return {
                    url: `/contact/clients/${id}`,
                    method: "DELETE",
                };
            }
        }), 

        updateClientStatus: build.mutation({
            query: (data) => {
                return {
                    url: `/contact/clients/active/${data.id}`,
                    method: "PUT",
                    body: data,
                };
            }
        }),

    }) 
}) 
export const {useGetAllClientContactQuery , useAddClientContactMutation , useUpdateClientContactMutation , useDeleteClientContactMutation , useUpdateClientStatusMutation} = clientContactApi;