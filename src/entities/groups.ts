import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./posts";
import { User } from "./users";
import { TimeStamp } from "./utils";

@Entity({ name: "groups" })
export class Groups extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({
    default: false,
  })
  is_banned: boolean;

  /** Relationships */
  @ManyToMany(() => User, (user) => user.groups)
  users: User[];
}
