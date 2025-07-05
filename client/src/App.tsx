import { useState } from "react";
import { Route, Switch, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import HomePage from "@/pages/HomePage";
import VideoPage from "@/pages/VideoPage";
import NotFoundPage from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location] = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-yt-dark-bg text-yt-text-primary dark:text-yt-text-primary-dark transition-colors duration-300">
          <Header onMenuToggle={toggleSidebar} />
          <div className="pt-14 flex">
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
            <main className="flex-1 lg:ml-64 transition-all duration-300">
              <Switch>
                <Route path="/" component={HomePage} />
                <Route path="/watch" component={VideoPage} />
                <Route path="/search" component={HomePage} />
                <Route path="/explore" component={HomePage} />
                <Route path="/shorts" component={HomePage} />
                <Route path="/subscriptions" component={HomePage} />
                <Route path="/library" component={HomePage} />
                <Route path="/history" component={HomePage} />
                <Route path="/watch-later" component={HomePage} />
                <Route path="/liked" component={HomePage} />
                <Route path="/channel/:id" component={HomePage} />
                <Route component={NotFoundPage} />
              </Switch>
            </main>
          </div>
          <Toaster />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
