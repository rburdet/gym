export const runtime = 'edge';

// Define a KV namespace interface for TypeScript
interface KVNamespace {
  get: (key: string, type?: 'text' | 'json' | 'arrayBuffer' | 'stream') => Promise<any>;
  put: (key: string, value: string | ReadableStream | ArrayBuffer, options?: { expirationTtl?: number }) => Promise<any>;
  delete: (key: string) => Promise<any>;
  list: (options?: { prefix?: string; limit?: number; cursor?: string }) => Promise<{ keys: Array<{ name: string }>, list_complete: boolean, cursor?: string }>;
}

// Define environment type
interface Env {
  WORKOUT_DATA: KVNamespace;
}

// API endpoint to record a workout
export async function POST(request: Request, env: Env) {
  try {
    const body = await request.json() as { userId?: string; date?: string };
    const { userId, date } = body;
    
    if (!userId || !date) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: userId and date' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // In production, save to Cloudflare KV
    if (env.WORKOUT_DATA) {
      try {
        const KV = env.WORKOUT_DATA;
        
        const key = `workout:${userId}:${date}`;
        const value = JSON.stringify({
          userId,
          date,
          completedAt: new Date().toISOString(),
        });
        
        await KV.put(key, value);
        
        return new Response(
          JSON.stringify({ 
            success: true,
            message: 'Workout recorded successfully'
          }),
          { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      } catch (error) {
        console.error('Error recording workout to KV:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to record workout to KV' }),
          { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    }
    
    // For development, just log
    console.log(`Mock: Recording workout for user ${userId} on ${date}`);
    
    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Workout recorded successfully (development mode)'
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error recording workout:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to record workout' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
} 