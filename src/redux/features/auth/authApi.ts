import { baseApi } from "../../base/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({ 

    // for admin 
    loginUser: build.mutation({
      query: (data) => ({
        url: "/admin/login",
        method: "POST",
        body: data,
      }),
    }), 
 
    //for staff
    staffLogin: build.mutation({
      query: (data) => ({
        url: "/staff/login",
        method: "POST",
        body: data,
      }),
    }),

    verifyEmail: build.mutation({
      query: (data) => ({
        url: "/staff/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    forgetPassword: build.mutation({
      query: (data) => ({
        url: "/staff/forget-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: build.mutation({
      query: (data) => ({
        url: "/staff/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    
    changePassword: build.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }), 

    setUserPassword: build.mutation({
      query: (data) => ({
        url: "/staff/set-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation, 
  useStaffLoginMutation , 
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation, 
  useSetUserPasswordMutation, 
} = authApi;