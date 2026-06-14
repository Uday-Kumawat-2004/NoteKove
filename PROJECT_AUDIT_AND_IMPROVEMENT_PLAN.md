# NoteKove Project Audit and Improvement Plan

This document is a developer + technical-interviewer style review of the current NoteKove codebase. The goal is not to add new product features yet. The goal is to make the existing project correct, secure, maintainable, polished, and strong enough to discuss on a resume.

## Target Outcome

NoteKove should become a resume-ready full-stack notes app with:

- Reliable authentication and authorization.
- Clean backend API structure.
- Predictable frontend data flow.
- Consistent error, loading, and empty states.
- Responsive UI for common viewport sizes.
- Clear setup instructions.
- Meaningful tests around core flows.
- README claims that match the real app.

## Current Assessment

The project has a good foundation:

- React + Vite frontend.
- Express + MongoDB backend.
- JWT cookie authentication.
- Notes, labels, archive, trash, checklist, rich text, and search.

However, the code currently feels like a working prototype. The main issues are not missing features; they are correctness, structure, security, consistency, and polish.

## Backend Audit

### Critical Issues

1. Environment variables are not validated.
   - `MONGO_URI` and `JWT_SECRET` are required, but the app does not fail early with clear messages.
   - Impact: confusing startup failures and unsafe auth behavior if secrets are missing.
   - Fix: create a central `config/env.js` module that validates required environment variables.

2. Controllers trust `req.body.user`.
   - Several controllers use `req.user?._id || req.body.user`.
   - Impact: a malicious client could attempt to act as another user if route protection is weakened or misconfigured.
   - Fix: always use `req.user._id` for protected resources.

3. Note updates accept unrestricted fields.
   - `updateNote` sends `req.body` directly into `findOneAndUpdate`.
   - Impact: clients can update fields that should be server-controlled, such as `user`, timestamps, or invalid schema values.
   - Fix: whitelist updateable fields before writing to MongoDB.

4. Trash and permanent delete semantics are incorrect.
   - Backend delete route only soft-deletes.
   - Frontend "Delete Permanently" calls the same soft-delete endpoint.
   - Cron removes trashed notes after around 1 minute.
   - Impact: confusing behavior and possible data loss.
   - Fix: separate soft delete, restore, and permanent delete routes.

5. User serialization is configured incorrectly.
   - `userSchema.set('toJSON')` is inside the password hashing hook.
   - Impact: password hiding is not cleanly defined and model code looks incorrect in review.
   - Fix: move `toJSON` config outside middleware.

### High Priority Improvements

1. Split route handlers from route declarations.
   - Current auth routes contain business logic directly.
   - Create controllers such as `authController.js`.

2. Add centralized error handling.
   - Current errors are handled manually and inconsistently.
   - Add `asyncHandler`, `notFoundHandler`, and `errorHandler` middleware.

3. Add request validation.
   - Validate signup, signin, note create/update, label create/update.
   - Use a consistent validation library or small local validators.

4. Normalize API responses.
   - Example success shape:
     `{ success: true, data: ... }`
   - Example error shape:
     `{ success: false, error: { message, code, details } }`

5. Clean route protection.
   - Avoid mixing global `app.use(protect)` with route-level `protect` unless intentional.
   - Make route protection obvious from each route file or route group.

6. Add ownership checks everywhere.
   - Notes and labels must always be scoped to authenticated user.
   - Label IDs attached to notes should belong to the same user.

7. Improve cookie security configuration.
   - Use environment-based `secure`, `sameSite`, and allowed CORS origin.
   - Add logout route that clears the cookie.

8. Replace regex search with safer bounded search behavior.
   - Escape regex input or use MongoDB text indexes.
   - Add query length limits.

9. Remove unused imports and logs.
   - Example: unused `searchNotes` import in `server.js`.
   - Remove debug `console.log(decoded)` from auth middleware.

### Backend Testing Checklist

- Signup success.
- Signup duplicate email.
- Signup validation failures.
- Signin success sets cookie.
- Signin invalid credentials.
- Protected route rejects missing/invalid cookie.
- Create note attaches authenticated user only.
- User cannot read/update/delete another user's note.
- Label CRUD is scoped to user.
- Soft delete moves note to trash.
- Restore removes trash state.
- Permanent delete actually removes note.
- Search only returns current user's notes.

