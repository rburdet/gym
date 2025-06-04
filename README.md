# Train - Gym Routine App

A lightweight gym routine tracker built with Vite, React, TypeScript, and Tailwind CSS.

## Features

- 📅 7-day workout routine display
- 📊 Activity heatmap to track workout consistency
- 📱 Responsive design for mobile and desktop
- 🎯 Daily workout focus with automatic day selection
- ⚡ Fast loading with Vite
- 🎨 Modern UI with Tailwind CSS and shadcn/ui components

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Custom components inspired by shadcn/ui
- **Date Utilities**: date-fns
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This app is designed to be deployed to **train.rburdet.com** using Cloudflare Pages.

### Cloudflare Pages Deployment

1. Connect your GitHub repository to Cloudflare Pages
2. Set the build command to: `npm run build`
3. Set the build output directory to: `dist`
4. Configure the custom domain: `train.rburdet.com`

## Project Structure

```
src/
├── components/
│   └── ui/          # Reusable UI components
├── data/            # Workout configuration
├── lib/             # Utility functions
├── App.tsx          # Main application component
├── main.tsx         # Application entry point
└── index.css        # Global styles and Tailwind imports
```

## Features Overview

### Workout Routine

- Complete 7-day workout schedule
- Organized by warmup, main exercises, and elongation
- Detailed exercise information with sets, reps, and weights

### Activity Tracking

- Visual heatmap showing workout consistency
- Click to mark today's workout as completed
- Historical view of completed workouts

### Responsive Design

- Mobile-first approach
- Horizontal scrolling tabs on mobile
- Grid layout on desktop

## Customization

You can customize the workout routine by editing `src/data/workout-config.ts`.

## Related Projects

- **Main Portfolio**: [rburdet.com](https://rburdet.com)
- **Cars Project**: [autos.rburdet.com](https://autos.rburdet.com)
- **Olympics Project**: [wind.rburdet.com](https://wind.rburdet.com)

## License

MIT License
