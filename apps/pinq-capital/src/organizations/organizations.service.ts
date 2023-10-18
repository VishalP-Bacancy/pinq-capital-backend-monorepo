import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Organization } from "./entity/organizatons.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly orgRepo: Repository<Organization>,
  ) {}

  async findById(id: number): Promise<Organization> {
    return this.orgRepo.findOne({ where: { id } });
  }
}
