# profile_app

A small Expo React Native app (Thai) demonstrating a user profile and book management UI.

Features
- Landing page with navigation (Profile, Books, Sign In, Sign Up)
- Profile page (UI)
- Books management pages: list/create, detail/edit/delete
- Authentication wired to a Classroom API (register / login / profile)
- Theme (light/dark) context

Files added/edited
- app/index.js — Landing page
- app/profile.js — Profile UI
- app/signin.js — Sign in form (calls API)
- app/signup.js — Sign up form (calls API)
- app/books/index.js — Books list + create
- app/books/[id].js — Book detail, update, delete
- theme/ThemeContext.js — existing theme provider
- auth/AuthContext.js — new Auth provider (register/login/token storage)
- app/_layout.js — wrapped with AuthProvider

API
This app expects a Classroom API running at `http://localhost:3000` (OpenAPI shown at `/api-docs`).
Important endpoints used:
- POST /api/auth/register  — register a user
- POST /api/auth/login     — login, returns token
- GET  /api/auth/profile   — get current user
- GET  /api/books          — list books
- POST /api/books          — create (requires Authorization)
- GET  /api/books/{id}     — get detail
- PUT  /api/books/{id}     — update (requires Authorization)
- DELETE /api/books/{id}   — delete (requires Authorization)

Notes about API_BASE
- Default API_BASE in code is `http://localhost:3000`.
- If you run the app on a physical device, replace API_BASE with your dev machine IP (e.g. `http://192.168.1.12:3000`) or use Expo tunnel.

Setup
1. Install dependencies

```powershell
npm install
npx expo install expo-secure-store react-dom react-native-web
```

2. Start Expo

```powershell
npx expo start
```

3. Test the API
- Make sure the Classroom API is running and reachable from your device.

Auth storage
- Token is stored using `expo-secure-store` under key `classroom_api_token`.

Customization
- To change the API URL, update `API_BASE` constants in:
  - `app/books/index.js`
  - `app/books/[id].js`
  - `auth/AuthContext.js`

Development notes
- The code attempts to support different API response shapes (some endpoints return `{ data: ... }`, others return direct arrays/objects).
- If your API has a different response shape for auth (e.g. `accessToken` vs `token`), update `auth/AuthContext.js` accordingly.

How to push to GitHub
- This repo already contains a git repo. If you have a remote `origin` configured, run:

```powershell
git add .
git commit -m "Add books management, auth context, landing page, README"
git push origin main
```

If push fails because there is no remote, create a GitHub repository and add a remote:

```powershell
git remote add origin https://github.com/<youruser>/<repo>.git
git push -u origin main
```

Checklist mapping to your request
- Show all books — implemented in `app/books/index.js` ✅
- Show book by id — implemented in `app/books/[id].js` ✅
- Edit book — `PUT /api/books/{id}` via `app/books/[id].js` ✅
- Delete book — `DELETE /api/books/{id}` via `app/books/[id].js` ✅
- Create book — `POST /api/books` via `app/books/index.js` ✅
- Improve UI — landing page and cards styled; theme-aware styles ✅

If you want, I can:
- Run the git commit and push for you now (I'll try; if remote/auth not configured I will report the exact error),
- Adjust any API response parsing once you provide an example response JSON,
- Add UI improvements (icons, exact spacing/colors) to match the screenshot more closely.

