import { Link, useLocation } from "wouter";
import { 
  Home, 
  Compass, 
  Play, 
  Rss, 
  BookOpen, 
  History, 
  Clock, 
  ThumbsUp 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();

  const navigationItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Compass, label: "Explore", href: "/explore" },
    { icon: Play, label: "Shorts", href: "/shorts" },
    { icon: Rss, label: "Subscriptions", href: "/subscriptions" },
  ];

  const libraryItems = [
    { icon: BookOpen, label: "Library", href: "/library" },
    { icon: History, label: "History", href: "/history" },
    { icon: Clock, label: "Watch later", href: "/watch-later" },
    { icon: ThumbsUp, label: "Liked videos", href: "/liked" },
  ];

  const subscriptions = [
    {
      id: "1",
      name: "Tech Reviews",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32"
    },
    {
      id: "2",
      name: "Cooking Master",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32"
    },
    {
      id: "3",
      name: "Travel Vlogs",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32"
    },
  ];

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <nav className={cn(
        "fixed left-0 top-14 h-full w-64 bg-white dark:bg-yt-dark-bg border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 z-40 overflow-y-auto",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-3 space-y-1">
          {/* Main navigation */}
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={handleLinkClick}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start space-x-6 px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-yt-dark-hover",
                    location === item.href && "bg-gray-100 dark:bg-yt-dark-hover"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>

          <hr className="border-gray-200 dark:border-gray-700 my-3" />

          {/* Library section */}
          <div className="space-y-1">
            {libraryItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={handleLinkClick}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start space-x-6 px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-yt-dark-hover",
                    location === item.href && "bg-gray-100 dark:bg-yt-dark-hover"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>

          <hr className="border-gray-200 dark:border-gray-700 my-3" />

          {/* Subscriptions */}
          <div className="space-y-1">
            <p className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Subscriptions
            </p>
            {subscriptions.map((channel) => (
              <Link key={channel.id} href={`/channel/${channel.id}`} onClick={handleLinkClick}>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-yt-dark-hover"
                >
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={channel.avatar} />
                    <AvatarFallback>{channel.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{channel.name}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
