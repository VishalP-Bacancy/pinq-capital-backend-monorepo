import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { UserRole } from "./user-role.entity";
import { Status, DEFAULT_STATUS } from "../user.constants"; // Adjust the path as needed
import { Organization } from "../../organizations/entity/organizatons.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Organization, (organization) => organization.ownerId)
  @JoinColumn({ name: "orgId" })
  organization!: Organization;

  @Column({ type: "varchar", length: 50, default: null })
  email: string;

  @Column({ type: "varchar", length: 25, default: null })
  firstName: string;

  @Column({ type: "varchar", length: 25, default: null })
  lastName: string;

  @Column({ type: "varchar", nullable: true })
  password: string;

  @Column({ nullable: true, default: null })
  googleId: string;

  @Column({ type: "smallint", default: DEFAULT_STATUS })
  status: Status;

  @Column({ nullable: true })
  googleAuth: string;

  @Column({ nullable: true })
  authToken: string;

  @Column({ nullable: true, default: null })
  fax: string;

  @Column({ nullable: true, default: null })
  mobilePhone: string;

  @Column({ nullable: true, default: null })
  name: string;

  @Column({ nullable: true, default: null })
  office: string;

  @Column({ nullable: true, default: null })
  passRingCentral: string;

  //user role's relation
  @OneToOne(() => UserRole)
  @JoinColumn({ name: "role" })
  role: string;

  @Column({ nullable: true })
  salesTeam: string;

  @Column({ nullable: true, default: null })
  sfUserId: string;

  @Column({ nullable: true, default: null })
  title: string;

  @Column({ nullable: true })
  usePassRingCentral: string;

  @Column({ nullable: true, default: null })
  webhooks: string;

  @Column({ nullable: true })
  workPhone: string;

  @Column({ nullable: true, default: null })
  onRotation: string;

  @Column({ nullable: true, default: null })
  nextOnRotation: string;

  @Column({ type: "smallint", default: 0 })
  isDeleted: number; // Use 'number' as the type since 'smallint' maps to a JavaScript number

  @CreateDateColumn({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  lastLoginAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date;
}
