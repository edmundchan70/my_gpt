import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { text_chunk } from "../../DTO/doc_query/text_chunk.dto";
import { TensorFlowEmbeddings } from "langchain/embeddings/tensorflow";
import * as tf from '@tensorflow/tfjs-node'
 
async function HNSWLib_search(text_chunk: text_chunk [], query:string ,k?:number ) {
  if(!k)  k = text_chunk.length /2 ;  //init chunk return
  // Set the backend to WASM and wait for the module to be ready.
  tf.setBackend('cpu');
 
    const start_time =  Date.now()
    
    const vectorStore = await HNSWLib.fromDocuments(text_chunk, new TensorFlowEmbeddings({}));
    const End_time =  Date.now()
    console.log(vectorStore)
   
    
   // console.log('spend' , End_time - start_time)
  //  console.log('chunk_return' , typeof k ,k , 'query' , query , 'text_chunk', text_chunk)
    const result =await vectorStore.similaritySearch(query,Number(k));
    console.log(result)
    return {str_rep: text_chunktoString(result),
            text_chunk: result};
 
   
  
   
}
export function text_chunktoString(result:text_chunk[]) :string{
  let new_text = "";
  for (let i = 0; i < result.length; i++) {
    const pageContent = result[i].pageContent.replace(/\n/g, " ").trim();
    new_text += pageContent;
  }
  return new_text
}
 
export default HNSWLib_search;