## Frontend Audit

### Critical Issues

1. API URLs are hard-coded throughout the app.
   - Many files call `http://localhost:4000`.
   - Impact: deployment and environment changes become painful.
   - Fix: create `src/lib/api.js` using `import.meta.env.VITE_API_URL`.

2. No real frontend auth state.
   - Users can directly navigate to protected pages.
   - Impact: poor UX and weak app flow.
   - Fix: add `AuthProvider`, session check, protected routes, and logout.

3. UI does not reliably refresh after mutations.
   - Creating, updating, pinning, deleting, restoring notes often leaves stale UI.
   - Impact: user sees outdated state.
   - Fix: centralize note fetching/mutations or pass refetch callbacks.

4. Alerts and debug logs make the app feel unfinished.
   - `alert()` and `console.log()` appear in core flows.
   - Impact: not portfolio-grade.
   - Fix: use inline messages or toast-style local UI.

5. Fixed-width layout breaks responsiveness.
   - Note cards and editor use `w-[750px]`.
   - Impact: poor mobile/tablet presentation.
   - Fix: use `w-full max-w-3xl`, responsive padding, and layout constraints.

### High Priority Improvements

1. Create an API client.
   - `src/lib/api.js`
   - Configure base URL and credentials once.
   - Export functions or route-specific services.

2. Create service modules.
   - `services/authService.js`
   - `services/noteService.js`
   - `services/labelService.js`

3. Create shared layout.
   - `AppLayout` should own `Header`, `SideDrawer`, and main content.
   - Reduce repeated page code in Home, Archive, Trash, Search, LabelPage.

4. Clean component names and typos.
   - `EditingFeild` -> `EditingField`
   - `isRemiderOpen` -> `isReminderOpen`
   - `updateFeilds` -> `updateFields`

5. Make note mutations predictable.
   - After save/update/delete/restore, update local state or refetch.
   - Do not require full page reload or navigation.

6. Improve form handling.
   - Replace ref-heavy auth forms with controlled state or a form helper.
   - Avoid blocking paste/copy in password fields; that harms password-manager UX.

7. Improve loading and empty states.
   - Use consistent loading, error, and empty components.
   - Avoid bare `Loading...` pages.

8. Remove invalid/accidental JSX and class names.
   - Remove stray `j` prop in `SideDrawer`.
   - Fix typo class `bg-gray-6y00`.

9. Replace browser alerts.
   - Use non-blocking UI messages.
   - Keep success/error messaging consistent.

10. Make search robust.
   - Debounce search input.
   - Handle empty search consistently.
   - Cancel stale requests or ignore stale responses.

### Frontend Testing Checklist

- Signup form validation.
- Signin success redirects to home.
- Signin error displays message.
- Protected route redirects unauthenticated user.
- Notes list renders loading, error, empty, and data states.
- Create note clears form and refreshes list.
- Pin/unpin updates visible state.
- Move to trash removes note from normal list.
- Restore removes note from trash list.
- Label page filters notes by label.
- Search displays matching notes and empty state.

## Resume-Ready Implementation Phases

### Phase 1: Stabilize Configuration and Setup

Goal: Anyone can clone and run the project without guessing.

Tasks:

- Add `Backend/.env.example`.
- Add `Frontend/.env.example`.
- Add central backend env validation.
- Add frontend `VITE_API_URL`.
- Update README setup instructions.
- Make backend default port match frontend API expectation.

Done when:

- Missing env vars produce clear errors.
- README instructions work from a fresh clone.
- No hard-coded API URLs remain in frontend.

### Phase 2: Backend Security and Correctness

Goal: Existing backend behavior becomes safe and consistent.

Tasks:

- Remove all `req.body.user` fallbacks.
- Move auth route logic into controllers.
- Add validation for auth/note/label payloads.
- Whitelist note update fields.
- Fix user model `toJSON`.
- Add logout route.
- Fix cookie options by environment.
- Remove debug logs and unused imports.

Done when:

- User ownership cannot be spoofed.
- Invalid payloads return `400`.
- Auth errors return `401`.
- Duplicate conflicts return `409`.
- Protected resources use only authenticated user identity.

