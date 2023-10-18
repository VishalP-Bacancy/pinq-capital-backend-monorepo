import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Status, DEFAULT_STATUS } from "../organizations.constants"; // Adjust the path as needed
import { User } from "../../user/entity/user.entity";

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ type: "smallint", default: DEFAULT_STATUS })
  isActive: Status;

  @Column({ length: 100 })
  typeOfBusiness: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  zipCode: string;

  @Column()
  employees: string;

  @OneToMany(() => User, (user) => user.organization)
  ownerId: User[];
}
