import { baseApi } from "../../base/baseApi";

const staffManagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({  
      
    getAllStaff: build.query({
      query: () => ({  
        url: "/admin/all",
        method: "GET",
      }) ,  
      transformResponse: (response: any) => response?.staff ,
    }) ,  

    addStaff: build.mutation({
      query: (data) => ({   
        url: "/admin/create",
        method: "POST",
        body: data,
      }) ,
    }), 

    deleteStaff: build.mutation({ 
        query: (id) => ({   
            url: `/admin/delete/${id}`,
            method: "DELETE",
        }) ,
        }),



  }) 
})  

export const {useGetAllStaffQuery , useAddStaffMutation , useDeleteStaffMutation } = staffManagementApi;
