import { baseApi } from "../../base/baseApi"

const classesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({  

    getAllClasses: build.query({
      query: () => { 

        return{ 
            url: "/class/get",
            method: "GET",
        }
      },
      transformResponse: (response: any) => response?.data,
    }),  

    updateClassStatus: build.mutation({
      query: (data) => ({
        url: `/class/status/${data.id}`,
        method: "PUT",
        body: data,
      }),
    })
    
  }) 
})  

export const {useGetAllClassesQuery , useUpdateClassStatusMutation} = classesApi