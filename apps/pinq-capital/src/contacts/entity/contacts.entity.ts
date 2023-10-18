import { Opportunities } from '../../opportunities/entity/opportunities.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Contacts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  workPhone: string;

  @Column({ nullable: true })
  mobilePhone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  ownership: string;

  @Column({ nullable: true })
  birthDate: string;

  @Column({ nullable: true })
  socialSecurityNumber: string;

  @Column({ nullable: true })
  creditScore: string;

  @Column({ nullable: true })
  preferred_contact_method: string;

  @Column({ nullable: true })
  preferred_contact_time: string;

  @Column({ nullable: true })
  preferred_contact_timeZone: string;

  @OneToMany(() => Opportunities, (opportunity) => opportunity.contact)
  opportunities: Opportunities[];
}
