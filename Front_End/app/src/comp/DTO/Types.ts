import { ConversationChain,ConversationalRetrievalQAChain, LLMChain, MapReduceDocumentsChain, RefineDocumentsChain, RetrievalQAChain, StuffDocumentsChain } from "langchain/chains";
export  type Message ={
    send_time: Date
    msg: any 
    sender:  "user" | "AI"
  } 
export type Chain = ConversationalRetrievalQAChain|  LLMChain |MapReduceDocumentsChain| RefineDocumentsChain|  RetrievalQAChain| StuffDocumentsChain  | ConversationChain
  