import { router, publicProcedure } from "../trpc";
import { z } from "zod";

// Simple in-memory database
let posts = [
  { id: 1, title: "First Post", content: "Hello, world!" },
  { id: 2, title: "Second Post", content: "TRPC is awesome!" },
];

export const postRouter = router({
  // Get all posts
  getAll: publicProcedure.query(() => {
    return posts;
  }),

  // Get a single post by ID
  getById: publicProcedure.input(z.number()).query(({ input }) => {
    const post = posts.find((p) => p.id === input);
    if (!post) throw new Error("Post not found");
    return post;
  }),

  // Create a new post
  create: publicProcedure.input(z.object({ title: z.string(), content: z.string() })).mutation(({ input }) => {
    const newPost = { id: posts.length + 1, ...input };
    posts.push(newPost);
    return newPost;
  }),

  // Update an existing post
  update: publicProcedure.input(z.object({ id: z.number(), title: z.string(), content: z.string() })).mutation(({ input }) => {
    const index = posts.findIndex((p) => p.id === input.id);
    if (index === -1) throw new Error("Post not found");
    posts[index] = { ...posts[index], ...input };
    return posts[index];
  }),

  // Delete a post
  delete: publicProcedure.input(z.number()).mutation(({ input }) => {
    const index = posts.findIndex((p) => p.id === input);
    if (index === -1) throw new Error("Post not found");
    const deletedPost = posts[index];
    posts = posts.filter((p) => p.id !== input);
    return deletedPost;
  }),
});
