
import React, { useState } from 'react';
import PodcastForm from '@/components/PodcastForm';
import ScriptDisplay from '@/components/ScriptDisplay';
import MicrophoneIcon from '@/components/MicrophoneIcon';
import { initializeOpenAI, generatePodcastScript } from '@/services/openaiService';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [script, setScript] = useState<string>('');
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const { toast } = useToast();

  const handleGenerateScript = async (topic: string, openAIKey: string) => {
    try {
      // Clear previous results
      setScript('');
      
      // Generate the script
      setIsGeneratingScript(true);
      initializeOpenAI(openAIKey);
      const generatedScript = await generatePodcastScript(topic);
      setScript(generatedScript);
      setIsGeneratingScript(false);
      
      toast({
        title: "Success!",
        description: "Your podcast script has been generated.",
        variant: "default",
      });
    } catch (error) {
      console.error('Error in script generation:', error);
      setIsGeneratingScript(false);
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate script. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-podcast-bg font-poppins">
      <div className="container py-8 px-4 sm:px-6">
        <header className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="bg-podcast-primary rounded-full p-4 animate-pulse-mic">
              <MicrophoneIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-podcast-text mb-2">Script Spark</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your ideas into engaging podcast scripts in seconds
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-podcast-text">Create Your Script</h2>
            <PodcastForm 
              onGenerate={handleGenerateScript}
              isGenerating={isGeneratingScript}
            />
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-podcast-text">Your Generated Content</h2>
            {(isGeneratingScript || script) && (
              <ScriptDisplay script={isGeneratingScript ? "Generating script..." : script} />
            )}
          </div>
        </div>

        <footer className="mt-16 text-center text-sm text-gray-500">
          <p className="mt-1"> This application requires an OpenAI API key.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
