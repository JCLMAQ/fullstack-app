
import { Role } from "@prisma/client";
import { AuthDto } from "./auth.dto";


export class LoginAuthDto extends (AuthDto) {

}

export class LoginResponse {
  access_token: string | undefined;
  fullName: string | undefined;
  roles: Role[] | undefined;
}
