import { chat_body } from "../DTO/chat_body.dto";
import service from "../request/request";

export function get_summary(data: chat_body){
    return service({
        url: '/doc_query/summary',
        method: 'post',
        data: data
    })
}