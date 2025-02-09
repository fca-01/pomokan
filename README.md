# Pomodoro Task Manager

A modern, feature-rich Pomodoro timer application with an integrated Kanban task board. Built with Next.js, TypeScript, and Tailwind CSS.

![Pomodoro Task Manager](https://productivity.cleverdeveloper.in/og.png)

## Features

- **Pomodoro Timer**

  - Customizable focus and break durations
  - Visual progress indicator
  - Auto-start option for sessions
  - Mini-widget for tracking time while scrolling
  - Support for both short and long breaks

- **Kanban Board**

  - Drag-and-drop task management
  - Three status columns: Not Started, In Progress, and Done
  - Persistent storage using localStorage
  - Smooth animations and transitions
  - Quick task addition and removal

- **User Interface**

  - Dark mode by default with system theme support
  - Responsive design for all screen sizes
  - Clean, modern UI with blur effects
  - Geist font family integration
  - Framer Motion animations

- **Spotify Integration**
  - View currently playing track information
  - Control playback (play, pause, skip)
  - See album artwork and track progress
  - Seamlessly integrate music with your Pomodoro sessions

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide Icons
- **Fonts**: Geist Sans & Geist Mono

## Prerequisites

- Node.js 18.17 or later
- pnpm 8.0 or later
- A Spotify Developer account (for Spotify integration)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/C-W-D-Harshit/time-focus.git
cd time-focus
```

2. Create and configure environment variables:

```bash
cp .env.example .env.local
```

3. Install dependencies:

```bash
pnpm install
```

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Spotify Configuration
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

## Project Structure

```typescript
src/
├── app/
│   ├── layout.tsx        # Root layout with theme provider
│   └── page.tsx          # Main application page
├── components/
│   ├── ui/              # Reusable UI components
│   ├── kanban/          # Kanban board components
│   │   ├── Board.tsx
│   │   ├── Column.tsx
│   │   └── Task.tsx
│   ├── pomodoro/        # Timer components
│   │   ├── Timer.tsx
│   │   ├── Settings.tsx
│   │   └── MiniWidget.tsx
│   └── spotify/         # Spotify integration components
├── lib/
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   └── constants.ts    # Application constants
└── styles/
    └── globals.css     # Global styles
```

## Contributing

1. Fork the repository
1. Create your feature branch:

   ```bash
   git checkout -b feature/amazing-feature
   ```

1. Commit your changes:

   ```bash
   git commit -m "feat: add amazing feature"
   ```

1. Push to the branch:

   ```bash
   git push origin feature/amazing-feature
   ```

1. Open a Pull Request

### Commit Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Framer Motion](https://www.framer.com/motion/) - Animation Library
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) - Music Integration

## Support

If you find this project helpful, please consider giving it a ⭐️ on GitHub!
