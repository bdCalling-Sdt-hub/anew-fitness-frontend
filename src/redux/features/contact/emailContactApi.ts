import { baseApi } from "../../base/baseApi";

const emailContactApi = baseApi.injectEndpoints({
    endpoints: (build) => ({      

        sentEmail: build.mutation({   
            query: (data) => ({
                url: `/contact/sendmail`,
                method: "POST",
                body: data,
            }), 
        }), 

    }) 
}) 

export const {useSentEmailMutation} = emailContactApi