import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProvider {
  abstract hashPassword(pass: string | Buffer): Promise<string>;

  abstract comparePassword(
    pass: string | Buffer,
    encrypted: string,
  ): Promise<boolean>;
}
