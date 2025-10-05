# Bradwell Music Website

A modern, responsive website built with React, TypeScript, and Vite for showcasing musical compositions and connecting with audiences.

## 🚀 Features

- **Modern React Architecture**: Built with React 18, TypeScript, and Vite for optimal performance
- **Responsive Design**: Mobile-first approach with Tailwind-inspired CSS utilities
- **Component-Based**: Modular, reusable components for easy maintenance
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Developer Experience**: ESLint, Prettier, and modern tooling for code quality
- **Music-Focused**: Specialized components and types for music-related content

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Custom CSS with CSS variables and utility classes
- **Routing**: React Router v6
- **Development**: ESLint, Prettier, TypeScript
- **Build**: Vite for fast development and optimized builds

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Layout components (Header, Footer, Layout)
│   ├── Navigation/    # Navigation components
│   └── UI/           # Basic UI components (Button, Card, etc.)
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── styles/           # Global styles and CSS
├── types/            # TypeScript type definitions
└── assets/           # Static assets (images, icons, etc.)
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 20.19+ or 22.12+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bradwell-music-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🎨 Styling

The project uses a custom CSS system with:
- CSS variables for consistent theming
- Utility classes for rapid development
- Responsive design patterns
- Modern CSS features

### CSS Variables

Key design tokens are defined in `src/styles/globals.css`:
- Color palette (primary, secondary, neutral colors)
- Typography scale
- Spacing system
- Border radius values
- Shadow definitions
- Transition timings

## 🧩 Component Development

### Creating New Components

1. Create a new component file in the appropriate directory
2. Use TypeScript interfaces for props
3. Follow the existing naming conventions
4. Include proper accessibility attributes
5. Add responsive design considerations

### Component Structure

```typescript
import React from 'react';
import { ComponentProps } from '../../types';

interface MyComponentProps extends ComponentProps {
  // Additional props specific to this component
}

const MyComponent: React.FC<MyComponentProps> = ({ 
  children, 
  className = '',
  // other props
}) => {
  return (
    <div className={`base-classes ${className}`}>
      {children}
    </div>
  );
};

export default MyComponent;
```

## 🎵 Music-Specific Features

The project includes specialized types and components for music-related content:

- **Track Management**: Types for individual tracks with metadata
- **Album Support**: Album structure with track listings
- **Playlist Functionality**: Playlist creation and management
- **Audio Integration**: Ready for audio player implementation

## 🔧 Development Guidelines

### Code Quality

- Use TypeScript for all new code
- Follow ESLint rules and fix warnings
- Format code with Prettier
- Write readable, maintainable code
- Prefer composition over inheritance

### Component Guidelines

- Keep components focused and single-purpose
- Use proper TypeScript interfaces
- Include accessibility attributes
- Make components responsive
- Follow naming conventions

### Styling Guidelines

- Use CSS variables for consistent theming
- Prefer utility classes for rapid development
- Ensure responsive design
- Maintain accessibility standards
- Keep styles organized and maintainable

## 🚀 Deployment

The project is configured for easy deployment:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure your server for SPA routing if needed

## 🤝 Contributing

1. Follow the existing code style
2. Use TypeScript for all new code
3. Write meaningful commit messages
4. Test your changes thoroughly
5. Update documentation as needed

## 📄 License

This project is private and proprietary. All rights reserved.

## 🆘 Support

For questions or support, please contact the development team or create an issue in the project repository.