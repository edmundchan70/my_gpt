 
import service from "../request/request";
import { getAccessToken } from "../../util/getToken/getToken";

export function get_user_document_list(){
    return service({
        url: '/doc_query/get_user_document_list',
        method: 'post',
        headers:{
            Authorization: 'Bearer ' +getAccessToken()
        }
    })
}