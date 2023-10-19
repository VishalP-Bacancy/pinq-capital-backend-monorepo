import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { OrganizationsModule } from "./organizations/organizations.module";
import { AuthModule } from "./auth/auth.module";
import { UserService } from "./user/user.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./guards/roles.guard";
// import { GoogleAuthModule } from 'google-auth/google-auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 10000, //milliseconds  --> 10sec
        limit: 5,
      },
    ]),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get<string>("MYSQL_HOST"),
        port: parseInt(configService.get<string>("MYSQL_PORT")),
        username: configService.get<string>("MYSQL_USER"),
        password: configService.get<string>("MYSQL_PASSWORD"),
        database: configService.get<string>("MYSQL_DB"),
        entities: [__dirname + "**/*/*/*.entity{.ts,.js}"],
        synchronize: true,
        logging: false,
        migrationsTableName: "migrations",
        migrations: [__dirname + "/../../migrations/*.js"],
        cli: {
          migrationsDir: "/migrations", // Updated path
        },
      }),
    }),
    UserModule,
    OrganizationsModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    RolesGuard,
  ],
})
export class AppModule {}
