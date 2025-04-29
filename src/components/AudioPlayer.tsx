
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { HiDownload } from 'react-icons/hi';

interface AudioPlayerProps {
  audioUrl: string | null;
  loading?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, loading = false }) => {
  if (!audioUrl && !loading) return null;

  const handleDownload = () => {
    if (audioUrl) {
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = 'ai-podcast.mp3';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <Card className="mt-6 shadow-lg">
      <CardHeader className="bg-podcast-secondary text-white">
        <CardTitle>Your AI Podcast</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-pulse-mic">
              <div className="w-16 h-16 bg-podcast-accent rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🎙️</span>
              </div>
            </div>
            <p className="mt-4 text-podcast-text">Generating audio...</p>
          </div>
        ) : (
          <audio controls className="w-full" src={audioUrl || undefined}>
            Your browser does not support the audio element.
          </audio>
        )}
      </CardContent>
      {audioUrl && (
        <CardFooter className="bg-gray-50 border-t flex justify-end p-4">
          <Button 
            onClick={handleDownload}
            className="bg-podcast-accent hover:bg-podcast-primary text-white flex items-center gap-2"
          >
            <HiDownload className="h-4 w-4" />
            Download Audio
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AudioPlayer;
