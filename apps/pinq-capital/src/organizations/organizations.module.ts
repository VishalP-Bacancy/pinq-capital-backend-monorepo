import { Module, forwardRef } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entity/organizatons.entity';
import { UserModule } from 'user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule), //for resolving circular dependency
    TypeOrmModule.forFeature([Organization]),
  ],
  providers: [OrganizationsService],
  controllers: [OrganizationsController],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
