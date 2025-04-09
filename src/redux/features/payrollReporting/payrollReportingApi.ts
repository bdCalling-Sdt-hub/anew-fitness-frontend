import { baseApi } from "../../base/baseApi";

const payrollReporting = baseApi.injectEndpoints({
    endpoints: (build) => ({    
 
        getAllPayrollReporting: build.query({
            query: () => {
                // const params = new URLSearchParams();  
                // if(data) { 
                //     params.append("workType", data);  
                // }
                return{
                    url: `/report/getall`,
                    method: "GET",
                }    
            },
            transformResponse: (response: any) => response,
        }),

    })
})
export const {useGetAllPayrollReportingQuery } = payrollReporting;