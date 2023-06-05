import { BaseChain, ChainInputs, ConversationChain, ConversationalRetrievalQAChain, ConversationalRetrievalQAChainInput, LLMChain, LLMChainInput } from "langchain/chains";
import { Config } from "../DTO/Config.dto";

// default chain is LLMCHain 
export class Conversation {
    public chain : BaseChain  ;
    constructor(private config: Config){
            this.chain = this.set_chain();}
    /**
     * set_chain 
     * @param none 
     * @return  
     */
    set_chain() {
        console.log(this.config.prompt_template)
        switch (this.config.chain_type) {
            
            /*case "ConversationalRetrievalQAChain":
                //initializedChain = new ConversationalRetrievalQAChain({prompt:static_prompt,memory:config.memory});
                
                return new ConversationalRetrievalQAChain()
            case "LLMChain":
                const chain_prop : LLMChainInput ={
                    llm: this.config.model ,
                    prompt: this.config.prompt_template,
                }
                return new LLMChain(chain_prop);
      
            case "MapReduceDocumentsChain":
                return new MapReduceDocumentsChain();
                break;
            case "RefineDocumentsChain":
                return new RefineDocumentsChain();
                break;
            case "RetrievalQAChain":
                return new RetrievalQAChain();
                break;
            case "StuffDocumentsChain":
                return new StuffDocumentsChain();
                break;
                */
                case "ConversationChain":
                 const ConversationChain_prop : LLMChainInput ={
                        llm: this.config.model ,
                        prompt: this.config.prompt_template,}
                    return new ConversationChain(ConversationChain_prop)
                default:
                        const LLM_prop : LLMChainInput = {
                           llm: this.config.model ,
                           prompt: this.config.prompt_template,}
                       return new LLMChain(LLM_prop);
    }
    }
    async  call_chain(user_input: string){
        return await this.chain.call({input: user_input})
    }
    async load_memory(){
        await this.config.memory.loadMemoryVariables({});
    }
}