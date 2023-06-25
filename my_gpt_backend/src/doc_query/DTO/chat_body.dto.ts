import { text_chunk } from "./text_chunk.dto";

export interface chat_body {
    text_chunk : text_chunk[],
    query : string
}