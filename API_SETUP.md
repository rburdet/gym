# API Setup for Workout Tracker

This project uses Cloudflare Workers with KV for persistent workout history storage.

## Development Setup

### 1. Start Development Server

```bash
npm run dev
```

The app will run on `http://localhost:5173/` and will use mock data during development.

### 2. API Endpoints

- `GET /workout/history?userId=user-1` - Get workout history for a user
- `POST /workout/record` - Record a completed workout
  ```json
  {
    "userId": "user-1",
    "date": "2025-06-04"
  }
  ```

## Production Deployment (Cloudflare Workers)

### 1. Create KV Namespace

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create KV namespace for production
wrangler kv:namespace create "WORKOUT_DATA"
```

### 2. Update wrangler.toml

Replace the KV namespace ID in `wrangler.toml` with the ID from step 1.

### 3. Deploy to Cloudflare Workers

```bash
# Build the project
npm run build

# Deploy using Wrangler
wrangler deploy
```

## File Structure

```
├── src/
│   ├── api/
│   │   └── workout-history.ts    # Client-side API service
│   ├── workout/
│   │   ├── history/
│   │   │   └── route.ts          # GET /workout/history
│   │   └── record/
│   │       └── route.ts          # POST /workout/record
│   └── App.tsx                   # Updated to use API service
└── wrangler.toml                 # Cloudflare configuration
```

## How It Works

### Development
- Route files provide mock data for testing
- No external dependencies needed

### Production  
- Cloudflare Workers handle API requests
- Data is stored in/retrieved from Cloudflare KV
- Routes are automatically deployed with your worker

## KV Data Structure

Workout completions are stored with keys in the format:
```
workout:{userId}:{date}
```

Example:
- Key: `workout:user-1:2025-06-04`
- Value: `{"userId":"user-1","date":"2025-06-04","completedAt":"2025-06-04T13:45:30.123Z"}`

## Environment Variables

KV binding is configured in `wrangler.toml` and available as `env.WORKOUT_DATA` in your route handlers. 