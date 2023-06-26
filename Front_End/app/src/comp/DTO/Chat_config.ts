import { chat_body } from "../../api/DTO/chat.dto";

export interface Chat_config{
    chunkSize: number, 
    chunkOverlap: number, 
    chat_body : chat_body
}