import { DataSource } from "typeorm";
import { Comments } from "./entities/comments";
import { Groups } from "./entities/groups";
import { Post } from "./entities/posts";
import { User } from "./entities/users";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "toor",
  database: "typeormsample",
  synchronize: true,
  logging: false,
  entities: [Post, User, Comments, Groups],
  subscribers: [],
  migrations: [],
});
