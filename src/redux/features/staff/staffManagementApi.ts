import { baseApi } from "../../base/baseApi";

const staffManagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    getAllStaff: build.query({
      query: () => ({
        url: "/admin/all",
        method: "GET",
      }),
      transformResponse: (response: any) => response?.staff,
    }),

    addStaff: build.mutation({
      query: (data) => ({
        url: "/admin/create",
        method: "POST",
        body: data,
      }),
    }),

    editStaffInfo: build.mutation({
      query: (data) => ({
        url: `/admin/update/${data?.id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteStaff: build.mutation({
      query: (id) => ({
        url: `/admin/delete/${id}`,
        method: "DELETE",
      }),
    }),

    //assign staff to role 
    assignStaff: build.mutation({
      query: (data) => ({
        url: "/admin/assign-role",
        method: "POST",
        body: data,
      }),
    }),


  })
})

export const { useGetAllStaffQuery, useAddStaffMutation, useDeleteStaffMutation, useEditStaffInfoMutation , useAssignStaffMutation } = staffManagementApi;
