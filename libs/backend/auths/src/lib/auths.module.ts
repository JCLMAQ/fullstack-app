import { Module, Global } from '@nestjs/common';
import { AuthsController } from './auths.controller';
import { AuthsService } from './auths.service';

@Global()
@Module({
  controllers: [AuthsController],
  providers: [AuthsService],
  exports: [AuthsService],
})
export class AuthsModule {}
