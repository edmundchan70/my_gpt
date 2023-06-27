import { text_chunk } from "./text_chunk";

export interface chat_body {
    text_chunk : text_chunk[],
    query : string,
    chunk_return?:number 
}