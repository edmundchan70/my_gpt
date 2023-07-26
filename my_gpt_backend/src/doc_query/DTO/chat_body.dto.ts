import { text_chunk } from "./text_chunk.dto";

export interface chat_body {
    chunk_return?: number ,
    text_chunk : text_chunk[],
    query : string
}