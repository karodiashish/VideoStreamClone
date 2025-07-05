import { Router } from "express";
import { z } from "zod";
import type { IStorage } from "./storage";
import { searchQuerySchema } from "@shared/schema";

export function createRoutes(storage: IStorage) {
  const router = Router();

  // Get all videos
  router.get("/api/videos", async (req, res) => {
    try {
      const videos = await storage.getVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  });

  // Get single video
  router.get("/api/videos/:id", async (req, res) => {
    try {
      const video = await storage.getVideo(req.params.id);
      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }
      res.json(video);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch video" });
    }
  });

  // Search videos
  router.get("/api/search", async (req, res) => {
    try {
      const { query, category } = searchQuerySchema.parse(req.query);
      const videos = await storage.searchVideos(query, category);
      res.json(videos);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid search parameters" });
      }
      res.status(500).json({ error: "Search failed" });
    }
  });

  // Get videos by category
  router.get("/api/categories/:category", async (req, res) => {
    try {
      const videos = await storage.getVideosByCategory(req.params.category);
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch videos by category" });
    }
  });

  // Get all channels
  router.get("/api/channels", async (req, res) => {
    try {
      const channels = await storage.getChannels();
      res.json(channels);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch channels" });
    }
  });

  // Get single channel
  router.get("/api/channels/:id", async (req, res) => {
    try {
      const channel = await storage.getChannel(req.params.id);
      if (!channel) {
        return res.status(404).json({ error: "Channel not found" });
      }
      res.json(channel);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch channel" });
    }
  });

  // Get comments for a video
  router.get("/api/videos/:id/comments", async (req, res) => {
    try {
      const comments = await storage.getComments(req.params.id);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  });

  // Add comment to video
  router.post("/api/videos/:id/comments", async (req, res) => {
    try {
      const { content, userId } = req.body;
      if (!content || !userId) {
        return res.status(400).json({ error: "Content and userId are required" });
      }

      const comment = await storage.addComment({
        videoId: req.params.id,
        userId,
        content,
        likes: 0,
        timestamp: new Date().toISOString()
      });

      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: "Failed to add comment" });
    }
  });

  // Get user profile
  router.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  // Update user profile
  router.patch("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  return router;
}
