import type { Video, Channel, Comment, User } from "@shared/schema";

export interface IStorage {
  // Videos
  getVideos(): Promise<Video[]>;
  getVideo(id: string): Promise<Video | null>;
  searchVideos(query: string, category?: string): Promise<Video[]>;
  getVideosByCategory(category: string): Promise<Video[]>;
  
  // Channels
  getChannels(): Promise<Channel[]>;
  getChannel(id: string): Promise<Channel | null>;
  
  // Comments
  getComments(videoId: string): Promise<Comment[]>;
  addComment(comment: Omit<Comment, 'id'>): Promise<Comment>;
  
  // Users
  getUser(id: string): Promise<User | null>;
  updateUser(id: string, user: Partial<User>): Promise<User>;
}

export class MemStorage implements IStorage {
  private videos: Video[] = [];
  private channels: Channel[] = [];
  private comments: Comment[] = [];
  private users: User[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize with mock data
    this.channels = [
      {
        id: "1",
        name: "Tech Reviews",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
        subscribers: 2300000,
        verified: true,
        description: "Latest tech reviews and unboxings"
      },
      {
        id: "2",
        name: "Cooking Master",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
        subscribers: 1800000,
        verified: true,
        description: "Professional cooking tutorials and recipes"
      },
      {
        id: "3",
        name: "Travel Vlogs",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
        subscribers: 956000,
        verified: false,
        description: "Adventure travel and hiking experiences"
      },
      {
        id: "4",
        name: "Music Studio",
        avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
        subscribers: 3200000,
        verified: true,
        description: "Original music and live performances"
      },
      {
        id: "5",
        name: "Gaming Pro",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
        subscribers: 1500000,
        verified: true,
        description: "Gaming content and live streams"
      },
      {
        id: "6",
        name: "Science Channel",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
        subscribers: 2100000,
        verified: true,
        description: "Educational science content"
      }
    ];

    this.videos = [
      {
        id: "1",
        title: "Ultimate Tech Setup Tour 2024 - My Dream Workspace",
        description: "Welcome to my ultimate tech setup tour! In this video, I'll show you my complete workspace setup including all the gear I use for content creation...",
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=225",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        duration: "10:32",
        views: 2345678,
        uploadDate: "2 days ago",
        channelId: "1",
        likes: 142000,
        dislikes: 3200,
        tags: ["tech", "setup", "workspace", "review"]
      },
      {
        id: "2",
        title: "Perfect Pasta Recipe - Italian Grandmother's Secret",
        description: "Learn how to make the perfect pasta using my Italian grandmother's secret recipe. This traditional method has been passed down for generations...",
        thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=225",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        duration: "15:43",
        views: 1800000,
        uploadDate: "5 days ago",
        channelId: "2",
        likes: 89000,
        dislikes: 1200,
        tags: ["cooking", "recipe", "pasta", "italian"]
      },
      {
        id: "3",
        title: "Solo Hiking the Alps - Epic Mountain Adventure",
        description: "Join me on an incredible solo hiking adventure through the Swiss Alps. Experience breathtaking views and challenging terrain...",
        thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=225",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        duration: "22:15",
        views: 956000,
        uploadDate: "1 week ago",
        channelId: "3",
        likes: 67000,
        dislikes: 890,
        tags: ["travel", "hiking", "adventure", "mountains"]
      },
      {
        id: "4",
        title: "Live Performance - New Song Premiere",
        description: "Exclusive premiere of my new song performed live in the studio. This is a deeply personal piece that I've been working on...",
        thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=225",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        duration: "4:32",
        views: 3200000,
        uploadDate: "3 days ago",
        channelId: "4",
        likes: 245000,
        dislikes: 4300,
        tags: ["music", "live", "premiere", "original"]
      },
      {
        id: "5",
        title: "Epic Gaming Marathon - New Record Attempt",
        description: "Attempting to break the world record in this epic gaming marathon! Join me for this incredible journey...",
        thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=225",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        duration: "1:25:33",
        views: 1500000,
        uploadDate: "4 days ago",
        channelId: "5",
        likes: 123000,
        dislikes: 2800,
        tags: ["gaming", "marathon", "record", "live"]
      },
      {
        id: "6",
        title: "Understanding Black Holes - Science Explained",
        description: "Dive deep into the mysterious world of black holes. Learn about their formation, properties, and what happens when matter falls into them...",
        thumbnail: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=225",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        duration: "18:45",
        views: 2100000,
        uploadDate: "6 days ago",
        channelId: "6",
        likes: 178000,
        dislikes: 5600,
        tags: ["science", "education", "physics", "space"]
      },
      {
        id: "7",
        title: "30-Minute Full Body Workout - No Equipment Needed",
        description: "Get fit with this intensive 30-minute full body workout that requires no equipment. Perfect for home workouts...",
        thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=225",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        duration: "12:18",
        views: 892000,
        uploadDate: "1 week ago",
        channelId: "1",
        likes: 56000,
        dislikes: 1200,
        tags: ["fitness", "workout", "health", "exercise"]
      },
      {
        id: "8",
        title: "Easy DIY Room Decor - 5 Amazing Ideas",
        description: "Transform your room with these 5 easy DIY decor ideas that won't break the bank. Perfect for beginners...",
        thumbnail: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=225",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        duration: "8:27",
        views: 1300000,
        uploadDate: "3 days ago",
        channelId: "2",
        likes: 78000,
        dislikes: 1800,
        tags: ["diy", "decor", "crafts", "home"]
      }
    ];

    this.users = [
      {
        id: "1",
        username: "current_user",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
        subscribedChannels: ["1", "2", "3"]
      }
    ];
  }

  async getVideos(): Promise<Video[]> {
    return this.videos;
  }

  async getVideo(id: string): Promise<Video | null> {
    return this.videos.find(v => v.id === id) || null;
  }

  async searchVideos(query: string, category?: string): Promise<Video[]> {
    const filtered = this.videos.filter(video => 
      video.title.toLowerCase().includes(query.toLowerCase()) ||
      video.description.toLowerCase().includes(query.toLowerCase()) ||
      video.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );

    if (category) {
      return filtered.filter(video => video.tags.includes(category.toLowerCase()));
    }

    return filtered;
  }

  async getVideosByCategory(category: string): Promise<Video[]> {
    return this.videos.filter(video => video.tags.includes(category.toLowerCase()));
  }

  async getChannels(): Promise<Channel[]> {
    return this.channels;
  }

  async getChannel(id: string): Promise<Channel | null> {
    return this.channels.find(c => c.id === id) || null;
  }

  async getComments(videoId: string): Promise<Comment[]> {
    return this.comments.filter(c => c.videoId === videoId);
  }

  async addComment(comment: Omit<Comment, 'id'>): Promise<Comment> {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString()
    };
    this.comments.push(newComment);
    return newComment;
  }

  async getUser(id: string): Promise<User | null> {
    return this.users.find(u => u.id === id) || null;
  }

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...user };
      return this.users[index];
    }
    throw new Error('User not found');
  }
}
