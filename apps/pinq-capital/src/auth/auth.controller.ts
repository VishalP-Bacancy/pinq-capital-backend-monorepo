import { Controller, Body, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { googleAuthResponseDto } from './dto/googleAuth.dto';
import { SigninDto } from './dto/signin.dto';
import { ApiResponse } from 'response-format/response';
// import { Throttle } from '@nestjs/throttler';

@ApiTags('auth-apis')
// @Throttle({ default: { limit: 1, ttl: 5000 } })
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('users')
  @HttpCode(200)
  signin(
    @Body() googleAuthResponse: googleAuthResponseDto,
  ): Promise<ApiResponse<SigninDto>> {
    const { provider, accessToken, email, name, password } = googleAuthResponse;

    if (password) {
      return this.authService.normalSignin(email, password);
    }
    return this.authService.socialMediaSignIn(
      provider,
      email,
      name,
      accessToken,
    );
  }
}
