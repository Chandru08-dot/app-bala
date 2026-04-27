# Readable Mobile App - Setup & Run Guide

This is a React Native mobile app built with Expo that works on both iOS and Android. It connects to the existing FastAPI backend.

## 📋 Prerequisites

- **Node.js** 16+ and **npm** (or yarn)
- **Expo CLI** - Install globally: `npm install -g expo-cli`
- For iOS: **Xcode** on macOS (or Xcode Command Line Tools)
- For Android: **Android Studio** and Android SDK configured

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd readable/mobile-app
npm install
```

### 2. Configure Backend URL

Create a `.env` file in the `mobile-app` directory:

```env
EXPO_PUBLIC_API_URL=http://localhost:8000/api/v1
```

**For mobile device testing:** Replace `localhost` with your computer's IP address (e.g., `http://192.168.x.x:8000/api/v1`)

### 3. Start the Development Server

```bash
npm start
```

You'll see a QR code in the terminal.

### 4. Run on Device/Emulator

**iOS (Mac only):**
```bash
npm run ios
# Or use: i (in the Expo CLI)
```

**Android:**
```bash
npm run android
# Or use: a (in the Expo CLI)
```

**Using Expo Go App (Easiest):**
- Install **Expo Go** from App Store (iOS) or Play Store (Android)
- Scan the QR code shown in terminal

## 📱 Features Implemented

- ✅ **Authentication** - Login/Register screens
- ✅ **Home Dashboard** - Stats, recent sessions, quick lesson access
- ✅ **Lessons** - Browse and start lessons
- ✅ **Profile** - View user info and dyslexia profile
- ✅ **API Integration** - Connected to FastAPI backend
- ✅ **State Management** - Zustand for auth
- ✅ **Data Fetching** - React Query for server state
- ✅ **Bottom Navigation** - Tab-based navigation

## 📁 Project Structure

```
mobile-app/
├── src/
│   ├── app/              # Expo Router pages & navigation
│   │   ├── (auth)/       # Login/Register screens
│   │   └── (app)/        # Main app screens (home, lessons, profile)
│   ├── api/              # API client & endpoints
│   ├── store/            # Zustand state management
│   ├── types/            # TypeScript types
│   ├── components/       # Reusable components
│   └── hooks/            # Custom React hooks
├── app.json              # Expo configuration
├── package.json
├── tsconfig.json
└── babel.config.js
```

## 🔧 API Endpoints

The app connects to your FastAPI backend. Ensure these endpoints exist:

- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/register` - Register
- `GET /api/v1/lessons` - Get all lessons
- `GET /api/v1/lessons/{id}` - Get lesson details
- `POST /api/v1/sessions` - Start a session
- `GET /api/v1/students/profile` - Get student profile

## 🔐 Authentication

Login tokens are stored in memory (using Zustand). For production, you may want to:
- Store tokens in secure storage using `expo-secure-store`
- Implement token refresh logic

## 📦 Building for Production

### Android APK:
```bash
npm run build:android
```

### iOS App:
```bash
npm run build:ios
```

This uses **EAS (Expo Application Services)** for building.

## 🐛 Troubleshooting

**Backend connection issues:**
- Verify your backend is running on the correct port
- Check the `EXPO_PUBLIC_API_URL` in the code
- For mobile devices, use your computer's IP instead of localhost

**Dependency issues:**
```bash
npm install
npx expo prebuild --clean
```

**Port conflicts:**
```bash
npm start -- --clear
```

## 📝 Next Steps

1. Test authentication flows (login/register)
2. Connect remaining lesson endpoints
3. Add lesson reading/diagnostic screens
4. Implement voice/eye tracking if needed
5. Build production apps using EAS Build

## 🚢 Deployment

Once ready for production:

1. Create an EAS account: https://expo.dev
2. Configure `eas.json` for production builds
3. Run `eas build --platform all` to build for both platforms
4. Submit to App Store and Play Store

---

**Happy reading! 📚**
