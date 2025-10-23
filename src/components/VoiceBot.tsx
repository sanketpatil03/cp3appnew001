import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AudioRecorder, encodeAudioForAPI } from "@/utils/audioRecorder";
import { playAudioData } from "@/utils/audioPlayer";
import voiceBotIcon from "@/assets/voice-bot-icon.svg";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const VoiceBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const { toast } = useToast();
  
  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const recorderRef = useRef<AudioRecorder | null>(null);

  useEffect(() => {
    if (isOpen && !isConnected) {
      connectToVoiceBot();
    }
    
    return () => {
      disconnectVoiceBot();
    };
  }, [isOpen]);

  const connectToVoiceBot = async () => {
    try {
      // Initialize audio context
      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
      
      // Connect to WebSocket
      const ws = new WebSocket(
        `wss://adxinogzhchlkgoljvcw.supabase.co/functions/v1/realtime-voice`
      );
      
      ws.onopen = () => {
        console.log("Connected to voice bot");
        setIsConnected(true);
        setIsListening(true);
        startRecording();
        
        toast({
          title: "Voice Assistant Ready",
          description: "Start speaking to interact with your CRM assistant",
        });
      };

      ws.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Received message type:", data.type);

          if (data.type === "session.created") {
            console.log("Session created successfully");
          } else if (data.type === "session.updated") {
            console.log("Session updated");
          } else if (data.type === "response.audio.delta") {
            setIsSpeaking(true);
            const binaryString = atob(data.delta);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            if (audioContextRef.current) {
              await playAudioData(audioContextRef.current, bytes);
            }
          } else if (data.type === "response.audio.done") {
            setIsSpeaking(false);
          } else if (data.type === "conversation.item.input_audio_transcription.completed") {
            const userMessage = data.transcript;
            setMessages(prev => [...prev, { role: "user", content: userMessage }]);
            setCurrentTranscript("");
          } else if (data.type === "response.audio_transcript.delta") {
            setCurrentTranscript(prev => prev + data.delta);
          } else if (data.type === "response.audio_transcript.done") {
            setMessages(prev => [...prev, { 
              role: "assistant", 
              content: data.transcript 
            }]);
            setCurrentTranscript("");
          } else if (data.type === "error") {
            console.error("Voice bot error:", data);
            toast({
              title: "Error",
              description: data.message || "An error occurred",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error processing message:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        toast({
          title: "Connection Error",
          description: "Failed to connect to voice assistant",
          variant: "destructive",
        });
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
        setIsConnected(false);
        setIsListening(false);
        setIsSpeaking(false);
      };

      wsRef.current = ws;
    } catch (error) {
      console.error("Error connecting:", error);
      toast({
        title: "Error",
        description: "Failed to initialize voice assistant",
        variant: "destructive",
      });
    }
  };

  const startRecording = async () => {
    try {
      recorderRef.current = new AudioRecorder((audioData) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          const encoded = encodeAudioForAPI(audioData);
          wsRef.current.send(JSON.stringify({
            type: 'input_audio_buffer.append',
            audio: encoded
          }));
        }
      });
      await recorderRef.current.start();
    } catch (error) {
      console.error("Error starting recording:", error);
      toast({
        title: "Microphone Error",
        description: "Please allow microphone access",
        variant: "destructive",
      });
    }
  };

  const disconnectVoiceBot = () => {
    recorderRef.current?.stop();
    wsRef.current?.close();
    audioContextRef.current?.close();
    wsRef.current = null;
    audioContextRef.current = null;
    recorderRef.current = null;
    setIsConnected(false);
    setIsListening(false);
    setIsSpeaking(false);
  };

  const toggleOpen = () => {
    if (isOpen) {
      disconnectVoiceBot();
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={toggleOpen}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg hover:scale-110 transition-transform z-50 p-0 bg-primary"
        aria-label="Open Voice Assistant"
      >
        <img 
          src={voiceBotIcon} 
          alt="Voice Bot" 
          className="w-12 h-12"
        />
      </Button>

      {/* Voice Assistant Dialog */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <img src={voiceBotIcon} alt="Voice Bot" className="w-8 h-8" />
              <div>
                <h3 className="font-semibold">CRM Voice Assistant</h3>
                <p className="text-xs text-muted-foreground">
                  {isConnected ? "Connected" : "Connecting..."}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleOpen}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
            {currentTranscript && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                  <p className="text-sm opacity-70">{currentTranscript}...</p>
                </div>
              </div>
            )}
          </div>

          {/* Status */}
          <div className="p-4 border-t flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              {isListening ? (
                <Mic className="h-5 w-5 text-green-500 animate-pulse" />
              ) : (
                <MicOff className="h-5 w-5 text-muted-foreground" />
              )}
              <span className="text-sm">
                {isListening ? "Listening..." : "Microphone off"}
              </span>
            </div>
            {isSpeaking && (
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-sm">Speaking...</span>
              </div>
            )}
          </div>
        </Card>
      )}
    </>
  );
};
