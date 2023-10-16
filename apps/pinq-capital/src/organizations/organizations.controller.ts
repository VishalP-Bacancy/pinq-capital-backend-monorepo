import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'user/user.service';
import { ApiTags } from '@nestjs/swagger';
import { UserDataDTO } from './dto/user-data.dto';

@ApiTags('org-apis')
@Controller('org')
export class OrganizationsController {
  constructor(
    // @Inject(forwardRef(() => UserService))  //to resolve circular dependency

    private readonly userService: UserService,
  ) {}

  @Post('users')
  async createUserByOrg(@Body() user: UserDataDTO) {
    return this.userService.createUserByAdmin(user);
  }
}
