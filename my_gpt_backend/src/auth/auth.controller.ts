import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './DTO';
import { Tokens } from './types';
 
@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}
 

    @Post('local/signup')
    signupLocal(@Body() Body: AuthDto) : Promise<Tokens>{
        return this.authService.signupLocal(Body);
    }
    @Post('local/signIn')
    signInLocal(@Body() Body : AuthDto) : Promise<Tokens>{
       return this.authService.signInLocal(Body);
    }
    @Post('logout')
    logOut(){
        return this.authService.logOut()
    }
    @Post('refresh')
    refreshTokens(){
        return this.authService.refreshTokens()
    }
}
