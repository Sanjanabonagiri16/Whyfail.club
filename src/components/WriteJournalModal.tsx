
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { X, PenTool } from 'lucide-react';

interface WriteJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; content: string; isPublic: boolean }) => void;
  isLoading: boolean;
}

const WriteJournalModal: React.FC<WriteJournalModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    onSubmit({ title, content, isPublic });
    
    // Reset form
    setTitle('');
    setContent('');
    setIsPublic(false);
  };

  const handleClose = () => {
    setTitle('');
    setContent('');
    setIsPublic(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl bg-navy-800 border-navy-700 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <PenTool className="w-5 h-5 mr-2 text-gold-400" />
              Write New Journal Entry
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">
                Entry Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your thoughts a title..."
                className="bg-navy-700 border-navy-600 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-white">
                Your Thoughts
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Let your thoughts flow freely. This is your safe space..."
                className="bg-navy-700 border-navy-600 text-white min-h-[200px] resize-none"
                required
              />
              <p className="text-xs text-gray-400">
                Share your struggles, victories, lessons learned, or anything on your mind.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is-public"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
              <Label htmlFor="is-public" className="text-white">
                Make this entry public (visible to community)
              </Label>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-navy-600 text-gray-300 hover:bg-navy-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !title.trim() || !content.trim()}
                className="flex-1 bg-gold-500 hover:bg-gold-600 text-navy-900"
              >
                {isLoading ? 'Saving...' : 'Save Entry'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WriteJournalModal;
