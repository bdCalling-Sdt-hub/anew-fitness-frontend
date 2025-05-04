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

          getAllReport: build.query({
            query: (id) => ({
              url: `/report/inalldetails/${id}`,
              method: "GET",
            }),
          }),

          createReportFirstDetails: build.mutation({
            query: (data) => ({
              url: `/report/workdetails1`,
              method: "POST",
              body: data,
            }),
          }),  

          createReportSecondDetails: build.mutation({
            query: (data) => ({
              url: `/report/workdetails2`,
              method: "POST",
              body: data,
            }),
          }), 

          createMiles: build.mutation({
            query: (data) => ({
              url: `/report/milesdetails`,
              method: "POST",
              body: data,
            }),
          })
     }) 
}) 

export const {useCreateNewInstructorMutation , useGetAllReportQuery , useCreateReportFirstDetailsMutation , useCreateReportSecondDetailsMutation , useCreateMilesMutation} =  paymentReportApi