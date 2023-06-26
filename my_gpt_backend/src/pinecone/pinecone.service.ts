import { Injectable } from "@nestjs/common";
import { PineconeClient } from "@pinecone-database/pinecone";
 
@Injectable()
export class pineconeService  {
    private pinecone_client : PineconeClient;
    constructor(){
       this.pinecone_client = new PineconeClient();
    }
    
    async setUp(){
      await  this.pinecone_client.init({
            environment:process.env.pinecone_env,
            apiKey:process.env.pinecone_api_key
        })
    }
    async check_index_exist(index_name:string){
        const exist_list = await this.pinecone_client.listIndexes();
        return exist_list.includes(index_name)    
    }
    async create_index(index_name:string){
        await this.setUp()
        await this.pinecone_client.createIndex({
            createRequest:{
                name:index_name,
                dimension:512
            }
        })
    }
}

