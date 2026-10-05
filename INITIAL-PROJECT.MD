Build a local React project based on the existing HTML study guide file below.

SOURCE FILE:
`Materi_Persiapan_Technical_Test_JS_Frontend_Backend_BSI_Interactive_Expanded.html`

First, READ AND ANALYZE THE ENTIRE HTML FILE before writing code.

The HTML file is the primary source of truth for the content, structure, wording, topics, checklists, and interactive behavior. Do not remove or substantially rewrite existing learning materials. Preserve the important terminology, explanations, examples, interview questions, and learning structure from the source file.

## Project

Create a modern interactive study web application called:

**FE/BE Interview Prep**

Repository/project name:

**fe-be-prep**

Tech stack:

* React
* Vite
* JavaScript / JSX
* CSS
* LocalStorage
* No backend required
* The application must run locally with `npm run dev`
* It should be deployable to Vercel later

Do NOT use Next.js unless there is a strong technical reason.

## Main objective

Transform the existing large standalone HTML study guide into a properly structured React application.

The application should be useful as a personal study and interview-preparation tool for:

1. Frontend
2. Backend
3. JavaScript

The existing HTML contains the detailed learning materials. Reuse that content instead of inventing a completely different curriculum.

## Important source-content rule

The source HTML must be fully read before implementation.

Extract and organize its existing content into maintainable React data/components.

Do not simply embed the entire HTML using `dangerouslySetInnerHTML`.

Convert the content into React components/data structures where practical.

Preserve:

* headings
* explanations
* interview questions
* examples
* tables
* checklists
* rapid-fire questions
* interview preparation guidance
* Performance Test Engineer experience positioning
* Frontend material
* Backend material
* JavaScript material
* security material
* Kafka
* Redis
* Spring Boot
* database
* microservices
* system design
* live coding material

If the source HTML contains information that is not obvious from the project structure, keep it rather than silently deleting it.

## Application structure

Create a clean structure similar to:

src/
components/
Layout/
Sidebar/
Header/
TrackTabs/
ProgressBar/
Chapter/
TopicCard/
QuestionCard/
Checklist/
Search/
data/
javascript.js
frontend.js
backend.js
interview.js
hooks/
utils/
App.jsx
main.jsx
index.css

You may adjust the structure if there is a better React architecture.

## Main navigation

The application should have three primary tracks:

### JavaScript

For JavaScript fundamentals and advanced concepts.

### Frontend

For React and browser/frontend concepts.

### Backend

For Spring Boot, API, database, Kafka, Redis, microservices, and related backend concepts.

There should also be an interview/prediction area containing likely technical-test questions.

Use a clear sidebar or top navigation.

The user should be able to switch between tracks without losing progress.

## Dashboard

Create a useful dashboard showing:

* overall study progress
* JavaScript progress
* Frontend progress
* Backend progress
* number of completed topics
* number of remaining topics

Use progress bars/cards.

Progress must persist after refreshing the browser.

Use LocalStorage.

## Checklist system

Every major topic/chapter should have a checkbox.

When checked:

* save immediately to LocalStorage
* update progress
* persist after browser refresh

Do not use only React state for progress.

Create a stable ID for every topic so progress remains associated with the correct topic even after reload.

Also include:

* Mark complete
* Unmark complete
* Reset progress
* optional “complete all” per track

If the original HTML already contains checklist behavior, preserve its intended functionality.

## Search

Add a global search feature.

The user should be able to search across:

* JavaScript
* Frontend
* Backend
* interview questions

Search should display matching topics/questions and allow navigation to the result.

Search should be case-insensitive.

## Interview question mode

Create a section for likely technical interview questions.

Questions should be organized into:

* Frontend
* Backend
* JavaScript
* Security
* Database
* Kafka/Redis
* System Design
* Personal Experience / Background

Each question should support:

* question
* answer/explanation
* optionally key points

The source HTML already contains many likely questions. Preserve them.

## Important questions from the source

Pay particular attention to these topics because they are relevant to the actual technical test context:

Frontend:

