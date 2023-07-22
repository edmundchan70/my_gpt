import { chat_body } from "../../../api/DTO/chat_body.dto";
import { Text_Chunk } from "./Text_Chunk";

export interface Chat_config{
    chunkSize: number, 
    chunkOverlap: number, 
    rawData:string,
    text_chunk:Text_Chunk[],
    temperature : number,
    system_msg: string,
    File : File ,
    k?: number,
    similarity_result?: Text_Chunk[]  //will be pure string after similarty search,
    similarity_query?: string 
    similarity_Search_time?: number,

}