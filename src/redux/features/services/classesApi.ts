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
    }) ,  

    deleteClasses: build.mutation({
      query: (id) => ({
        url: `/class/delete/${id}`,
        method: "DELETE",
      }),
    }) , 

    getClassById: build.query({
      query: (id) => { 
        return{ 
            url: `/class/classById/${id}`,
            method: "GET",
        }
      },
      transformResponse: (response: any) => response?.data,
    }),  

    addClasses: build.mutation({
      query: (data) => ({
        url: "/class/create",
        method: "POST",
        body: data,
      }),
    }) , 

    editClasses: build.mutation({
      query: ({ id, data }) => ({
        url: `/class/${id}`,
        method: "PUT",
        body: data,
      }),
    }) , 
    
  }) 
})  

export const {useGetAllClassesQuery , useUpdateClassStatusMutation , useDeleteClassesMutation , useGetClassByIdQuery , useAddClassesMutation , useEditClassesMutation} = classesApi