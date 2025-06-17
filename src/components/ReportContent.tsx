
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Flag, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';

interface ReportContentProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: 'journal_entry' | 'story' | 'comment';
  contentId: string;
  reportedUserId: string;
}

const ReportContent: React.FC<ReportContentProps> = ({
  isOpen,
  onClose,
  contentType,
  contentId,
  reportedUserId
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');

  const reportMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('content_reports')
        .insert({
          reporter_id: user.id,
          reported_content_type: contentType,
          reported_content_id: contentId,
          reported_user_id: reportedUserId,
          report_reason: reason,
          report_description: description.trim() || null,
        });
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Report Submitted",
        description: "Thank you for helping keep our community safe. We'll review this report.",
      });
      setReason('');
      setDescription('');
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) return;
    reportMutation.mutate();
  };

  const handleClose = () => {
    setReason('');
    setDescription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-navy-800 border-navy-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <Flag className="w-5 h-5 mr-2 text-red-400" />
              Report Content
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Reason for Report</Label>
              <Select value={reason} onValueChange={setReason} required>
                <SelectTrigger className="bg-navy-700 border-navy-600 text-white">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="harassment">Harassment</SelectItem>
                  <SelectItem value="spam">Spam</SelectItem>
                  <SelectItem value="self_harm">Self-harm content</SelectItem>
                  <SelectItem value="inappropriate">Inappropriate content</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">
                Additional Details (Optional)
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide any additional context..."
                className="bg-navy-700 border-navy-600 text-white min-h-[100px] resize-none"
              />
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
                disabled={reportMutation.isPending || !reason}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
              >
                {reportMutation.isPending ? 'Submitting...' : 'Submit Report'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportContent;
