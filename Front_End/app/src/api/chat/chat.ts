import { chat_body } from "../DTO/chat_body.dto";
import service from "../request/request";

export function chat(data: chat_body){
    return service({
        url: '/doc_query/chat',
        method: 'post',
        data: data
    })
}