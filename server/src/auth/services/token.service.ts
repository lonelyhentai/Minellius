import { Inject, Injectable } from '@nestjs/common';
import { decode, sign, verify } from 'jsonwebtoken';
import { JWT_CONFIG_TOKEN } from '../configs/jwt.config';
import { IJwtConfig } from '../interfaces/jwt-config.interface';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from '../../role/entities';

@Injectable()
export class TokenService {
  constructor(@Inject(JWT_CONFIG_TOKEN) private readonly jwtConfig: IJwtConfig) {
  }

  create(user: User) {
    return sign(
      {
        id: user.id,
        username: user.username,
        isStaff: user.isStaff,
        isActive: user.isActive,
        isSuperuser: user.isSuperuser,
        groups: user.groups.map(group => {
          return { name: group.name };
        }),
      },
      this.createSecretKey(user),
      {
        expiresIn: this.jwtConfig.expirationDelta,
      },
    );
  }

  validate(token: string) {
    const data: any = this.decode(token);
    return verify(this.removeHeaderPrefix(token), this.createSecretKey(data));
  }

  decode(token: string) {
    return decode(this.removeHeaderPrefix(token)) as IJwtPayload;
  }

  removeHeaderPrefix(token: string) {
    return this.jwtConfig.authHeaderPrefix && token && token.split(this.jwtConfig.authHeaderPrefix + ' ').length > 1
      ? token.split(this.jwtConfig.authHeaderPrefix + ' ')[1]
      : token;
  }

  addHeaderPrefix(token: string): string {
    return this.jwtConfig.authHeaderPrefix + ' ' + token;
  }

  extractTokenFromRequest(request) {
    const authorizationHeader = request.headers.authorization ? String(request.headers.authorization) : null;
    const token = this.removeHeaderPrefix(authorizationHeader);
    return token;
  }

  createSecretKey(user: User) {
    return (
      this.jwtConfig.secretKey +
      (user
        ? '$' +
        user.id +
        '$' +
        user.username +
        '$' +
        user.isStaff +
        '$' +
        user.isActive +
        '$' +
        user.isSuperuser +
        (user.groups ? user.groups.map(group => '$' + group.name) : '')
        : '')
    );
  }
}
