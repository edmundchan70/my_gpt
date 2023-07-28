 
import service from "../request/request";
import { getAccessToken } from "../../util/getToken/getToken";

export function get_user_detail_info() {
    return service({
        url: '/user/get_user_info',
        method: 'post',
        headers:{
            Authorization: 'Bearer ' +getAccessToken()
        }
    })
}