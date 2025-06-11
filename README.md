# React Native Expo Router Project Structure 2025

This project follows modern React Native best practices with Expo Router for file-based routing and co-located components for better maintainability.

## 📁 Folder Structure

```bash
my-app/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── index.tsx
│   │   ├── register/
│   │   │   └── index.tsx
│   │   └── _layout.tsx
│   ├── (tabs)/
│   │   ├── index/
│   │   │   └── index.tsx
│   │   ├── profile/
│   │   │   └── index.tsx
│   │   └── _layout.tsx
│   ├── modal/
│   │   └── index.tsx
│   ├── _layout.tsx
│   └── +not-found.tsx

├── features/
│   ├── login/
│   │   ├── components/
│   │   │   └── LoginHeader.tsx
│   │   └── hooks/
│   │       └── useLoginForm.ts
│   ├── profile/
│   │   ├── components/
│   │   │   └── ProfileHeader.tsx
│   │   └── hooks/
│   │       └── useProfileData.ts
│   ├── settings/
│   │   ├── components/
│   │   │   └── SettingsGroup.tsx
│   │   └── hooks/
│   │       └── useSettings.ts

├── components/
│   ├── ui/
│   │   └── Button.tsx
│   ├── forms/
│   │   └── LoginForm.tsx
│   └── common/
│       └── LoadingSpinner.tsx

├── hooks/
│   └── useAuth.ts

├── services/
│   ├── api/
│   │   └── client.ts
│   └── auth/
│       └── authService.ts

├── store/
│   ├── slices/
│   │   └── authSlice.ts
│   └── providers/
│       └── AuthProvider.tsx

├── utils/
│   ├── validation/
│   │   └── schemas.ts
│   ├── formatters/
│   │   └── date.ts
│   └── constants.ts

├── styles/
│   └── theme.ts

├── assets/
│   ├── images/
│   └── fonts/

├── types/
│   └── user.ts

├── config/
│   └── env.ts

├── .env
├── app.json
├── package.json
└── tsconfig.json

```

## 🏗️ Architecture Overview

### 📱 App Directory Structure

The `app/` directory uses **Expo Router** for file-based routing with the following conventions:

- **Route Groups**: `(auth)`, `(tabs)` - Group related routes without affecting URL structure
- **Layouts**: `_layout.tsx` - Define shared UI for route groups
- **Screen Folders**: Each screen has its own folder for better organization
- **Co-located Components**: Screen-specific components live next to their screens

### 🧩 Component Organization

#### Screen-Specific Components

Each screen folder contains:

- `components/` - Components used only by that screen
- `hooks/` - Custom hooks specific to that screen
- `sections/` - For complex screens that need further organization
- `index.ts` - Barrel exports for clean imports

#### Shared Components

- `components/ui/` - Base UI components (Button, Input, etc.)
- `components/forms/` - Reusable form components
- `components/navigation/` - Navigation-related components
- `components/common/` - Common utility components

### 🔧 Key Features

- **Co-located Architecture**: Screen components live next to their screens
- **Barrel Exports**: Clean imports using `index.ts` files
- **TypeScript First**: Full TypeScript support throughout
- **Modern State Management**: Zustand or Redux Toolkit options
- **Performance Optimized**: MMKV for storage, Reanimated 3 for animations

## 📋 Usage Examples

### Screen Component Import

```tsx
// app/(tabs)/profile/index.tsx
import { ProfileHeader, ProfileStats, ProfileActions } from "./components";
import { useProfileData, useProfileUpdate } from "./hooks";

export default function ProfileScreen() {
  const { profile, loading } = useProfileData();
  const { updateProfile } = useProfileUpdate();

  return (
    <View>
      <ProfileHeader profile={profile} />
      <ProfileStats stats={profile?.stats} />
      <ProfileActions onUpdate={updateProfile} />
    </View>
  );
}
```

### Shared Component Import

```tsx
// Using shared UI components
import { Button, Input, Card } from "@/components/ui";
import { LoadingSpinner } from "@/components/common";
```

## 🔄 When to Move Components

### Keep Screen-Specific When:

- Component is tightly coupled to screen logic
- Component uses screen-specific data structures
- Component is unlikely to be reused elsewhere

### Move to Shared When:

- Component is used in 2+ screens
- Component has no screen-specific dependencies
- Component provides general UI functionality

## 🚀 Benefits

- **Easy Maintenance**: Related code is co-located
- **Clear Ownership**: No confusion about component ownership
- **Scalable**: Each screen can grow independently
- **Clean Imports**: Barrel exports keep imports organized
- **Easy Refactoring**: Simple to move components when needed

## 📦 Recommended Dependencies

```json
{
  "dependencies": {
    "expo": "^52.0.0",
    "expo-router": "^4.0.0",
    "react-native": "^0.75.0",
    "react": "^18.3.0",
    "zustand": "^5.0.0",
    "zod": "^3.23.0",
    "react-native-mmkv": "^3.0.0",
    "react-native-reanimated": "^3.15.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-native": "^0.75.0",
    "typescript": "^5.5.0"
  }
}
```

This structure follows 2025 best practices for React Native development with Expo Router and provides a solid foundation for scalable mobile applications.
