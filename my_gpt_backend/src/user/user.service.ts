import {  Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { doc_query_service } from "src/doc_query/doc_query.service";
import { PrismaService } from "src/prisma/prisma.service";
import { detail_user_info } from "./DTO/detail_user_info.dto";

@Injectable()
export class user_service{
    constructor(
        private prisma : PrismaService,
        private authService  : AuthService
    ){}
    async  get_user_info(token : string) : Promise<detail_user_info> {
        const {sub,email}  = await this.authService.decode_user_from_token(token);
        const {firstName,lastName} = await this.prisma.user.findUnique({
            where:{
                id:sub
            }
        })
        return {
            firstName: firstName,
            lastName: lastName,
            email: email
        }
    }
}