import { Body, Controller, Patch, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtGuard } from "guards/jwt.guard";
import { GetUser } from "decorators/get-user.decorator";
import { UserDTO } from "./dto/user.dto";
import { ApiTags } from "@nestjs/swagger";
import { UserProfileDTO } from "./dto/user-profile.dto";

@ApiTags("user-apis")
@UseGuards(JwtGuard)
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  // @HttpCode(204)
  updateProfile(@Body() userProfile: UserProfileDTO, @GetUser() user: UserDTO) {
    return this.userService.updateUserProfile(userProfile, user);
  }
}
