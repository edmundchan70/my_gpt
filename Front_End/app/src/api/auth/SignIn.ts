import { AxiosError } from "axios";
import service from "../request/request";
import { signInDto } from "./DTO/signInDto";
 

export async function Signin(AuthDto: signInDto) {
    try {
        const response = await service({
            url: '/auth/local/signIn',
            method: 'post',
            data: AuthDto,
        }); 
        // Return the response data when the API call is successful
        return response;
    } catch (err : any) {
        // Check if the error contains response data with an error message
        if (err.response && err.response.data && err.response.data.message) {
            // Return the error message from the API response
            return err.response.data.message;
        } else {
            // If no specific error message from the API, return a generic error message
            return 'An error occurred during the API call.';
        }
    }
}
