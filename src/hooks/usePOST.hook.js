import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-hot-toast'
import { authInstanceAxios, publicInstanceAxios } from "../config/axiosInstance";

export const usePOST = (url, withAuth = true) => {
    const { mutate, isError, isPending, isSuccess, data, error } = useMutation({
        mutationFn: async (values) => {
            const axiosInstance = withAuth ? authInstanceAxios : publicInstanceAxios
            const response = await axiosInstance.post(url, values)
            return response?.data
        },
        onSuccess: (returnedData) => {
            // toast.success(returnedData?.message || 'Created successfully', {
            //     icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#00923F" ><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M9.999 13.587 7.7 11.292l-1.412 1.416 3.713 3.705 6.706-6.706-1.414-1.414z"></path></svg>
            // })
            // storeCallback && storeCallback(returnedData)
            // console.log('Data >>>>', returnedData)
            returnedData.message ? toast.success(returnedData.message) : toast.success('Success')

        },
        onError: (err) => {
            // (err?.data?.message instanceof Array) ? toast.error(err?.data?.message[0]) : toast.error(err?.data?.message)
            // console.log('Error >>>>>', err.response?.data)
            if (err.data.message === 'Undefined property: Illuminate\\Http\\JsonResponse::$token') {
                toast.error('Invalid email')
            } else {
                toast.error('Something failed try again later')
            }




        }
    });

    return {
        mutate,
        isPending,
        isError,
        isSuccess,
        data,
        error
    };
};
