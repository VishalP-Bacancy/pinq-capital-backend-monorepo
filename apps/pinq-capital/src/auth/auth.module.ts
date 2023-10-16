import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'strategy/jwt.strategy';
import { PasswordService } from './util/password.service';

@Module({
  imports: [UserModule, OrganizationsModule, JwtModule.register({})],
  providers: [AuthService, UserService, JwtStrategy, PasswordService],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
