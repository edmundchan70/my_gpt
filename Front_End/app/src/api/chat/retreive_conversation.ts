import Cookies from "js-cookie";
 
import service from "../request/request";
 
 
import { Document_id } from "./DTO/Document_id.dto";

export function retrieve_conversation(data: Document_id){
    console.log(data, 'api call from retrieve_conversation');
    return service({
        url: '/doc_query/retrieve_conversation',
        method: 'post',
        data: data,
        headers:{
            Authorization: 'Bearer ' +Cookies.get("access_token")
        }
    })
}