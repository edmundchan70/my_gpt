import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { text_chunk } from "../../DTO/doc_query/text_chunk.dto";
import { TensorFlowEmbeddings } from "langchain/embeddings/tensorflow";
async function   HNSWLib_search(text_chunk: text_chunk [], query:string) {
    const vectorStore = await HNSWLib.fromDocuments(text_chunk, new TensorFlowEmbeddings());
    const chunk_return = text_chunk.length /2 ; 
    const result =await vectorStore.similaritySearch(query,chunk_return);
    let new_text = "";
    for (let i = 0; i < result.length; i++) {
      const pageContent = result[i].pageContent.replace(/\n/g, " ").trim();
      new_text += pageContent;
    }
    return new_text
}
export default HNSWLib_search;