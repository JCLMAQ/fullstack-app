import { Controller } from '@nestjs/common';
import { AuthsService } from './auths.service';

@Controller('auths')
export class AuthsController {
  constructor(private authsService: AuthsService) {}
}
