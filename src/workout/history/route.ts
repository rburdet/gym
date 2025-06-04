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

// API endpoint to get workout history (dates of completed workouts)
export async function GET(request: Request, env: Env) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    
    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameter: userId' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // In production, fetch from Cloudflare KV
    if (env.WORKOUT_DATA) {
      try {
        const KV = env.WORKOUT_DATA;
        
        // List all workouts for this user
        const prefix = `workout:${userId}:`;
        const { keys } = await KV.list({ prefix });
        
        // Extract dates from keys
        // Keys are in format: workout:<userId>:<date>
        const dates = keys.map((key: { name: string }) => {
          const parts = key.name.split(':');
          return parts[2]; // The date part
        }).sort();
        
        return new Response(
          JSON.stringify({ dates }),
          { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      } catch (error) {
        console.error('Error fetching workout history from KV:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to fetch workout history from KV' }),
          { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    }
    
    // For local development - generate mock data
    const today = new Date();
    const mockDates = [];
    
    for (let i = 0; i < 30; i++) {
      // Only include some dates (random)
      if (Math.random() > 0.6) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Format as YYYY-MM-DD
        const dateStr = date.toISOString().split('T')[0];
        mockDates.push(dateStr);
      }
    }
    
    return new Response(
      JSON.stringify({ dates: mockDates.sort() }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error fetching workout history:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch workout history' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
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