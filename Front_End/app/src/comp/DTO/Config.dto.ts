import { OpenAI } from "langchain/llms/openai"
import { BufferMemory, ConversationSummaryMemory } from "langchain/memory";
import { ConversationalRetrievalQAChain, LLMChain, MapReduceDocumentsChain, RefineDocumentsChain, RetrievalQAChain, StuffDocumentsChain } from "langchain/chains";
import { BasePromptTemplate } from "langchain/prompts";
import { BaseLanguageModel } from "langchain/dist/base_language";
export  type Config = {
    temperature: number,
    prompt_template: BasePromptTemplate,
    resp_parser: string ,
    chain_type: string,
    model: BaseLanguageModel,
    memory: BufferMemory | ConversationSummaryMemory,
  }