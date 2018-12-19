import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Logger, Post, Req } from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import {  OutAccountDto } from '../../role/dto/out-account.dto';
import { plainToClass } from 'class-transformer';
import { JsonWebTokenError } from 'jsonwebtoken';
import { FacebookSignInDto } from '../dto/facebook-signIn.dto';
import { FacebookTokenDto } from '../dto/facebook-token.dto';
import { RedirectUriDto } from '../dto/redirect-uri.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { TokenDto } from '../dto/token.dto';
import { UserTokenDto } from '../dto/user-token.dto';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { CORE_CONFIG_TOKEN, ICoreConfig } from '../../core';

@ApiUseTags('auth')
@Controller('/api/auth')
export class AuthController {
  constructor(
    @Inject(CORE_CONFIG_TOKEN) private readonly coreConfig: ICoreConfig,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserTokenDto,
    description: 'API View that checks the veracity of a token, returning the token if it is valid.',
  })
  async requestJsonWebTokenAfterSignIn(@Req() req, @Body() signInDto: SignInDto): Promise<UserTokenDto> {
    const token = await this.tokenService.create(req.user);
    return plainToClass(UserTokenDto, { user: req.user, token });
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserTokenDto,
    description: `API View that receives a POST with a user's username and password.
        Returns a JSON Web Token that can be used for authenticated requests.`,
  })
  async requestJsonWebTokenAfterSignUp(@Req() req, @Body() signUpDto: SignUpDto): Promise<UserTokenDto> {
    const token = await this.tokenService.create(req.user);
    return plainToClass(UserTokenDto, { user: req.user, token });
  }

  @HttpCode(HttpStatus.OK)
  @Post('info')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserTokenDto,
    description: 'API View that checks the veracity of a token, returning the token if it is valid.',
  })
  async requestJsonWebTokenAfterInfo(@Req() req, @Body() tokenDto: TokenDto): Promise<OutAccountDto> {
    try {
      const validateTokenResult = await this.tokenService.validate(tokenDto.token);
      if (validateTokenResult) {
        const jwtPayload: IJwtPayload = await this.tokenService.decode(tokenDto.token);
        const { user } = await this.authService.info({ id: jwtPayload.id });
        return plainToClass(OutAccountDto, { user });
      } else {
        throw new JsonWebTokenError('invalid token');
      }
    } catch (error) {
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'facebook/uri',
  })
  @Get('facebook/uri')
  async requestFacebookRedirectUrl(@Req() req): Promise<RedirectUriDto> {
    Logger.log(req.get('origin'), AuthController.name + ':requestFacebookRedirectUrl#origin');
    return this.authService.requestFacebookRedirectUri(
      req.get('origin') || this.coreConfig.protocol + '://' + req.get('host'),
    );
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'facebook/signin',
  })
  @Post('facebook/signin')
  async facebookSignIn(@Req() req, @Body() facebookSignInDto: FacebookSignInDto): Promise<UserTokenDto> {
    Logger.log(req.get('origin'), AuthController.name + ':facebookSignIn#origin');
    return this.authService.facebookSignIn(
      facebookSignInDto.code,
      req.get('origin') || this.coreConfig.protocol + '://' + req.get('host'),
    );
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'facebook/token',
  })
  @Post('facebook/token')
  async requestJsonWebTokenAfterFacebookSignIn(
    @Req() req,
    @Body() facebookTokenDto: FacebookTokenDto,
  ): Promise<UserTokenDto> {
    const token = await this.tokenService.create(req.user);
    return plainToClass(UserTokenDto, { user: req.user, token });
  }
}
