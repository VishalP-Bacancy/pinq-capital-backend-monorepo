import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { UserService } from "../user/user.service";
import { OrganizationsService } from "../organizations/organizations.service";
import { ApiResponse, successResponse } from "response-format/response";
import { PasswordService } from "./util/password.service";
import { SigninDto } from "./dto/signin.dto";
// import { SigninDto } from './dto/normal-signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly organizationService: OrganizationsService,
    private readonly passwordService: PasswordService,
  ) {}

  async normalSignin(
    email: string,
    password: string,
  ): Promise<ApiResponse<SigninDto>> {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new HttpException("User not found!", HttpStatus.UNAUTHORIZED);
    }

    if (!user.password) {
      const hashedPassword = await this.passwordService.hashPassword(password);
      user.password = hashedPassword;
      await this.userService.saveUser(user);
    } else {
      const isValid = await this.passwordService.comparePassword(
        password,
        user.password,
      );

      if (!isValid) {
        throw new HttpException(
          `The password doesn't match.`,
          HttpStatus.UNAUTHORIZED,
        );
      }
    }

    const token = await this.userService.signToken(user.id, user.email);
    user.authToken = token;
    await this.userService.saveUser(user);
    return successResponse("Normal Signin with email and password successful", {
      message: "Redirect to Dashboard",
      authToken: token,
    });
  }

  async socialMediaSignIn(
    provider: string,
    email: string,
    name: string,
    accessToken: string,
  ): Promise<ApiResponse<SigninDto>> {
    if (provider === "google") {
      if (!email || !accessToken) {
        throw new HttpException(
          "Email or accessToken not provided!",
          HttpStatus.BAD_REQUEST,
        );
      }
      const user = await this.userService.findUserByEmail(email);

      if (!user) {
        throw new HttpException("User not found!", HttpStatus.UNAUTHORIZED);
      }

      if (!user.googleAuth) {
        const token = await this.userService.signToken(user.id, user.email);
        user.googleAuth = accessToken;
        user.name = name;
        user.authToken = token;
        await this.userService.saveUser(user);
        return successResponse("Access token Saved to Database", {
          message: "Redirect to Dashboard",
          authToken: token,
        });
      }

      const token = await this.userService.signToken(user.id, user.email);
      user.authToken = token;
      await this.userService.saveUser(user);
      return successResponse("Access token found", {
        message: "Redirect to Dashboard",
        authToken: token,
      });
    }
  }
}
