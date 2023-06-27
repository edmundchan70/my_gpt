import { chat_body } from "../../api/DTO/chat.dto";
import { Text_Chunk } from "./Text_Chunk";

export interface Chat_config{
    chunkSize: number, 
    chunkOverlap: number, 
    rawData:string,
    text_chunk?:Text_Chunk[]
}