### Phase 3: Backend Resource Semantics

Goal: Notes, labels, trash, archive, and search behave exactly as named.

Tasks:

- Separate soft delete and permanent delete.
- Keep trash retention reasonable and configurable.
- Ensure archive/trash/pin transitions are explicit.
- Validate labels before attaching them to notes.
- Escape or constrain search input.
- Add indexes for common queries.

Done when:

- "Move to trash" soft-deletes.
- "Restore" restores.
- "Delete permanently" permanently deletes.
- Cron cleanup is understandable and documented.

### Phase 4: Frontend Data Layer Cleanup

Goal: Frontend communicates with backend through one clean layer.

Tasks:

- Create Axios client.
- Create auth/note/label services.
- Replace direct `axios` and `fetch` calls inside components.
- Normalize frontend error handling.
- Add reusable mutation patterns or refetch callbacks.

Done when:

- Components do not contain raw API URLs.
- Components mostly call services/hooks.
- UI updates after mutations without manual reload.

### Phase 5: Frontend Auth and Routing

Goal: App routes match authenticated user state.

Tasks:

- Add `AuthProvider`.
- Add session check route/backend endpoint or cookie validation flow.
- Add `ProtectedRoute`.
- Redirect signed-in users away from auth pages.
- Add logout UI and behavior.

Done when:

- `/home`, labels, archive, trash, and search require auth.
- Unauthenticated users go to signin.
- Logout clears session and returns user to signin.

### Phase 6: UI and UX Polish

Goal: Existing features feel deliberate and finished.

Tasks:

- Replace alerts with app-level messages.
- Remove console logs.
- Fix typos and naming.
- Create `AppLayout`.
- Make cards/editor responsive.
- Add consistent loading/error/empty states.
- Improve modal accessibility basics: close button, escape handling, focus behavior.
- Make action buttons visible enough on touch devices.

Done when:

- App looks usable on desktop and mobile widths.
- No debug output remains.
- Core flows feel smooth without page reloads.

### Phase 7: Testing and Quality Gates

Goal: The project can be trusted and defended in interviews.

Tasks:

- Add backend test setup.
- Add backend API tests for auth, notes, labels.
- Add frontend tests for major user flows.
- Add lint/build/test commands to README.
- Optionally add GitHub Actions later.

Done when:

- `npm run lint` passes.
- `npm run build` passes.
- Backend tests cover ownership and auth.
- Frontend tests cover main flows.

### Phase 8: README and Resume Packaging

Goal: The repo presents like a polished engineering project.

Tasks:

- Update README to match actual features.
- Remove claims that are not implemented or verified.
- Add screenshots.
- Add architecture overview.
- Add API documentation.
- Add testing instructions.
- Add "Engineering Decisions" section.

Done when:

- README is honest, clear, and impressive.
- A recruiter can understand the project quickly.
- A technical interviewer can see thoughtful engineering tradeoffs.

## Interview Talking Points

Use these after the cleanup:

- "I built a full-stack notes app with JWT cookie authentication and MongoDB ownership isolation."
- "I refactored the backend from route-level prototype code into controllers, validators, middleware, and consistent API responses."
- "I fixed authorization risks by removing client-controlled user IDs and scoping all note/label queries to the authenticated user."
- "I centralized the frontend API layer and replaced hard-coded URLs with environment-based configuration."
- "I improved UI reliability by making mutations refresh state predictably."
- "I added tests around auth, ownership, and note lifecycle flows."

## What Not To Add Yet

Do not add these until the cleanup is complete:

- Image uploads.
- Collaboration.
- Notifications.
- AI features.
- Public sharing.
- Mobile app.
- Advanced themes.

These can become later roadmap items, but they should not distract from making the existing project excellent.

## Recommended First Commit Sequence

1. `chore: add env examples and config validation`
2. `refactor: centralize frontend api client`
3. `fix: remove client-controlled user ownership`
4. `fix: whitelist note update fields`
5. `fix: separate trash and permanent delete behavior`
6. `refactor: split backend controllers and middleware`
7. `refactor: add shared frontend app layout`
8. `fix: refresh notes after mutations`
9. `style: clean debug logs alerts and responsive note layout`
10. `test: add auth and note lifecycle coverage`
11. `docs: update resume-ready readme`

