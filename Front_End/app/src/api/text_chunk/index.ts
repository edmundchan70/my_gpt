 
import { chunk_setting } from "../DTO/chunk_setting.dto";
 
import service from "../request/request";

export function create_text_chunk(data: chunk_setting){
    return service({
        url: '/doc_query/generate_text_chunk',
        method: 'post',
        data: data
    })
}