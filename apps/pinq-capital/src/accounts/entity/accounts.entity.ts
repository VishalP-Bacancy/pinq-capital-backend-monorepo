import { Opportunities } from "../../opportunities/entity/opportunities.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Accounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  dba: string;

  @Column({ nullable: true })
  corporateStructure: string;

  @Column({ nullable: true })
  startDate: string;

  @Column({ nullable: true })
  taxId: string;

  @Column({ nullable: true })
  leadSource: string;

  @Column({ nullable: true })
  natureOfBusiness: string;

  @Column({ nullable: true })
  natureOfBusinessOther: string;

  @Column({ nullable: true })
  country: string;

  @OneToMany(() => Opportunities, (opportunity) => opportunity.account)
  opportunities: Opportunities[];

  // @ManyToMany(() => AccountType) // Define the many-to-many relationship
  // @JoinTable()
  // accountTypes: AccountType[]; // This property will allow you to access related AccountTypes
}
