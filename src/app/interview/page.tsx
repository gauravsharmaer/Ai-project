import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMicVAD, utils } from "@ricky0123/vad-react";
import { usePlayer } from "@/hooks/usePlayer";

const Interview = () => {
  const { start, stop, subscribe } = useMicVAD();
  const player = usePlayer();
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const handleSpeech = async (speech: ArrayBuffer) => {
      setIsPending(true);
      try {
        const response = await fetch('/api/process-speech', {
          method: 'POST',
          body: speech,
        });
        
        if (response.ok) {
          const audioBlob = await response.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          player.play(audioUrl);
          
          // Add user message and AI response to messages
          const transcript = decodeURIComponent(response.headers.get("X-Transcript") || "");
          const aiResponse = decodeURIComponent(response.headers.get("X-Response") || "");
          
          setMessages(prev => [
            ...prev,
            { role: "user", content: transcript },
            { role: "assistant", content: aiResponse }
          ]);
        } else {
          console.error('Failed to process speech');
        }
      } catch (error) {
        console.error('Error processing speech:', error);
      } finally {
        setIsPending(false);
      }
    };

    const unsubscribe = subscribe((speech: ArrayBuffer) => {
      if (speech) {
        handleSpeech(speech);
      }
    });

    return () => {
      stop();
      unsubscribe();
    };
  }, [start, stop, subscribe, player]);

  const handleStartInterview = () => {
    start();
    setIsListening(true);
  };

  const handleEndInterview = () => {
    stop();
    setIsListening(false);
  };

  return (
    <div>
      <Card className="max-w-[800px] mx-auto flex flex-col gap-3 p-10 justify-center align-middle mt-32">
        <div className="flex justify-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <Textarea
          placeholder="Type your job description here."
          className="my-2"
        />
        <div className="flex gap-3">
          <Button onClick={isListening ? handleEndInterview : handleStartInterview}>
            {isListening ? "End Interview" : "Start Interview"}
          </Button>
        </div>
        
        {/* Display messages */}
        <div className="mt-4">
          {messages.map((message, index) => (
            <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                {message.content}
              </span>
            </div>
          ))}
        </div>
        
        {isPending && <div>Processing...</div>}
      </Card>
    </div>
  );
};

export default Interview;
