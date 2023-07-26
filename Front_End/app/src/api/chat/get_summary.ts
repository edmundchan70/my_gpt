
import service from "../request/request";
import Cookies from "js-cookie";
import { Document_id } from "./DTO/Document_id.dto";

export function get_summary(data: Document_id){
    return service({
        url: '/doc_query/generate_summary',
        method: 'post',
        data: data,
          headers:{
            Authorization: 'Bearer ' +Cookies.get("access_token")
        }
    })
}