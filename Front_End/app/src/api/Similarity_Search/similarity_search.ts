import { chat_body } from "../DTO/chat_body.dto";
import service from "../request/request";

export default function similarity_search(data: chat_body){
    return service({
        url: '/doc_query/similarity_search',
        method: 'post',
        data: data
    })
}