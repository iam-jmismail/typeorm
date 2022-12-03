import { Router } from "express";
import { AppDataSource } from "./db";
import { Comments } from "./entities/comments";
import { Post } from "./entities/posts";
import { User } from "./entities/users";

const router = Router();

/** Create a new Post */
router.post("/users/create", async (req, res, next) => {
  try {
    const { first_name, last_name } = req.body;

    const user = new User();
    user.first_name = first_name;
    user.last_name = last_name;

    await AppDataSource.manager.save(user);

    return res.status(200).send({ message: "User Added", results: [] });
  } catch (error) {
    next(error);
  }
});

/** Create a new Post */
router.post("/posts/create", async (req, res, next) => {
  try {
    const { title, content, user_id } = req.body;

    // Find User
    const user = await User.findOne({ where: { id: Number(user_id) } });
    if (!user) throw new Error("User not found");

    const post = new Post();
    post.title = title;
    post.content = content;
    post.user = user;

    await AppDataSource.manager.save(post);

    return res.status(200).send({ message: "Post Added", results: [] });
  } catch (error) {
    next(error);
  }
});

/** Lists posts by userId */
router.get("/posts/:user_id", async (req, res, next) => {
  const { user_id } = req.params;
  try {
    // Find User
    const user = await User.findOne({
      where: {
        id: Number(user_id),
      },
    });
    if (!user) throw new Error("User not found");

    // Find Records using Foreign Keys Field
    const posts = await Post.find({
      where: {
        user: {
          id: 1,
          first_name: "Mohamed",
        },
      },
    });

    return res.status(200).send({ message: "Fetch Success 1", results: posts });
  } catch (error) {
    next(error);
  }
});

/** Lists all users */
router.get("/users/", async (req, res, next) => {
  try {
    // Find User
    const users = await User.find({
      where: {
        is_activated: true,
        is_deleted: false,
      },
      relations: {
        posts: true, // Show all posts
      },
      skip: 0, // Skip Records
      take: 2, // Limit Records
      order: {
        created_at: "DESC", // List by DESC Order
      },
    });
    if (!users) throw new Error("User not found");

    return res.status(200).send({ message: "Fetch Success", results: users });
  } catch (error) {
    next(error);
  }
});

/** Create Comments */
router.post("/comments/:post_id", async (req, res, next) => {
  const { post_id } = req.params;
  const { title, comment } = req.body;
  try {
    // Find Post
    const post: Post | null = await Post.findOne({
      where: {
        is_deleted: false,
        id: Number(post_id),
      },
    });

    if (!post) throw new Error("Post not found");
    if (!post.is_published) throw new Error("Post is not yet published");

    // Create Comment
    const comments = new Comments();

    comments.title = title;
    comments.comment = comment;
    comments.post = post;

    await AppDataSource.manager.save(comments);

    return res.status(200).send({ message: "Commented Successfully" });
  } catch (error) {
    next(error);
  }
});

/** List Comments by PostId  */
router.get("/comments/:post_id", async (req, res, next) => {
  const { post_id } = req.params;
  try {
    // Find Post
    const post: Post | null = await Post.findOne({
      where: {
        is_deleted: false,
        id: Number(post_id),
      },
    });

    if (!post) throw new Error("Post not found");
    // if (!post.is_published) throw new Error("Post is not yet published");

    // List Comments using Query Builder
    const comments: Comments[] = await Comments.createQueryBuilder("comment")
      .where("comment.post = :id", { id: post.id })
      .getMany();

    return res
      .status(200)
      .send({ message: "Commented Successfully", results: comments });
  } catch (error) {
    next(error);
  }
});

export default router;
