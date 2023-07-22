import { text_chunk } from "./text_chunk.dto"

export interface Chat_config{
    chunkSize: number, 
    chunkOverlap: number, 
    text_chunk:text_chunk[],
    rawData :string,
    system_msg: string,
    File : File ,
}