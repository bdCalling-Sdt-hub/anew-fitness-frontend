import { baseApi } from "../../base/baseApi";

const payrollReporting = baseApi.injectEndpoints({
    endpoints: (build) => ({      

        getAllPayrollReporting: build.query({
            query: (status) => {
                const params = new URLSearchParams();  
                if(status) { 
                    params.append("year", status);  
                }
                return{
                    url: `/report/payroll-home?${params.toString()}`,
                }    
            },
            transformResponse: (response: any) => response,
        }), 

        getPayrollOverview: build.query({
            query: ({filterType ,staffData }) => {
                const params = new URLSearchParams();  
                if(filterType) { 
                    params.append("filterType", filterType);  
                }
                if(staffData) { 
                    params.append("instrtuctorName", staffData);  
                }
                return{
                    url: `/report/getoverview?${params.toString()}`,
                }    
            },
            transformResponse: (response: any) => response,
        }),

    })
})
export const {useGetAllPayrollReportingQuery , useGetPayrollOverviewQuery } = payrollReporting;