# NETMovie – Backend (Express + MongoDB)

## Setup
```bash
# from the project root
npm run install:all
cp server/.env.example server/.env      # then edit MONGO_URI and JWT_SECRET
npm run seed                            # categories, movies, admin user
npm run server                          # API on http://localhost:5000/api
npm run dev                             # (second terminal) React on :5173
```
Vite proxies `/api` to port 5000, so no CORS setup is needed in development.
Default admin (from `.env`): admin@netmovie.com / Admin@12345 — change it.

## API
| Method | Route | Access | Notes |
|---|---|---|---|
| POST | /api/auth/register | public | `{name,email,password}` → `{token,user}` |
| POST | /api/auth/login | public | `{email,password}` → `{token,user}` |
| GET | /api/auth/me | user | Bearer token |
| GET | /api/movies | public | `?search=&category=&sort=newest\|rating\|year\|title&page=&limit=` |
| GET | /api/movies/trending | public | |
| GET | /api/movies/:id | public | |
| POST/PUT/DELETE | /api/movies[/:id] | admin | |
| GET | /api/categories | public | includes `movieCount` |
| POST/DELETE | /api/categories[/:id] | admin | |
| GET | /api/watchlist | user | |
| POST/DELETE | /api/watchlist/:movieId | user | |

Send the token as `Authorization: Bearer <token>`.
