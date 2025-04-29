
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ScriptDisplayProps {
  script: string;
}

const ScriptDisplay: React.FC<ScriptDisplayProps> = ({ script }) => {
  if (!script) return null;

  return (
    <Card className="bg-white shadow-lg mt-6">
      <CardHeader className="bg-podcast-primary text-white">
        <CardTitle>Generated Podcast Script</CardTitle>
      </CardHeader>
      <CardContent className="p-6 max-h-[400px] overflow-y-auto">
        <div className="whitespace-pre-line font-serif text-podcast-text">
          {script}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScriptDisplay;
