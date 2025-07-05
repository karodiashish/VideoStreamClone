import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ThumbsUp, Share2, UserPlus } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import VideoCard from "@/components/VideoCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { Video, Channel } from "@shared/schema";

export default function VideoPage() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split("?")[1]);
  const videoId = searchParams.get("v");

  const { data: video, isLoading: videoLoading } = useQuery({
    queryKey: ["/api/videos", videoId],
    enabled: !!videoId,
  });

  const { data: channel, isLoading: channelLoading } = useQuery({
    queryKey: ["/api/channels", video?.channelId],
    enabled: !!video?.channelId,
  });

  const { data: allVideos, isLoading: allVideosLoading } = useQuery({
    queryKey: ["/api/videos"],
  });

  const { data: allChannels, isLoading: allChannelsLoading } = useQuery({
    queryKey: ["/api/channels"],
  });

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(0)}K`;
    }
    return views.toString();
  };

  const formatSubscribers = (subscribers: number) => {
    if (subscribers >= 1000000) {
      return `${(subscribers / 1000000).toFixed(1)}M`;
    } else if (subscribers >= 1000) {
      return `${(subscribers / 1000).toFixed(0)}K`;
    }
    return subscribers.toString();
  };

  const getChannelById = (channelId: string) => {
    return allChannels?.find((c: Channel) => c.id === channelId);
  };

  // Get recommended videos (exclude current video)
  const recommendedVideos = allVideos?.filter((v: Video) => v.id !== videoId)?.slice(0, 10);

  if (videoLoading || channelLoading) {
    return (
      <div className="flex flex-col lg:flex-row p-4 gap-6">
        <div className="flex-1">
          <Skeleton className="w-full aspect-video rounded-lg mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-9 w-20 rounded-full" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-9 w-16 rounded-full" />
                <Skeleton className="h-9 w-16 rounded-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-80">
          <Skeleton className="h-4 w-20 mb-4" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex space-x-2">
                <Skeleton className="w-40 h-24 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!video || !channel) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-lg text-gray-500">Video not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row p-4 gap-6">
      {/* Main video section */}
      <div className="flex-1">
        {/* Video player */}
        <VideoPlayer
          src={video.videoUrl}
          poster={video.thumbnail}
          className="w-full aspect-video mb-4"
        />

        {/* Video info */}
        <div className="space-y-4">
          <h1 className="text-xl font-semibold line-clamp-2 text-yt-text-primary dark:text-yt-text-primary-dark">
            {video.title}
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={channel.avatar} />
                  <AvatarFallback>{channel.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-yt-text-primary dark:text-yt-text-primary-dark">
                    {channel.name}
                  </h3>
                  <p className="text-sm text-yt-text-secondary dark:text-yt-text-secondary-dark">
                    {formatSubscribers(channel.subscribers)} subscribers
                  </p>
                </div>
              </div>
              <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="secondary" className="rounded-full">
                <ThumbsUp className="h-4 w-4 mr-2" />
                {formatViews(video.likes)}
              </Button>
              <Button variant="secondary" className="rounded-full">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Video description */}
          <div className="bg-gray-50 dark:bg-yt-dark-surface rounded-lg p-4">
            <div className="flex items-center space-x-4 text-sm font-medium mb-2">
              <span>{formatViews(video.views)} views</span>
              <span>{video.uploadDate}</span>
            </div>
            <p className="text-sm text-yt-text-secondary dark:text-yt-text-secondary-dark">
              {video.description}
            </p>
          </div>

          {/* Comments section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium">1,234 Comments</span>
              <Button variant="ghost" size="sm">
                Sort by
              </Button>
            </div>

            {/* Comment input */}
            <div className="flex space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Input
                  placeholder="Add a comment..."
                  className="border-0 border-b border-gray-300 dark:border-gray-600 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-blue-500 dark:focus-visible:border-blue-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations sidebar */}
      <div className="w-full lg:w-80 space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Up next</span>
          <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
            Autoplay
          </Button>
        </div>

        {/* Recommended videos */}
        <div className="space-y-2">
          {recommendedVideos?.map((recommendedVideo: Video) => {
            const recommendedChannel = getChannelById(recommendedVideo.channelId);
            if (!recommendedChannel) return null;

            return (
              <div key={recommendedVideo.id} className="flex space-x-2 hover:bg-gray-100 dark:hover:bg-yt-dark-hover rounded-lg p-2 transition-colors">
                <div className="relative flex-shrink-0">
                  <img
                    src={recommendedVideo.thumbnail}
                    alt={recommendedVideo.title}
                    className="w-40 h-24 object-cover rounded"
                  />
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                    {recommendedVideo.duration}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium line-clamp-2 mb-1 text-yt-text-primary dark:text-yt-text-primary-dark">
                    {recommendedVideo.title}
                  </h4>
                  <p className="text-xs text-yt-text-secondary dark:text-yt-text-secondary-dark">
                    {recommendedChannel.name}
                  </p>
                  <p className="text-xs text-yt-text-secondary dark:text-yt-text-secondary-dark">
                    {formatViews(recommendedVideo.views)} views • {recommendedVideo.uploadDate}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
