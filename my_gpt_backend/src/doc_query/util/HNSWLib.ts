import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { text_chunk } from "../DTO/text_chunk.dto";
import { TensorFlowEmbeddings } from "langchain/embeddings/tensorflow";
async function   HNSWLib_search(text_chunk: text_chunk [], query:string) {
    const vectorStore = await HNSWLib.fromDocuments(text_chunk, new TensorFlowEmbeddings());
    const result =await vectorStore.similaritySearch(query,5);
    let new_text = "";
    for (let i = 0; i < result.length; i++) {
      const pageContent = result[i].pageContent.replace(/\n/g, " ").trim();
      new_text += pageContent;
    }
    return new_text.trim()
}
export default HNSWLib_search;