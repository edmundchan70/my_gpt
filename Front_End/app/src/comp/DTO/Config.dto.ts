import { OpenAI } from "langchain/llms/openai"
import { BufferMemory, ConversationSummaryMemory } from "langchain/memory";
import { ConversationalRetrievalQAChain, LLMChain, MapReduceDocumentsChain, RefineDocumentsChain, RetrievalQAChain, StuffDocumentsChain } from "langchain/chains";
export  type Config = {
    temperature: number,

    prompt_template: string,
    resp_parser: string | null,
    memory_method: string,
    chain_type: string,
    model: OpenAI,

    memory: BufferMemory | ConversationSummaryMemory,

  }