import { Accounts } from '../../accounts/entity/accounts.entity';
import { Contacts } from '../../contacts/entity/contacts.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Opportunities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  purposeOfFunding: string;

  @Column({ nullable: true })
  bankAccountType: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  parentOpportunity: string;

  @Column({ nullable: true })
  requestedAmount: string;

  @Column({ nullable: true })
  requestedTerm: string;

  @Column({ nullable: true })
  monthlyRevenue: string;

  @Column({ nullable: true })
  annualRevenue: string;

  @Column({ nullable: true })
  existingAdvanceTotal: string;

  @Column({ nullable: true })
  monthlyCreditCardVolume: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  salesOffice: string;

  @Column({ nullable: true })
  campaign: string;

  @Column({ nullable: true })
  campaignVariation: string;

  @Column({ nullable: true })
  campaignRecordId: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  juniorId: string;

  @Column({ nullable: true })
  openerId: string;

  @Column({ nullable: true })
  ownerId: string;

  @Column({ nullable: true })
  closerId: string;

  @Column({ nullable: true })
  dataEntryAgentId: string;

  @Column({ nullable: true })
  urgency: string;

  @Column({ nullable: true })
  followUpDate: string;

  @Column({ nullable: true })
  followUpTime: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Contacts, (contact) => contact.opportunities)
  @JoinColumn({ name: 'contactId' })
  contact: Contacts;

  @ManyToOne(() => Accounts, (account) => account.opportunities)
  @JoinColumn({ name: 'accountId' })
  account: Accounts;
}
