
import React, { useState } from 'react';
import { usePosts } from '@/hooks/usePosts';
import PostCard from '@/components/PostCard';
import LoadingCard from '@/components/LoadingCard';
import Header from '@/components/Header';
import { AlertCircle, Wifi, Plus, TrendingUp, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { data: posts, isLoading, error, refetch } = usePosts();
  const [showWelcome, setShowWelcome] = useState(true);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 text-center shadow-xl animate-fadeIn">
            <AlertCircle className="h-20 w-20 text-red-500 mx-auto mb-6 animate-bounce" />
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-8 text-lg">We couldn't load the posts. Check your connection and try again.</p>
            <Button 
              onClick={() => refetch()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105 shadow-lg"
            >
              <Wifi className="h-5 w-5 mr-3" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Welcome Message */}
        {showWelcome && (
          <div className="mb-8 text-center animate-fadeIn">
            <div className="relative">
              <button
                onClick={() => setShowWelcome(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-sm"
              >
                ✕
              </button>
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50">
                <div className="flex justify-center space-x-4 mb-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="bg-pink-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-pink-600" />
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-3">
                  Welcome to <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Vibes</span>
                </h2>
                <p className="text-gray-600 text-lg">Discover amazing content from the community ✨</p>
                <div className="mt-4 flex justify-center space-x-2 text-sm text-gray-500">
                  <span>🔥 Trending</span>
                  <span>•</span>
                  <span>👥 Community</span>
                  <span>•</span>
                  <span>⚡ Fresh</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions Bar */}
        <div className="mb-6 animate-fadeIn" style={{animationDelay: '200ms'}}>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/50">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 rounded-full px-4 py-2 font-semibold shadow-md hover:scale-105 transition-all"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 hover:bg-purple-50 rounded-full px-4 py-2 font-medium"
                >
                  🔥 Trending
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 hover:bg-purple-50 rounded-full px-4 py-2 font-medium"
                >
                  ⚡ Latest
                </Button>
              </div>
              <div className="text-sm text-gray-500 font-medium">
                {posts?.length || 0} posts
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-1">
          {isLoading ? (
            // Loading skeletons with staggered animation
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="animate-fadeIn"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'both'
                }}
              >
                <LoadingCard />
              </div>
            ))
          ) : (
            // Actual posts with staggered animation
            posts?.map((post, index) => (
              <div
                key={post.id}
                className="animate-fadeIn"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <PostCard post={post} />
              </div>
            ))
          )}
        </div>

        {/* Load More Button */}
        {posts && posts.length > 0 && (
          <div className="text-center py-8">
            <Button
              variant="outline"
              className="bg-white/80 backdrop-blur-sm border-purple-200 hover:bg-purple-50 hover:border-purple-300 hover:scale-105 transition-all duration-300 font-semibold px-8 py-3 rounded-full shadow-lg text-purple-700"
            >
              Load More Vibes ✨
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
