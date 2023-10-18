import { Module, forwardRef } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { User } from "./entity/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrganizationsModule } from "../organizations/organizations.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../strategy/jwt.strategy";
import { UserRole } from "./entity/userrole.entity";

@Module({
  imports: [
    JwtModule.register({}),
    forwardRef(() => OrganizationsModule), //Because of circular dependency  user => org,  org => user
    TypeOrmModule.forFeature([User, UserRole]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService, TypeOrmModule, JwtStrategy],
})
export class UserModule {}
