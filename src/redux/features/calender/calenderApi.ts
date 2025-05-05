import { baseApi } from "../../base/baseApi";

const calenderApi = baseApi.injectEndpoints({
    endpoints: (build) => ({  
 
        getCalenderData: build.query({
            query: () => ({
                url: `/class/getstates`,
            }), 
            transformResponse: (response: any) =>response?.data,
        }), 

        getAllCalenderData: build.query({
            query: () => ({
                url: `/calendar/get`,
            }), 
            transformResponse: (response: any) =>response?.data,
        }),
      })  
})  

export const {useGetCalenderDataQuery , useGetAllCalenderDataQuery } = calenderApi