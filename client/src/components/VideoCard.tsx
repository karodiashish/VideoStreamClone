import { Link } from "wouter";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Video, Channel } from "@shared/schema";

interface VideoCardProps {
  video: Video;
  channel: Channel;
}

export default function VideoCard({ video, channel }: VideoCardProps) {
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(0)}K`;
    }
    return views.toString();
  };

  return (
    <Link href={`/watch?v=${video.id}`}>
      <div className="cursor-pointer group">
        <div className="relative">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full aspect-video object-cover rounded-lg group-hover:rounded-none transition-all duration-200"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
            {video.duration}
          </div>
        </div>
        <div className="flex mt-3 space-x-3">
          <Avatar className="w-9 h-9 flex-shrink-0">
            <AvatarImage src={channel.avatar} />
            <AvatarFallback>{channel.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium line-clamp-2 mb-1 text-yt-text-primary dark:text-yt-text-primary-dark">
              {video.title}
            </h3>
            <p className="text-xs text-yt-text-secondary dark:text-yt-text-secondary-dark">
              {channel.name}
            </p>
            <p className="text-xs text-yt-text-secondary dark:text-yt-text-secondary-dark">
              {formatViews(video.views)} views • {video.uploadDate}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
