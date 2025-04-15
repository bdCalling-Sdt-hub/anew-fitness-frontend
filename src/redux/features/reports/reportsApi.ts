import { baseApi } from "../../base/baseApi";

const reportsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({  
 
    getClassReport: build.query({
      query: () => ({
        url: `/class/getstates`,
      }),  
      transformResponse: (response: any) => response?.data,
    }), 

    }) 
}) 

export const { useGetClassReportQuery } = reportsApi