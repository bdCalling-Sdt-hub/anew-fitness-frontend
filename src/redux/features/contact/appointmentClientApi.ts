import { baseApi } from "../../base/baseApi";

const appointmentClientApi = baseApi.injectEndpoints({
    endpoints: (build) => ({    

        getAllAppointmentContact: build.query({
            query: () => {
                return{
                    url: `/appointment/all`,
                    method: "GET",
                }    
            },
            transformResponse: (response: any) => response?.data,
        }), 

        addAppointmentContact: build.mutation({
            query: (data) => {
                return {
                    url: `/appointment/book`,
                    method: "POST",
                    body: data,
                };
            }
        }), 

        updateAppointmentContact: build.mutation({
            query: ({id ,data}) => {
                return {
                    url: `/appointment/update/${id}`,
                    method: "PUT",
                    body: data,
                };
            }
        }),

        deleteAppointmentContact: build.mutation({
            query: (id) => {
                return {
                    url: `/appointment/delete/${id}`,
                    method: "DELETE",
                };
            }
        }), 

    }) 
}) 
export const {useGetAllAppointmentContactQuery , useAddAppointmentContactMutation , useUpdateAppointmentContactMutation , useDeleteAppointmentContactMutation} = appointmentClientApi;