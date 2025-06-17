
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { EyeOff, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface AnonymousModeToggleProps {
  isAnonymous: boolean;
  userId: string;
}

const AnonymousModeToggle: React.FC<AnonymousModeToggleProps> = ({ isAnonymous, userId }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const toggleAnonymousMutation = useMutation({
    mutationFn: async (newMode: boolean) => {
      const { error } = await supabase
        .from('profiles')
        .update({ is_anonymous_mode: newMode })
        .eq('id', userId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast({
        title: "Privacy mode updated",
        description: isAnonymous 
          ? "You're now posting publicly" 
          : "You're now posting anonymously",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Card className="bg-navy-800 border-navy-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isAnonymous ? (
              <EyeOff className="w-5 h-5 text-gold-400" />
            ) : (
              <Eye className="w-5 h-5 text-gold-400" />
            )}
            <div>
              <Label className="text-white font-medium">Anonymous Mode</Label>
              <p className="text-sm text-gray-400">
                {isAnonymous ? "Your identity is hidden" : "Your name is visible"}
              </p>
            </div>
          </div>
          <Switch
            checked={isAnonymous}
            onCheckedChange={(checked) => toggleAnonymousMutation.mutate(checked)}
            disabled={toggleAnonymousMutation.isPending}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AnonymousModeToggle;
