
import React, { useState } from 'react';
import { Post } from '@/types/Post';
import { useUser } from '@/hooks/usePosts';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { data: user } = useUser(post.userId);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.reactions.likes);
  const [showFullText, setShowFullText] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();

  const handleLike = () => {
    setIsAnimating(true);
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    
    if (!liked) {
      toast({
        description: "Post liked! ❤️",
        duration: 1500,
      });
    }
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleSave = () => {
    setSaved(!saved);
    toast({
      description: saved ? "Post removed from saved" : "Post saved! 📌",
      duration: 1500,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`Check out this post: ${post.title}`);
    toast({
      description: "Link copied to clipboard! 📋",
      duration: 2000,
    });
  };

  const truncatedBody = post.body.length > 150 ? post.body.substring(0, 150) + "..." : post.body;

  return (
    <Card className="mb-6 overflow-hidden border-0 shadow-lg bg-white/90 backdrop-blur-md hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] group cursor-pointer">
      {/* User Header */}
      <div className="p-4 flex items-center space-x-3">
        <div className="relative">
          <Avatar className="h-12 w-12 ring-2 ring-purple-200 hover:ring-purple-400 transition-all duration-300">
            <AvatarImage src={user?.image} alt={user?.username} />
            <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-600 text-white font-semibold">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 hover:text-purple-600 transition-colors cursor-pointer">
            {user?.firstName} {user?.lastName}
          </h3>
          <p className="text-sm text-gray-500">@{user?.username} • just now</p>
        </div>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-purple-700 transition-colors cursor-pointer">
          {post.title}
        </h2>
        <div className="relative">
          <p className="text-gray-700 leading-relaxed mb-4 text-base">
            {showFullText ? post.body : truncatedBody}
          </p>
          {post.body.length > 150 && (
            <button
              onClick={() => setShowFullText(!showFullText)}
              className="text-purple-600 hover:text-purple-800 font-medium text-sm transition-colors"
            >
              {showFullText ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-purple-700 text-xs font-semibold rounded-full hover:scale-105 hover:shadow-md transition-all duration-200 cursor-pointer border border-purple-100"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-4 border-t border-gray-100 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`hover:scale-110 transition-all duration-300 rounded-full px-3 py-2 ${
                liked ? 'text-red-500 bg-red-50' : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
              } ${isAnimating ? 'animate-bounce' : ''}`}
            >
              <Heart className={`h-5 w-5 mr-2 transition-all duration-200 ${liked ? 'fill-current scale-110' : ''}`} />
              <span className="font-semibold">{likeCount}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-blue-500 hover:bg-blue-50 hover:scale-110 transition-all duration-300 rounded-full px-3 py-2"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              <span className="font-semibold">{Math.floor(Math.random() * 20) + 5}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-gray-500 hover:text-green-500 hover:bg-green-50 hover:scale-110 transition-all duration-300 rounded-full p-2"
            >
              <Share className="h-5 w-5" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className={`hover:scale-110 transition-all duration-300 rounded-full p-2 ${
              saved ? 'text-yellow-600 bg-yellow-50' : 'text-gray-500 hover:text-yellow-600 hover:bg-yellow-50'
            }`}
          >
            <Bookmark className={`h-5 w-5 transition-all duration-200 ${saved ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
