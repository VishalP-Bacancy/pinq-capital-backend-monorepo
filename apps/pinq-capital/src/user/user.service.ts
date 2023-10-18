import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import { User } from "./entity/user.entity";
import { OrganizationsService } from "../organizations/organizations.service";
import { UserRole } from "./entity/userrole.entity";

import { successResponse } from "../response-format/response"; // Replace with the actual path
import { UserDTO } from "./dto/user.dto";
import { UserProfileDTO } from "./dto/user-profile.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(UserRole)
    private readonly userRoleRepo: Repository<UserRole>,

    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly orgService: OrganizationsService,
  ) {}

  async createUserByAdmin(createUserByAdminDto: any) {
    const org = await this.orgService.findById(1);
    const { roleName, access } = createUserByAdminDto;
    const isUserExist = await this.userRepo.findOne({
      where: { email: createUserByAdminDto.email },
    });

    if (isUserExist) {
      throw new HttpException("User already exist", HttpStatus.BAD_REQUEST);
    }
    const role = await this.userRoleRepo.save({ name: roleName, access });
    const user = await this.userRepo.save(createUserByAdminDto);
    user.role = role;
    user.organization = org;
    const updatedUser = await this.userRepo.save(user);

    return successResponse("User created by admin", {
      user: updatedUser,
    });
  }

  async updateUserProfile(userProfile: UserProfileDTO, user: UserDTO) {
    const { fax, mobilePhone, workPhone, name, office, title } = userProfile;
    const isExistsUser = await this.userRepo.findOne({
      where: { email: user.email },
    });

    if (!isExistsUser) {
      throw new HttpException("User not found.", HttpStatus.UNAUTHORIZED);
    }

    user.fax = fax;
    user.mobilePhone = mobilePhone;
    user.workPhone = workPhone;
    user.name = name;
    user.office = office;
    user.title = title;

    await this.saveUser(user);
    return successResponse("User profile updated", {});
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({ where: { email } });
  }

  async findUserById(userId: number): Promise<UserDTO> {
    return this.userRepo.findOne({ where: { id: userId } });
  }

  async saveUser(userDto: UserDTO) {
    return this.userRepo.save(userDto);
  }

  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      userId: userId,
      email,
    };
    const secret = this.configService.get<string>("JWT_SECRET_KEY");
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: "1h",
      secret: secret,
    });
    return token;
  }
}
