import { defaultFacebookConfig, FACEBOOK_CONFIG_TOKEN } from '../configs/facebook.config';
import { defaultJwtConfig, JWT_CONFIG_TOKEN } from '../configs/jwt.config';

export const configs = [
  {
    provide: JWT_CONFIG_TOKEN,
    useValue: defaultJwtConfig,
  },
  {
    provide: FACEBOOK_CONFIG_TOKEN,
    useValue: defaultFacebookConfig,
  },
];
