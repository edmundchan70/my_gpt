import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { text_chunk } from "../../DTO/doc_query/text_chunk.dto";
import { TensorFlowEmbeddings } from "langchain/embeddings/tensorflow";
import * as tf from '@tensorflow/tfjs-node'

async function HNSWLib_search(text_chunk: text_chunk [], query:string ,chunk_return?:number ) {
  if(!chunk_return)  chunk_return = text_chunk.length /2 ;  //init chunk return
  // Set the backend to WASM and wait for the module to be ready.
  tf.setBackend('cpu');
 
    const start_time =  Date.now()
    
    const vectorStore = await HNSWLib.fromDocuments(text_chunk, new TensorFlowEmbeddings({}));
    const End_time =  Date.now()
    console.log(vectorStore)
    await vectorStore.save('./save.txt')
    
    console.log('spend' , End_time - start_time)
    const result =await vectorStore.similaritySearch(query,chunk_return);
    let new_text = "";
    for (let i = 0; i < result.length; i++) {
      const pageContent = result[i].pageContent.replace(/\n/g, " ").trim();
      new_text += pageContent;
    }
    return new_text
   
  
   
}
 
export default HNSWLib_search;