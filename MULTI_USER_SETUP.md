# Multi-User Setup Guide

This guide helps you run the app with different Supabase projects for different users.

## Current Setup

- **Original Environment**: `.env` (existing user/project)
- **Chandru's Environment**: `.env.chandru` (new user/project)

## Step-by-Step Instructions

### 1. Create New Supabase Project

1. Go to https://supabase.com/dashboard
2. Click **"New Project"**
3. Fill in:
   - Project Name: `shiny-gold-view-chandru`
   - Database Password: (create a secure one)
   - Region: Choose closest region
4. Click **"Create new project"** (wait ~2 minutes)

### 2. Get New Project Credentials

1. In your new project, go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: e.g., `https://xxxxx.supabase.co`
   - **Project API Key (anon public)**: Long JWT token
   - **Project Reference ID**: Short ID (like `xxxxx`)

### 3. Update `.env.chandru` File

Open `.env.chandru` and replace with your new project credentials:

```env
VITE_SUPABASE_PROJECT_ID="your_new_project_id"
VITE_SUPABASE_PUBLISHABLE_KEY="your_new_anon_key"
VITE_SUPABASE_URL="https://your_new_project_id.supabase.co"
```

### 4. Run Database Migrations

In your new Supabase project dashboard:

1. Go to **SQL Editor**
2. Click **"New Query"**
3. Copy the contents of `supabase/migrations/20260129151934_5d664c82-301d-4545-b99f-2a3bdab3bfd6.sql`
4. Paste and click **"Run"**

This creates the necessary tables and triggers for profiles.

### 5. Create User Account

In your new Supabase project:

1. Go to **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - Email: `chandru29450@gmail.com`
   - Password: `Chandru29450`
   - ✅ Auto Confirm User
4. Click **"Create user"**

### 6. Run the App with Different Environments

#### Option A: Use Quick Switch Scripts

```bash
# Run with Chandru's environment
npm run dev:chandru

# Or switch manually then run
npm run switch:chandru
npm run dev

# Switch back to original
npm run switch:original
npm run dev
```

#### Option B: Manual Switch

```bash
# For Windows PowerShell:
Copy-Item .env.chandru .env
npm run dev

# Or just rename files manually
```

## Two Separate Deployments

If you want BOTH environments running simultaneously:

### Terminal 1 (Original User):
```bash
npm run dev
# Runs on http://localhost:5173
```

### Terminal 2 (Chandru):
```bash
npm run switch:chandru
npm run dev -- --port 5174
# Runs on http://localhost:5174
```

Now you have:
- **http://localhost:5173** → Original project/user
- **http://localhost:5174** → Chandru's project/user

## Summary

- ✅ Each Supabase project has its own database
- ✅ Users in one project don't affect the other
- ✅ Each environment is completely isolated
- ✅ You can easily switch between them

## Security Note

🔒 Never commit `.env*` files with real credentials to git. They're already in `.gitignore`.
