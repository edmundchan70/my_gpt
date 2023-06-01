import { Injectable, UnauthorizedException } from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from 'passport-local'
import { AuthService } from "./auth.service";
@Injectable()
export class localStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super();
    }
    async validate(userName:string , password: string){
        const user = userName && password 
        console.log(userName ,password)
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}