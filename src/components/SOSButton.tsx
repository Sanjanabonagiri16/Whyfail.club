
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Phone, Heart, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';

interface SOSButtonProps {
  className?: string;
}

const SOSButton: React.FC<SOSButtonProps> = ({ className }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [incidentType, setIncidentType] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('medium');

  const sosMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('sos_incidents')
        .insert({
          user_id: user.id,
          incident_type: incidentType,
          description: description.trim() || null,
          severity,
          support_contact_info: {
            crisis_hotline: '988',
            text_line: 'Text HOME to 741741',
            emergency: '911'
          }
        });
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Support Request Sent",
        description: "Help is on the way. You're not alone in this.",
      });
      setIncidentType('');
      setDescription('');
      setSeverity('medium');
      setShowModal(false);
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
    if (!incidentType) return;
    sosMutation.mutate();
  };

  const emergencyContacts = [
    { name: 'Crisis Text Line', contact: 'Text HOME to 741741', icon: Phone },
    { name: 'Suicide & Crisis Lifeline', contact: '988', icon: Phone },
    { name: 'Emergency Services', contact: '911', icon: AlertCircle },
  ];

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        className={`bg-red-500 hover:bg-red-600 text-white ${className}`}
        size="sm"
      >
        <AlertCircle className="w-4 h-4 mr-2" />
        SOS
      </Button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg bg-navy-800 border-navy-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-400" />
                  You're Not Alone
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Emergency Contacts */}
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <h3 className="text-red-400 font-semibold mb-3">Immediate Help Available</h3>
                <div className="space-y-2">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <contact.icon className="w-4 h-4 text-red-400" />
                      <div>
                        <p className="text-white text-sm font-medium">{contact.name}</p>
                        <p className="text-gray-300 text-sm">{contact.contact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Request Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">What kind of support do you need?</Label>
                  <Select value={incidentType} onValueChange={setIncidentType} required>
                    <SelectTrigger className="bg-navy-700 border-navy-600 text-white">
                      <SelectValue placeholder="Select support type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crisis">Crisis Support</SelectItem>
                      <SelectItem value="support_request">General Support</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">How urgent is this?</Label>
                  <Select value={severity} onValueChange={setSeverity}>
                    <SelectTrigger className="bg-navy-700 border-navy-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - I need someone to talk to</SelectItem>
                      <SelectItem value="medium">Medium - I'm struggling but safe</SelectItem>
                      <SelectItem value="high">High - I'm in distress</SelectItem>
                      <SelectItem value="critical">Critical - I'm in immediate danger</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">
                    Tell us what's happening (Optional)
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="You don't have to share details, but it can help us connect you with the right support..."
                    className="bg-navy-700 border-navy-600 text-white min-h-[100px] resize-none"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                    className="flex-1 border-navy-600 text-gray-300 hover:bg-navy-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={sosMutation.isPending || !incidentType}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                  >
                    {sosMutation.isPending ? 'Sending...' : 'Get Support'}
                  </Button>
                </div>
              </form>

              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  Remember: You matter, your life has value, and there are people who want to help.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default SOSButton;
