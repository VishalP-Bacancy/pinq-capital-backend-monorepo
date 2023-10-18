import { AuthGuard } from "@nestjs/passport"
export class JwtGuard extends AuthGuard("jwt") {
  constructor() {
    console.log("Jwt Guard called!");
    super();
  }
}