
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Eye, Lock } from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

interface JournalEntryCardProps {
  entry: JournalEntry;
}

const JournalEntryCard: React.FC<JournalEntryCardProps> = ({ entry }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <Card className="bg-navy-700 border-navy-600 hover:bg-navy-650 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h4 className="font-semibold text-white text-lg">{entry.title}</h4>
          <Badge 
            variant="outline" 
            className={`${
              entry.is_public 
                ? 'border-green-500 text-green-400' 
                : 'border-gray-500 text-gray-400'
            }`}
          >
            {entry.is_public ? (
              <>
                <Eye className="w-3 h-3 mr-1" />
                Public
              </>
            ) : (
              <>
                <Lock className="w-3 h-3 mr-1" />
                Private
              </>
            )}
          </Badge>
        </div>
        
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {truncateContent(entry.content)}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-400">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDate(entry.created_at)}</span>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-navy-600 text-gray-300 hover:bg-navy-600"
          >
            Read Full Entry
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JournalEntryCard;
