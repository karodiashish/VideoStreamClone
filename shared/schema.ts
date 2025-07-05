import { z } from "zod";

// Video schema
export const videoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  videoUrl: z.string(),
  duration: z.string(),
  views: z.number(),
  uploadDate: z.string(),
  channelId: z.string(),
  likes: z.number(),
  dislikes: z.number(),
  tags: z.array(z.string()),
});

// Channel schema
export const channelSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string(),
  subscribers: z.number(),
  verified: z.boolean(),
  description: z.string(),
});

// Comment schema
export const commentSchema = z.object({
  id: z.string(),
  videoId: z.string(),
  userId: z.string(),
  content: z.string(),
  likes: z.number(),
  timestamp: z.string(),
  replies: z.array(z.string()).optional(),
});

// User schema
export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  avatar: z.string(),
  subscribedChannels: z.array(z.string()),
});

// Search query schema
export const searchQuerySchema = z.object({
  query: z.string(),
  category: z.string().optional(),
});

// Types
export type Video = z.infer<typeof videoSchema>;
export type Channel = z.infer<typeof channelSchema>;
export type Comment = z.infer<typeof commentSchema>;
export type User = z.infer<typeof userSchema>;
export type SearchQuery = z.infer<typeof searchQuerySchema>;
