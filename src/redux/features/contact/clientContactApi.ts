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
                    url: `/contact/clients/create`,
                    method: "POST",
                    body: data,
                };
            }
        }), 

        updateClientContact: build.mutation({
            query: (data) => {
                return {
                    url: `/contact/clients/update/${data.id}`,
                    method: "PUT",
                    body: data,
                };
            }
        }),

    }) 
}) 
export const {useGetAllClientContactQuery , useAddClientContactMutation , useUpdateClientContactMutation } = clientContactApi;