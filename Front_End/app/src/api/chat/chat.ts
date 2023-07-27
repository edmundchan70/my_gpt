import Cookies from "js-cookie";
 
import service from "../request/request";
 
import { chat_body } from "./DTO/chat_body.dto";

export function chat(data: chat_body){
    return service({
        url: '/doc_query/chat',
        method: 'post',
        data: data,
        headers:{
            Authorization: 'Bearer ' +Cookies.get("access_token")
        }
    })
}