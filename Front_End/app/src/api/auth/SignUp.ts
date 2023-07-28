 
import service from "../request/request";
import { signUpDto } from "./DTO/signUpDto";

export async function SignUp(AuthDto: signUpDto) {
    try {
        const response = await service({
            url: '/auth/local/signup',
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
