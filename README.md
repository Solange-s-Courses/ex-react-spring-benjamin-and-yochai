## Word Guessing Game — React + Spring Boot

A full-stack word guessing game built with a React frontend and a Spring Boot backend. Players choose a category, guess letters to reveal a random word, and submit scores to a global leaderboard. Admins can manage the word list (add/update/delete) via dedicated endpoints.

### Tech Stack
- **Frontend**: React (CRA), React Router, Axios, Bootstrap
- **Backend**: Spring Boot 3, Java 24
- **Persistence**: File-based serialization (`words.ser`, `scores.ser`)
- **Dev Proxy**: Frontend → `http://localhost:8080`

---

## Project Structure

```
ex-react-spring-benjamin-and-yochai/
├─ pom.xml
├─ src/main/java/com.example.ex3reactspringbenjaminandyochai/
│  ├─ Ex3ReactSpringBenjaminAndYochaiApplication.java
│  ├─ controllers/
│  │  ├─ GameController.java        # /game endpoints
│  │  ├─ AdminController.java       # /admin/words CRUD
│  │  └─ ErrorController.java       # centralized error handling
│  ├─ services/
│  │  ├─ WordsService.java          # words.ser load/save, random-by-category, CRUD
│  │  └─ ScoreService.java          # scores.ser load/save, best-per-nick
│  ├─ model/
│  │  ├─ WordEntry.java             # {word, hint, category}
│  │  ├─ ScoreEntry.java            # {nickname, score}
│  │  └─ ErrorResponse.java         # {status, message}
│  └─ dao/
│     └─ FormData.java              # {nickname, category}
├─ words.ser                        # word store (generated/loaded at runtime)
├─ scores.ser                       # leaderboard store (generated/loaded at runtime)
└─ ex3-fronted/                     # React app (Create React App)
   ├─ package.json
   └─ src/
      ├─ App.js                     # routes: /, /game, /leaderboard, /admin, /about
      ├─ components/                # UI + forms
      ├─ hooks/                     # data fetching, init, timer, errors
      └─ reducers/                  # gameReducer
```

---

## Features

- **Game**
  - Choose a category, start a game, guess letters/full word
  - Timer, attempt tracking, hint reveal
  - Win state leads to score submission
- **Leaderboard**
  - Best score per nickname
- **Admin**
  - Manage words (add/update/delete)
- **Error Handling**
  - Backend returns structured errors; frontend shows user-friendly messages

---

## Prerequisites

- Java 24 (JDK)
- Node.js 18+ and npm
- Maven (or use the included `mvnw`/`mvnw.cmd`)
- Windows/macOS/Linux

---

## Getting Started

### 1) Backend — Spring Boot

From the project root:

- Windows:
```bash
mvnw.cmd spring-boot:run
```

- macOS/Linux:
```bash
./mvnw spring-boot:run
```

The API will run at `http://localhost:8080`.

Build a JAR:
- Windows:
```bash
mvnw.cmd clean package
```
- macOS/Linux:
```bash
./mvnw clean package
```

Run the JAR:
```bash
java -jar target/ex3-react-spring-benjamin-and-yochai-0.0.1-SNAPSHOT.jar
```

### 2) Frontend — React

From `ex3-fronted/`:

```bash
npm install
npm start
```

The dev server runs at `http://localhost:3000` and proxies API calls to `http://localhost:8080` (see `package.json` "proxy").

---

## API Reference

Base URL: `http://localhost:8080`

### Game (`/game`)
- `GET /game/categories`
  - Response: `string[]` (unique categories)

- `POST /game/start`
  - Body: `{ "nickname": "Alice", "category": "Animals" }`
  - Response: `WordEntry`
    - `{ "word": "tiger", "hint": "Big cat", "category": "Animals" }`
  - 404 if no word found in category

- `POST /game/finish`
  - Body: `ScoreEntry`
    - `{ "nickname": "Alice", "score": 120 }`
  - Upserts best score per nickname

- `GET /game/leaderboard`
  - Response: `ScoreEntry[]`

### Admin (`/admin/words`)
- `GET /admin/words`
  - Response: `WordEntry[]`

- `POST /admin/words`
  - Body: `WordEntry`
  - 409 if word already exists

- `PUT /admin/words`
  - Body: `WordEntry`
  - 404 if word not found

- `DELETE /admin/words`
  - Body: `WordEntry` (uses `word` to delete)
  - 400 if missing word, 404 if not found

### Error Format
- `ResponseStatusException` is formatted as:
```json
{ "status": 404, "message": "cannot find word" }
```

---

## Frontend Routes

- `/` — Home: rules, start form (nickname + category)
- `/game` — Gameplay (initialized via navigation state)
- `/leaderboard` — Leaderboard table
- `/admin` — Word management UI
- `/about` — Info page
- `/*` — 404

---

## Data Models

- `WordEntry`
```json
{ "word": "tiger", "hint": "Big cat", "category": "Animals" }
```

- `ScoreEntry`
```json
{ "nickname": "Alice", "score": 120 }
```

- `FormData` (start game)
```json
{ "nickname": "Alice", "category": "Animals" }
```

- `ErrorResponse`
```json
{ "status": 404, "message": "cannot find word" }
```

---

## Persistence Notes

- Files `words.ser` and `scores.ser` are created/loaded in the project root.
- Ensure the process has read/write permissions in the working directory.
- Deleting these files resets words/leaderboard.

---

## Development Tips

- The frontend uses Axios with a CRA proxy (`"proxy": "http://localhost:8080"`).
- When handling Axios errors on the frontend, prefer `error.response?.status` and `error.response?.data` over `error.status`.
- React Router v7 is used; navigation state initializes gameplay in `Game`.

---

## Scripts

### Backend
- `spring-boot:run`: Run the API locally
- `clean package`: Build the JAR

### Frontend (from `ex3-fronted/`)
- `npm start`: Start dev server
- `npm test`: Run tests
- `npm run build`: Production build

---

## Troubleshooting

- Frontend cannot fetch categories:
  - Ensure backend is running on `8080`
  - Check CRA proxy in `ex3-fronted/package.json`
- File permission errors:
  - Verify write permissions for `words.ser` and `scores.ser`
- Axios errors not showing correct status:
  - Use `error.response?.status` and `error.response?.data` checks

---

## Authors

- Yochai Benita — `yochaiben@edu.jmc.ac.il`
- Benjamin Rosin — `benjaminro@edu.jmc.ac.il`
