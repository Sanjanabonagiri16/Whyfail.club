
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { X, PenTool, Plus, Trash2 } from 'lucide-react';

interface EnhancedJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    content: string;
    isPublic: boolean;
    bounceBackPlan?: string;
    moodBefore?: number;
    moodAfter?: number;
    tags?: string[];
  }) => void;
  isLoading: boolean;
}

const EnhancedJournalModal: React.FC<EnhancedJournalModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [bounceBackPlan, setBounceBackPlan] = useState('');
  const [moodBefore, setMoodBefore] = useState([5]);
  const [moodAfter, setMoodAfter] = useState([5]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    onSubmit({
      title,
      content,
      isPublic,
      bounceBackPlan: bounceBackPlan.trim() || undefined,
      moodBefore: moodBefore[0],
      moodAfter: moodAfter[0],
      tags: tags.length > 0 ? tags : undefined,
    });
    
    // Reset form
    setTitle('');
    setContent('');
    setIsPublic(false);
    setBounceBackPlan('');
    setMoodBefore([5]);
    setMoodAfter([5]);
    setTags([]);
    setNewTag('');
  };

  const handleClose = () => {
    setTitle('');
    setContent('');
    setIsPublic(false);
    setBounceBackPlan('');
    setMoodBefore([5]);
    setMoodAfter([5]);
    setTags([]);
    setNewTag('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-3xl bg-navy-800 border-navy-700 max-h-[90vh] overflow-y-auto">
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Mood Before Writing (1-10)</Label>
                <Slider
                  value={moodBefore}
                  onValueChange={setMoodBefore}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <p className="text-sm text-gray-400">Current: {moodBefore[0]}</p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Mood After Writing (1-10)</Label>
                <Slider
                  value={moodAfter}
                  onValueChange={setMoodAfter}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <p className="text-sm text-gray-400">Current: {moodAfter[0]}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Entry Title</Label>
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
              <Label htmlFor="content" className="text-white">Your Thoughts</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Let your thoughts flow freely. This is your safe space..."
                className="bg-navy-700 border-navy-600 text-white min-h-[200px] resize-none"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bounceBackPlan" className="text-white">Bounce-Back Plan (Optional)</Label>
              <Textarea
                id="bounceBackPlan"
                value={bounceBackPlan}
                onChange={(e) => setBounceBackPlan(e.target.value)}
                placeholder="What steps will you take to move forward from this experience?"
                className="bg-navy-700 border-navy-600 text-white min-h-[100px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Tags</Label>
              <div className="flex space-x-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  className="bg-navy-700 border-navy-600 text-white flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} size="sm" className="bg-gold-500 hover:bg-gold-600 text-navy-900">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-gold-400 text-gold-400">
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTag(tag)}
                      className="ml-1 h-auto p-0 text-gold-400 hover:text-gold-300"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
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

export default EnhancedJournalModal;
