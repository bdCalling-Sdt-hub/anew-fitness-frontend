

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetLocalStorage } from "../../utils/LocalStroage";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://72.167.224.54:8080/api/v1" ,
      // baseUrl: "http://10.0.70.208:8080/api/v1" , 
      prepareHeaders: (headers) => {
        const token = GetLocalStorage("accessToken")
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      },
    }),
  endpoints: () => ({}), 
  tagTypes: [ "chats"],
});

// export const imageUrl = "http://10.0.70.208:8080";
export const imageUrl = "http://72.167.224.54:8080";  