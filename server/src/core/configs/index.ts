import { CORE_CONFIG_TOKEN, defaultCoreConfig } from './core.config';

export const configs = [
  {
    provide: CORE_CONFIG_TOKEN,
    useValue: defaultCoreConfig,
  },
];
