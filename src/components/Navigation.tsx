
import React from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useLocation } from 'react-router-dom';

const Navigation = () => {
  const { toast } = useToast();
  const location = useLocation();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-navy-800 border-b border-navy-700 px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex space-x-8">
          <h1 className="text-xl font-bold text-white">WhyFail.club</h1>
          <div className="flex space-x-6">
            <a 
              href="/dashboard" 
              className={`${isActive('/dashboard') ? 'text-gold-400' : 'text-gray-300'} hover:text-gold-300`}
            >
              Dashboard
            </a>
            <a 
              href="/journal" 
              className={`${isActive('/journal') ? 'text-gold-400' : 'text-gray-300'} hover:text-gold-300`}
            >
              Journal
            </a>
            <a 
              href="/stories" 
              className={`${isActive('/stories') ? 'text-gold-400' : 'text-gray-300'} hover:text-gold-300`}
            >
              Stories
            </a>
            <a 
              href="/mentalk" 
              className={`${isActive('/mentalk') ? 'text-gold-400' : 'text-gray-300'} hover:text-gold-300`}
            >
              MenTalk
            </a>
          </div>
        </div>
        <Button 
          onClick={handleSignOut}
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-navy-700"
        >
          Sign Out
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
