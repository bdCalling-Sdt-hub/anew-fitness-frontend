import { baseApi } from "../../base/baseApi";

const reportsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({  
 
    getClassReport: build.query({
      query: ({status, search}) => { 
        const params = new URLSearchParams(); 
        if(status) params.append("status", status); 
        if(search) params.append("filter", search);
        return{
          url: `/class/getstates?${params.toString()}`,
        }
      },  
      transformResponse: (response: any) => response?.data,
    }),  

// appointment bookings
getAppointmentReport: build.query({
  query: ({status , search}) => { 
    const params = new URLSearchParams(); 
    if(status) params.append("status", status); 
    if(search) params.append("filter", search);
    return{
      url: `/appointment/getstats?${params.toString()}`,
    }
  },  
  transformResponse: (response: any) => response?.data,
}),  

    }) 
}) 

export const { useGetClassReportQuery  , useGetAppointmentReportQuery } = reportsApi