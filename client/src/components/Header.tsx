import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, Video, Bell, Moon, Sun, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "./ThemeProvider";

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-yt-dark-bg border-b border-gray-200 dark:border-gray-800 h-14">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="p-2 hover:bg-gray-100 dark:hover:bg-yt-dark-hover"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center space-x-1">
            <Youtube className="h-6 w-6 text-red-600" />
            <span className="text-xl font-medium hidden sm:inline text-yt-text-primary dark:text-yt-text-primary-dark">
              YouTube
            </span>
          </Link>
        </div>

        {/* Search section */}
        <div className="flex-1 max-w-2xl mx-4">
          <form onSubmit={handleSearch} className="flex">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-full bg-white dark:bg-yt-dark-bg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 rounded-r-none"
              />
            </div>
            <Button
              type="submit"
              className="px-6 py-2 bg-gray-50 dark:bg-yt-dark-surface border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-full hover:bg-gray-100 dark:hover:bg-yt-dark-hover"
              variant="ghost"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-yt-dark-hover"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="p-2 hover:bg-gray-100 dark:hover:bg-yt-dark-hover"
          >
            <Video className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="p-2 hover:bg-gray-100 dark:hover:bg-yt-dark-hover"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-gray-300 transition-all">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
