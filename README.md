# Granny-AI

AI Bedtime story generator using Gemini 2.0 and Stable diffusion

## Tech Stack

- Next JS 14 - App Router
- shadcn/ui (UI components)
- Convex (Database / Backend)
- Gemini 2.0 (Content Generation)
- CompVis/stable-diffusion-v1-4 (Image Generation)
- React Icons (Icons)
- Tailwind CSS (Styling)
- Clerk (Authentication and User Management)

## Features

- [x] Authentication
- [x] CRUD Operations
- [x] Content Generation
- [x] Cover Image Generation
- [ ] Fork Story
- [ ] Customise Prompts from existing stories to generate new ones
- [ ] Dark Mode
- [ ] Vector Similarity based Recomendations
- [ ] Text to Speech

## Environment Variables

Set the following variables in your `.env` file

```python
NEXT_PUBLIC_GEMINI_API_KEY=
NEXT_PUBLIC_HUGGINGFACE_API_KEY=

# Deployment used by `npx convex dev`
CONVEX_DEPLOYMENT=d
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
CLERK_WEBHOOK_SECRET
```

## Run in Local

### Frontend

```bash
bun install
```

### Backend (Convex)

```bash
bunx convex dev
bunx convex dashboard #to open the WebUI
```