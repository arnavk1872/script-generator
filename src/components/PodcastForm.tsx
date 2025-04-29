
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import MicrophoneIcon from './MicrophoneIcon';
import { useToast } from '@/components/ui/use-toast';

interface PodcastFormProps {
  onGenerate: (topic: string, openAIKey: string) => Promise<void>;
  isGenerating: boolean;
}

const PodcastForm: React.FC<PodcastFormProps> = ({ onGenerate, isGenerating }) => {
  const [topic, setTopic] = useState('');
  const [openAIKey, setOpenAIKey] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic for your podcast.",
        variant: "destructive",
      });
      return;
    }

    if (!openAIKey.trim()) {
      toast({
        title: "OpenAI API Key Required",
        description: "Please enter your OpenAI API key.",
        variant: "destructive",
      });
      return;
    }

    await onGenerate(topic, openAIKey);
  };

  return (
    <Card className="p-6 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="topic">Podcast Topic</Label>
          <Textarea
            id="topic"
            placeholder="Enter a topic, question or full sentence to create your podcast about..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="openaikey">OpenAI API Key</Label>
          <Input
            id="openaikey"
            type="password"
            placeholder="Enter your OpenAI API key"
            value={openAIKey}
            onChange={(e) => setOpenAIKey(e.target.value)}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-podcast-primary hover:bg-podcast-secondary text-white gap-2"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <MicrophoneIcon className="h-5 w-5 animate-pulse" />
              Generating Script...
            </>
          ) : (
            <>
              <MicrophoneIcon className="h-5 w-5" />
              Generate Script
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default PodcastForm;
