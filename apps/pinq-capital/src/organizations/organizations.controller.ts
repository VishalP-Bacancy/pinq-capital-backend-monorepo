import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { ApiTags } from "@nestjs/swagger";
import { UserDataDTO } from "./dto/user-data.dto";
// import { Roles } from "../decorators/roles.decorator";
// import { Role } from "../user/user.constants";
// import { RolesGuard } from "../guards/roles.guard";

@ApiTags("org-apis")
// @UseGuards(RolesGuard)
@Controller("org")
export class OrganizationsController {
  constructor(
    // @Inject(forwardRef(() => UserService))  //to resolve circular dependency

    private readonly userService: UserService,
  ) {}

  @Post("users")
  // @Roles(Role.ADMIN)
  async createUserByOrg(@Body() user: UserDataDTO) {
    return this.userService.createUserByAdmin(user);
  }
}
