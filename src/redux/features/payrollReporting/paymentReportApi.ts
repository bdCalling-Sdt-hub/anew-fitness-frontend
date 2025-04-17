import { baseApi } from "../../base/baseApi";

const paymentReportApi = baseApi.injectEndpoints({
    endpoints: (build) => ({   
 
        createNewInstructor: build.mutation({
            query: (data) => ({
              url: `/report/instructor`,
              method: "POST",
              body: data,
            }),
          }),  

          getNewInstructorById: build.query({
            query: (id) => ({
              url: `/report/inalldetails/${id}`,
              method: "GET",
            }),
          }),

          createReportDetails: build.mutation({
            query: (data) => ({
              url: `/report/workdetails`,
              method: "POST",
              body: data,
            }),
          })
     }) 
}) 

export const {useCreateNewInstructorMutation , useGetNewInstructorByIdQuery , useCreateReportDetailsMutation} =  paymentReportApi