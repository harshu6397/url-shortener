import { HttpException, HttpStatus } from '@nestjs/common';
import { ENV } from '../../constants/appConstants.json';

export default () => {
  let envConfig = {};
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    envConfig = require(`./${process.env.NODE_ENV || ENV.DEVELOPMENT}.config`).default;
  } catch (e) {
    throw new HttpException(e, HttpStatus.BAD_REQUEST);
  }
  return envConfig;
};
