import { baseApi } from "../../base/baseApi";

const homeApi = baseApi.injectEndpoints({
    endpoints: (build) => ({  
 
        getHomeData: build.query({  
            query: ({ location, dateRange} ) =>  {   
                const params = new URLSearchParams()  
                if(location) params.append("location",location);
                if(dateRange) params.append("dateRange",dateRange);
                return{
                    url: `/event/home?${params.toString()}`,
                }
            }, 
            transformResponse: (response: any) =>response?.data,
        }),

        }) 
}) 

export const { useGetHomeDataQuery } = homeApi