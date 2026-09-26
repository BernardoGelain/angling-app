# Angling

Expo app for a fishing log. The package name is FishQuest. It covers a sample feed, species, catch entry, rankings, stats, achievements, and a profile.

## What it is

A React Native interface organized with Expo Router: an auth group and a tab group. Species, catches, and rankings rendered in the app come from data declared in the screen files.

## Why it exists

To exercise a mobile product surface — navigation, cards, and a catch log — without a backend in this repository.

## Highlights

- Routes are files. `(auth)` holds login and register. `(tabs)` holds the main sections.
- Styling is NativeWind, with a small set of local UI primitives (button, card, input, tabs).
- There is no API client. React Query is installed; the screens do not call a server.
- Sign-in writes a placeholder value to SecureStore and moves to the feed. It does not verify a password against a service.
- Catch photos in the sample feed are remote placeholder images.

## Tech

Expo SDK 54, Expo Router, React Native, React 19, TypeScript, NativeWind

## Running locally

Requirements: Node.js 18+.

```bash
npm install
npx expo start
```

Use the Expo dev tools to open iOS, Android, or web. The feed and species lists work offline from the sample data in the repository.
