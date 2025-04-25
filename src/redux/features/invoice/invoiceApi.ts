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

    }) 
})  

export const {useGetAllInvoiceQuery, useCreateSingleInvoiceMutation, useCreateMultipleInvoiceMutation } = invoiceApi