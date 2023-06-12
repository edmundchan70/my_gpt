import { MapReduceDocumentsChain, StuffDocumentsChain } from "langchain/chains";

export interface  Chain_Config{
    chain_type: "MapReduceDocumentsChain"| "StuffDocumentsChain",
    template : string 
}