import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comments } from "./comments";
import { User } from "./users";
import { TimeStamp } from "./utils";

@Entity({ name: "posts" })
export class Post extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column("text")
  content: string;

  @Column({
    default: true,
  })
  is_published: boolean;

  @Column({
    default: 0,
    type: "int",
  })
  views: number;

  /** Relationships */
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => Comments, (comment) => comment.post)
  comments: Comments[];
}
