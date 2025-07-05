import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "@/components/VideoCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Video, Channel } from "@shared/schema";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: videos, isLoading: videosLoading } = useQuery({
    queryKey: ["/api/videos"],
  });

  const { data: channels, isLoading: channelsLoading } = useQuery({
    queryKey: ["/api/channels"],
  });

  const categories = [
    { id: "all", label: "All" },
    { id: "music", label: "Music" },
    { id: "gaming", label: "Gaming" },
    { id: "tech", label: "Technology" },
    { id: "education", label: "Education" },
    { id: "sports", label: "Sports" },
  ];

  const filteredVideos = videos?.filter((video: Video) => {
    if (selectedCategory === "all") return true;
    return video.tags.includes(selectedCategory);
  });

  const getChannelById = (channelId: string) => {
    return channels?.find((channel: Channel) => channel.id === channelId);
  };

  if (videosLoading || channelsLoading) {
    return (
      <div className="p-4">
        {/* Category chips skeleton */}
        <div className="flex space-x-3 mb-6 overflow-x-auto pb-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full flex-shrink-0" />
          ))}
        </div>

        {/* Video grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="w-full aspect-video rounded-lg" />
              <div className="flex space-x-3">
                <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Category chips */}
      <div className="flex space-x-3 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "secondary"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex-shrink-0 rounded-full"
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Video grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {filteredVideos?.map((video: Video) => {
          const channel = getChannelById(video.channelId);
          if (!channel) return null;

          return (
            <VideoCard
              key={video.id}
              video={video}
              channel={channel}
            />
          );
        })}
      </div>
    </div>
  );
}
