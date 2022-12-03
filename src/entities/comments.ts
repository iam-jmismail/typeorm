import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./posts";
import { TimeStamp } from "./utils";

@Entity({ name: "comments" })
export class Comments extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  comment: string;

  @Column()
  title: string;

  @Column({
    default: false,
  })
  is_banned: boolean;

  /** Relationships */
  @ManyToOne(() => Post, (post) => post.user)
  post: Post;
}
