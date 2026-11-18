# Mood Change

A calm mobile app that guides a people back to each other after a mood change or conflict. It walks you through the **RAIN** method one step at a time, with breathing, short exercises and a gentle sense of "we are in this together".

## The RAIN method

| Step | Idea |
| --- | --- |
| **R**ecognise | Notice a mood change and say it out loud. |
| **A**llow | Breathe to stay calm and let the emotion be there. |
| **I**nvestigate | Name what you feel and where it sits in your body. |
| **N**urture | Switch back to love: let go, reconnect, finish together. |

## Features

- Home screen with the four steps and a start button
- Swipeable process screens (forward only) with a step indicator and pagination
- Guided breathing exercise with an animated sun
- Emotion and body-area pickers
- "Let go" animation, love affirmation audio and reconnect options

## Tech stack

- [Expo](https://expo.dev) SDK 58 and React Native 0.88
- React 19 and TypeScript
- [Expo Router](https://docs.expo.dev/router/introduction/) for file-based navigation
- `expo-audio` for the affirmation audio
- `react-native-svg` with `react-native-svg-transformer` to use `.svg` files as components
- React Native `Animated` API (native driver) for all animations
- Lora and Inter fonts via `@expo-google-fonts`

## Getting started

```bash
npm install
npx expo start
```

The app uses native modules (such as `expo-audio`), so use a development build rather than Expo Go:

```bash
npx expo run:ios      # or: npx expo run:android
```

Checks:

```bash
npx tsc --noEmit      # typecheck
npx expo lint         # lint
```

## Project structure

```
src/
  app/          screens and routes (Expo Router)
  components/   reusable UI components
  constants/    theme: colours, fonts, typography, spacing
assets/
  icons/        SVG illustrations and icons
  audio/        love affirmation soundtrack
```

## About & credtis

**Illustrations:** All images and SVG graphics in this app were created with the help of AI.

**RAIN method:** Mood Change is inspired by the RAIN mindfulness practice
(Recognise, Allow, Investigate, Nurture) developed by Michele McDonald.
We have adapted it in our own way to help people handle a mood change. 
This app is not affiliated with or endorsed by either of them.

**Not a substitute for professional help:** Mood Change supports self-reflection
and does not replace therapy, counselling or medical advice.

© 2026 Mood Change. All rights reserved.
