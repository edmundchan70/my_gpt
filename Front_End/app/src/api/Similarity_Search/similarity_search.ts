import { chat_body } from "../DTO/chat.dto";
import service from "../request/request";

export function chat(data: chat_body){
    return service({
        url: '/doc_query/similarity_search',
        method: 'post',
        data: data
    })
}