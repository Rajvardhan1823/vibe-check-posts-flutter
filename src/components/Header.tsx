
import React, { useState } from 'react';
import { Search, Bell, MessageSquare, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header = () => {
  const [searchFocus, setSearchFocus] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">
              Vibes
            </h1>
          </div>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className={`relative w-full transition-all duration-300 ${searchFocus ? 'scale-105' : ''}`}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search vibes..."
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
                className={`pl-10 transition-all duration-300 ${
                  searchFocus 
                    ? 'bg-white border-purple-300 shadow-lg ring-2 ring-purple-100' 
                    : 'bg-gray-50/80 border-gray-200 hover:bg-white'
                }`}
              />
            </div>
          </div>
          
          {/* Action Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full p-3 transition-all duration-200 hover:scale-110 relative"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full p-3 transition-all duration-200 hover:scale-110 relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full animate-pulse"></span>
            </Button>
            
            <Avatar className="h-8 w-8 cursor-pointer hover:scale-110 transition-transform duration-200 ring-2 ring-transparent hover:ring-purple-300">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm font-semibold">
                You
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-gray-600 hover:text-purple-600 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 animate-fadeIn">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search vibes..."
                  className="pl-10 bg-gray-50/80 border-gray-200"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-purple-600 relative">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Messages
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-purple-600 relative">
                    <Bell className="h-5 w-5 mr-2" />
                    Notifications
                    <span className="absolute top-0 right-0 h-2 w-2 bg-blue-500 rounded-full"></span>
                  </Button>
                </div>
                
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm">
                    You
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
