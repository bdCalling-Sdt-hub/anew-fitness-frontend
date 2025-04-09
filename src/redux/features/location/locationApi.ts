import { baseApi } from "../../base/baseApi";

const locationApi = baseApi.injectEndpoints({
    endpoints: (build) => ({  
        getLocation: build.query({
            query: (workType) => { 
                const params = new URLSearchParams();  
                if(workType) { 
                    params.append("workType", workType);  
                }

                return{
                    url: `/admin/location?${params.toString()}`,
                }
            },
            transformResponse: (response: any) => response,
        }),   

        addLocation: build.mutation({
            query: (data) => ({
                url: "/admin/location",
                method: "POST", 
                body: data,
            }), 
        }) , 

        editLocation: build.mutation({
            query: ({ id, data }) => ({
                url: `/admin/location/${id}`,
                method: "PUT",
                body: data,
            }), 
        }),  

        deleteLocation: build.mutation({
            query: (id) => ({
                url: `/admin/location/${id}`,
                method: "DELETE",
            }), 
        }),
    
        updateStatus: build.mutation({
            query: ( data) => ({
                url: `/admin/location/status`,    
                method: "PUT",
                body: data,
            }), 
        }),

    }) 
})  

export const {useGetLocationQuery , useAddLocationMutation , useEditLocationMutation,useDeleteLocationMutation , useUpdateStatusMutation} = locationApi;