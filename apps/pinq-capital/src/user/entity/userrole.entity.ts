import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from "typeorm";
// eslint-disable-next-line prettier/prettier
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() //use enums here
  name: string;

  @Column("simple-array")
  access: string[]; // Consider adding a relation if needed using decorators like @ManyToOne, @OneToMany, etc.

  @Column({ type: "uuid", default: null })
  uuid: UUID;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date;
}
