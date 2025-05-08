import { baseApi } from "../../base/baseApi";

const invoiceApi = baseApi.injectEndpoints({
    endpoints: (build) => ({   
        
        getAllInvoice: build.query({
            query: (status) => { 

                const params = new URLSearchParams();  
                if(status) { 
                    params.append("status", status);  
                } 

                return{
                    url: `/invoice?${params.toString()}`,
                    method: "GET",
                }
            },
            transformResponse: (response: any) => response?.data,
        }), 

        createSingleInvoice: build.mutation({
            query: (data) => ({
                url: "/invoice/single",
                method: "POST",
                body: data,
            }),
        }), 

        createMultipleInvoice: build.mutation({
            query: (data) => ({
                url: "/invoice/multiple",
                method: "POST",
                body: data,
            }), 
        }) ,   
        
        updateSingleInvoice: build.mutation({
            query: ({id ,data}) => ({
                url: `/invoice/update/${id}`,
                method: "PUT",
                body: data,
            }),
        }) ,

        deleteInvoice: build.mutation({
            query: (id) => ({
                url: `/invoice/delete/${id}`,
                method: "DELETE",
            }), 
        }) ,

    }) 
})  

export const {useGetAllInvoiceQuery, useCreateSingleInvoiceMutation, useCreateMultipleInvoiceMutation , useUpdateSingleInvoiceMutation , useDeleteInvoiceMutation} = invoiceApi