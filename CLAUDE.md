# Playwright Learning Project — Context for Claude

---

## About This File
This file is read automatically by Claude Code at the start of every session.
It keeps track of progress, decisions, structure, and context so learning can continue
across multiple days without losing context.

---

## Project Goal
Build a solid, production-like Playwright testing framework covering UI and API testing,
using https://automationexercise.com/ as the practice test site.

---

## Learner Profile
- Beginner learning Playwright from scratch
- Wants step-by-step guidance with clear explanations of WHY, not just HOW
- Learning both UI automation and API testing
- Sessions may be spread across multiple days

**Teaching style for Claude:**
- Always explain what a concept is before implementing it
- Explain why we make each structural/architectural decision
- Keep code clean and consistent with what was written in previous steps
- Do not skip steps or rush ahead
- After completing a step, update this file and ask if the learner is ready for the next

**Claude workflow rules:**
- Whenever CLAUDE.md is updated, immediately commit and push it to GitHub

---

## Tech Stack & Tooling
| Tool | Purpose |
|------|---------|
| Playwright | Browser automation + API testing |
| TypeScript | Language (type safety, better IDE support) |
| Node.js | Runtime |
| Page Object Model | UI test architecture pattern |
| Playwright HTML Reporter | Test reporting |
| dotenv | Environment variable management |
| ESLint + Prettier | Code quality (Phase 5) |
| GitHub Actions | CI/CD (Phase 5) |

---

## Test Site: automationexercise.com

### Key UI Pages
| Page | URL |
|------|-----|
| Home | https://automationexercise.com/ |
| Login / Register | https://automationexercise.com/login |
| Products | https://automationexercise.com/products |
| Product Detail | https://automationexercise.com/product_details/{id} |
| Cart | https://automationexercise.com/view_cart |
| Checkout | https://automationexercise.com/checkout |
| Contact Us | https://automationexercise.com/contact_us |

### Key API Endpoints (base: https://automationexercise.com/api)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /productsList | Get all products |
| GET | /brandsList | Get all brands |
| POST | /searchProduct | Search product by name |
| POST | /login | Verify login (email + password) |
| POST | /createAccount | Register new user |
| DELETE | /deleteAccount | Delete user account |
| PUT | /updateAccount | Update user details |
| GET | /getUserDetailByEmail | Get user by email |

### Test User Credentials (update when created)
- Email: _(to be filled in when test account is created)_
- Password: _(to be filled in when test account is created)_

---

## Folder Structure (target)
```
PlaywrightProject/
├── CLAUDE.md                    # This file
├── package.json
├── playwright.config.ts         # Main Playwright config
├── tsconfig.json                # TypeScript config
├── .env                         # Environment variables (not committed)
├── .env.example                 # Template for .env
├── .gitignore
│
├── tests/
│   ├── ui/                      # UI test files
│   │   ├── auth.spec.ts         # Login, register, logout
│   │   ├── products.spec.ts     # Product listing, search, filter
│   │   ├── cart.spec.ts         # Add/remove from cart
│   │   └── checkout.spec.ts     # Checkout flow
│   └── api/                     # API test files
│       ├── products.api.spec.ts
│       ├── auth.api.spec.ts
│       └── user.api.spec.ts
│
├── pages/                       # Page Object Model classes
│   ├── BasePage.ts              # Shared methods all pages inherit
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── RegisterPage.ts
│   ├── ProductsPage.ts
│   ├── ProductDetailPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── fixtures/                    # Playwright fixtures (shared setup)
│   ├── index.ts                 # Exports all fixtures
│   ├── auth.fixture.ts          # Logged-in user session
│   └── api.fixture.ts           # API request context
│
├── utils/                       # Helper functions
│   ├── api-client.ts            # Wrapper for API calls
│   └── helpers.ts               # General utility functions
│
└── test-data/                   # Static test data
    ├── users.json               # User test data
    └── products.json            # Product test data
```

---