* Why does `useEffect` run again?
* Dependency array
* Object/reference equality
* `Object.is`
* React re-render
* State vs props
* `useMemo`
* `useCallback`
* stale closure
* cleanup
* React keys
* controlled vs uncontrolled
* API loading/error handling
* XSS
* CSRF
* CORS
* authentication vs authorization

Backend:

* weaknesses of microservices
* `@Transactional`
* transaction propagation
* transaction isolation
* Spring Controller annotations
* IoC / Dependency Injection
* Controller / Service / Repository
* DTO vs Entity
* `@ControllerAdvice`
* `@Valid`
* Kafka
* partition
* consumer group
* offset
* duplicate messages
* idempotency
* Redis
* cache invalidation
* cache-aside
* REST API
* HTTP methods/status codes
* database index
* JOIN
* N+1 query
* ACID
* synchronous vs asynchronous communication
* retry
* timeout
* circuit breaker
* observability
* system design

JavaScript:

* `var`, `let`, `const`
* scope
* hoisting
* TDZ
* closure
* `this`
* arrow function
* prototype
* shallow vs deep copy
* map/filter/reduce
* destructuring
* spread/rest
* callback
* Promise
* async/await
* Promise.all/allSettled/race/any
* event loop
* debounce
* throttle
* event bubbling/capturing

## Personal background section

Preserve the source material explaining how to position the user's Performance Test Engineer background.

The application should include a dedicated section such as:

**"How to Answer as a Performance Test Engineer"**

Topics include:

* why moving from Performance Test to Development
* how performance testing experience relates to backend
* how to explain API/database/log/infrastructure experience
* how to explain a performance bottleneck
* functional bug vs performance issue

Do not exaggerate the user's professional development experience.

The positioning should remain honest:
the user has professional Performance Test experience and is transitioning toward development.

## UX requirements

Make the application clean and comfortable for studying.

Requirements:

* responsive desktop/mobile layout
* sticky sidebar on desktop
* collapsible sidebar on mobile
* clear active track
* clear active chapter
* readable typography
* code blocks where appropriate
* tables for comparisons
* cards for interview questions
* visual distinction between important/high-priority topics
* progress indicators
* smooth scrolling where useful
* back-to-top button
* no excessive animations

The application should feel like a real study/productivity tool rather than a plain HTML document.

## Dark/light theme

If practical, add a theme toggle:

* Light
* Dark

Persist the selected theme using LocalStorage.

Do not let theme implementation interfere with study progress.

## Data architecture

Do not hard-code every chapter directly inside huge JSX components.

Prefer structured data, for example:

```js
{
  id: "frontend-useeffect",
  title: "useEffect",
  priority: "high",
  topics: [...],
  questions: [...]
}
```

Keep learning content in `src/data/`.

Components should render the data.

## Code quality

Use:

* reusable React components
* sensible component boundaries
* descriptive variable names
* no unnecessary dependencies
* no duplicated UI logic
* accessible buttons/inputs
* semantic HTML where appropriate

Avoid overengineering.

This is a study application, not a production enterprise system.

## README

Create a README containing:

* project description
* features
* tech stack
* how to install
* how to run locally
* how to build
* how to deploy to Vercel
* project structure
* future improvements

Example commands:

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Development process

Before coding:

1. Read the entire source HTML.
2. Understand its existing navigation and progress behavior.
3. Identify all major sections and topics.
4. Identify all interview questions.
5. Identify all interactive features.
6. Map them into React components/data.
7. Then implement.

After implementation:

1. Run the project locally.
2. Run the production build.
3. Fix all build/runtime errors.
4. Verify navigation.
5. Verify LocalStorage progress.
6. Verify search.
7. Verify all three tracks.
8. Verify responsive layout.
9. Verify that no major content from the source HTML was accidentally omitted.

If you need to make design or architecture decisions that are not explicitly specified above, prefer the simplest maintainable solution.

Most importantly:

**The existing HTML study guide is the source of truth for the learning content. Read it completely and preserve its useful material while converting it into a clean React application.**
