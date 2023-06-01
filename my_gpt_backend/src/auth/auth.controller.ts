import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(){}
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Body() body: any){
        return {}
    }
}
