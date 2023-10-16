import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { User } from './entity/user.entity';
import { OrganizationsService } from 'organizations/organizations.service';
import { UserRole } from './entity/userrole.entity';

import { successResponse } from '../response-format/response'; // Replace with the actual path
import { UserDataDTO } from 'organizations/dto/user-data.dto';

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
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }
    const role = await this.userRoleRepo.save({ name: roleName, access });
    const user = await this.userRepo.save(createUserByAdminDto);
    user.role = role;
    user.organization = org;
    const updatedUser = await this.userRepo.save(user);

    return successResponse('User created by admin', {
      user: updatedUser,
    });
  }

  async userSignup(userDto: User) {
    const user = await this.userRepo.save(userDto);

    const token = await this.signToken(user.id, user.email);

    return successResponse('User Signup successful', [
      {
        message: 'Redirect to Dashboard',
        authToken: token,
      },
    ]);
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({ where: { email } });
  }

  async findUserById(userId: number): Promise<User> {
    return this.userRepo.findOne({ where: { id: userId } });
  }

  async saveUser(userDto: any) {
    return this.userRepo.save(userDto);
  }

  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      userId: userId,
      email,
    };
    const secret = this.configService.get<string>('JWT_SECRET_KEY');
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: secret,
    });
    return token;
  }
}
