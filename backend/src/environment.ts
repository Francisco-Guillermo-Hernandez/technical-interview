import { env } from 'node:process';

export default () => ({
  port: parseInt(env?.PORT ?? '', 10) || 5050,
 
});
