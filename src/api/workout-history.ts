// Types for the workout history API
export interface WorkoutHistoryResponse {
  dates: string[];
}

export interface WorkoutHistoryError {
  error: string;
}

// Function to get workout history
export async function getWorkoutHistory(userId: string): Promise<WorkoutHistoryResponse> {
  const response = await fetch(`/workout/history?userId=${encodeURIComponent(userId)}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch workout history: ${response.statusText}`);
  }
  
  return response.json();
}

// Function to record a workout completion
export async function recordWorkout(userId: string, date: string): Promise<void> {
  const response = await fetch('/workout/record', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, date }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to record workout: ${response.statusText}`);
  }
} 