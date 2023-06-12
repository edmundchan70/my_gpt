import { OpenAI } from "langchain/llms/openai";
import { loadQAStuffChain, loadQAMapReduceChain } from "langchain/chains";
import { Document } from "langchain/document";
import { Chain_Config } from "../DTO/Chain.dto";

// default chain is LLMCHain 
export class Chain {
    public conversation : any  ;
    constructor(private chain: Chain_Config){
            this.conversation = this.set_chain();}
    /**
     * set_chain 
     * @param none 
     * @return  
     */
    set_chain() {
        switch (this.chain.chain_type) {
         
    }

    }
    async  call_chain(user_input: string){
        return await this.chain.call({input: user_input})
    }
    async load_memory(){
        await this.config.memory.loadMemoryVariables({});
    }
}