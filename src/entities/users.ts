import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Groups } from "./groups";
import { Post } from "./posts";
import { TimeStamp } from "./utils";

@Entity({ name: "users" })
export class User extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    default: true,
  })
  is_activated: boolean;

  /** Relationships */
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @ManyToMany(() => Groups)
  @JoinTable({
    name: "users_groups_map",
  })
  groups: Groups[];
}
