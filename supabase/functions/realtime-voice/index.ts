import "https://deno.land/x/xhr@0.1.0/mod.ts";

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

interface ClientMessage {
  type: string;
  audio?: string;
  [key: string]: any;
}

const handleWebSocket = async (req: Request): Promise<Response> => {
  const upgrade = req.headers.get("upgrade") || "";
  if (upgrade.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket", { status: 426 });
  }

  const { socket: clientSocket, response } = Deno.upgradeWebSocket(req);
  let openAISocket: WebSocket | null = null;

  clientSocket.onopen = async () => {
    console.log("Client connected");
    
    try {
      // Connect to OpenAI Realtime API using protocol substrings for authentication
      const url = 'wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01';
      
      openAISocket = new WebSocket(url, [
        'realtime',
        `openai-insecure-api-key.${OPENAI_API_KEY}`,
        'openai-beta.realtime-v1',
      ]);

      openAISocket.onopen = () => {
        console.log("Connected to OpenAI");
        
        // Send session configuration after connection
        const sessionConfig = {
          type: "session.update",
          session: {
            modalities: ["text", "audio"],
            instructions: "You are Phyzii Bot, a helpful assistant for pharmaceutical sales representatives. Help them with customer information, sales tracking, appointments, and product information. Be concise and professional.",
            voice: "alloy",
            input_audio_format: "pcm16",
            output_audio_format: "pcm16",
            input_audio_transcription: {
              model: "whisper-1"
            },
            turn_detection: {
              type: "server_vad",
              threshold: 0.5,
              prefix_padding_ms: 300,
              silence_duration_ms: 1000
            },
            temperature: 0.8,
            max_response_output_tokens: 4096
          }
        };
        
        openAISocket?.send(JSON.stringify(sessionConfig));
        console.log("Session config sent");
      };

      openAISocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("OpenAI message type:", data.type);
          
          // Forward all OpenAI messages to client
          if (clientSocket.readyState === WebSocket.OPEN) {
            clientSocket.send(JSON.stringify(data));
          }
        } catch (error) {
          console.error("Error processing OpenAI message:", error);
        }
      };

      openAISocket.onerror = (error) => {
        console.error("OpenAI WebSocket error:", error);
        if (clientSocket.readyState === WebSocket.OPEN) {
          clientSocket.send(JSON.stringify({ 
            type: "error", 
            message: "OpenAI connection error" 
          }));
        }
      };

      openAISocket.onclose = () => {
        console.log("OpenAI connection closed");
        if (clientSocket.readyState === WebSocket.OPEN) {
          clientSocket.close();
        }
      };

    } catch (error) {
      console.error("Error connecting to OpenAI:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (clientSocket.readyState === WebSocket.OPEN) {
        clientSocket.send(JSON.stringify({ 
          type: "error", 
          message: `Failed to connect to AI service: ${errorMessage}` 
        }));
        clientSocket.close();
      }
    }
  };

  clientSocket.onmessage = (event) => {
    try {
      const message: ClientMessage = JSON.parse(event.data);
      console.log("Client message type:", message.type);
      
      // Forward client messages to OpenAI
      if (openAISocket?.readyState === WebSocket.OPEN) {
        openAISocket.send(JSON.stringify(message));
      }
    } catch (error) {
      console.error("Error processing client message:", error);
    }
  };

  clientSocket.onclose = () => {
    console.log("Client disconnected");
    if (openAISocket?.readyState === WebSocket.OPEN) {
      openAISocket.close();
    }
  };

  clientSocket.onerror = (error) => {
    console.error("Client WebSocket error:", error);
    if (openAISocket?.readyState === WebSocket.OPEN) {
      openAISocket.close();
    }
  };

  return response;
};

Deno.serve(handleWebSocket);