## Current Status
**Phase: 2 — UI Testing Foundation (in progress)**
**Last completed step: BasePage, LoginPage, HomePage, RegisterPage created**
**Next step: ProductsPage.ts**

---

## Roadmap & Progress

### Phase 1: Project Setup
- [x] Install Playwright and initialize the config
- [x] Set up folder structure (pages, tests, fixtures, utils, test-data)
- [x] Configure `playwright.config.ts` (base URL, browsers, reporters, timeouts)
- [x] Set up `.gitignore`, `.env`, `.env.example`, and `tsconfig.json`

### Phase 2: UI Testing Foundation
- [x] Create `BasePage.ts` with shared page methods
- [x] Create `LoginPage.ts` POM
- [x] Create `RegisterPage.ts` POM
- [x] Create `HomePage.ts` POM
- [ ] Create `ProductsPage.ts` POM
- [ ] Create `CartPage.ts` POM
- [ ] Create `CheckoutPage.ts` POM
- [ ] Write UI test: User registration
- [ ] Write UI test: User login & logout
- [ ] Write UI test: Product search & filtering
- [ ] Write UI test: Add to cart & checkout flow
- [ ] Write UI test: Form validations (negative cases)

### Phase 3: API Testing
- [ ] Understand Playwright's `request` context for API testing
- [ ] Write API test: GET /productsList
- [ ] Write API test: GET /brandsList
- [ ] Write API test: POST /searchProduct
- [ ] Write API test: POST /login (valid + invalid)
- [ ] Write API test: POST /createAccount
- [ ] Write API test: DELETE /deleteAccount
- [ ] Write mixed test: Create user via API then log in via UI

### Phase 4: Framework Features
- [ ] Create auth fixture (reuse logged-in state across tests)
- [ ] Create API fixture (shared request context)
- [ ] Set up test data JSON files
- [ ] Set up .env for environment config (base URL, credentials)
- [ ] Verify HTML reporter is configured and working

### Phase 5: Best Practices & Polish
- [ ] Add custom expect matchers/assertion helpers
- [ ] Configure retries and timeout strategy for flaky tests
- [ ] Set up ESLint + Prettier
- [ ] Create GitHub Actions workflow for CI
- [ ] Final review: folder structure, naming conventions, README

---

## Key Decisions & Reasons
| Decision | Reason |
|----------|--------|
| TypeScript over JavaScript | Better autocomplete, type safety, catches errors early |
| Page Object Model | Separates test logic from page interaction — easy to maintain |
| Fixtures for auth | Avoid repeating login steps in every test — DRY principle |
| dotenv for config | Never hardcode URLs/credentials — easy to switch environments |
| Separate ui/ and api/ test folders | Clear separation of concerns |

---

## Commands Reference (updated as we progress)
```bash
# Install dependencies
npm install

# Run all tests
npx playwright test

# Run only UI tests
npx playwright test tests/ui/

# Run only API tests
npx playwright test tests/api/

# Run tests in headed mode (see the browser)
npx playwright test --headed

# Run a specific test file
npx playwright test tests/ui/auth.spec.ts

# Open HTML report after test run
npx playwright show-report

# Run Playwright codegen (record actions)
npx playwright codegen https://automationexercise.com
```

---

## Notes / Things Learned
- `async/await` is required for every Playwright method that touches the browser
- `Promise<void>` = function finishes but returns nothing; `Promise<string>` = returns a string
- Sync functions are used for pure JavaScript logic (no browser interaction)
- Locator priority: `getByRole()` → `data-qa` attributes → `getByText()` → CSS → XPath (last resort)
- `data-qa` attributes are added by devs specifically for testing — most stable selectors
- TypeScript interfaces define the shape of objects and catch missing fields at compile time
- Optional interface fields use `?` — e.g. `company?: string`
- `selectOption()` for dropdowns, `check()` for checkboxes/radio buttons
- `.gitignore` prevents sensitive files (.env) and large folders (node_modules) from being committed
- `tsconfig.json` configures the TypeScript compiler — `strict: true` catches more mistakes early
