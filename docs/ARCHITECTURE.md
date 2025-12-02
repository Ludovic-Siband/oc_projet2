# Architecture refactoring plan

## 1. Problems identified in the starter
- No clear separation between pages, components, services, and models.
- Components mixing responsibilities (data access, business logic, rendering, navigation).
- No dedicated data layer → impossible to switch from mocks to backend easily.
- No readable folder structure.
- Heavy components (chart + navigation + logic + template).
- No clear organisation for shared resources (UI components, models, services).

---

## 2. Architecture goals
- Adopt a **feature-first** and **standalone** Angular structure.
- Organize code in logical blocks: pages, shared components, core UI, services, models.
- Use **services as Singletons** for data access.
- Use **models** to define domain types.
- Decouple UI from business logic.
- Prepare future integration with a real backend (HTTP API instead of mocks).
- Keep the structure simple, without unnecessary nesting.

---

## 3. New folder structure (final proposal)

```
src/app/
├── app.config.ts
├── app.routes.ts
├── app.ts
├── app.html
├── app.scss
│
├── core/ # transversal system-level UI
│ ├── layout/
│ │ └── header/
| | └── footer,etc...
│ └── toast/
│
├── shared/ 
│ ├── models/
│ ├── services/
│ └── components/
│
├── pages/ 
│ ├── home/
│ ├── country/
│ └── not-found/
```

---

## 4. Explanation of each block

### `core/`
Purpose: infrastructure UI and transversal mechanisms.
- `layout/header` → page header (title + indicators).
- `toast/` → global toast system (service + UI component).
These elements are not domain-specific and are used by multiple pages.

### `shared/`
Purpose: shareable assets.
- `models/` → domain data types (`Participation`, `Olympic`).
- `services/` → data access layer (`OlympicDataService`) using Singleton pattern.
- `components/` → reusable UI components (`PieChart`).

### `pages/`
Purpose: feature containers (Dashboard, Country Detail, Not Found).
- Each page contains its standalone component + HTML + SCSS + spec.
- Page components orchestrate state, navigation, and connect to services.

---

## 5. Design patterns used

### ✔ Singleton (Services)
All services (`providedIn: 'root'`) are instantiated only once.
→ Perfect for data access, caching and API communication.

### ✔ Separation of concerns
- Page = container (navigation, state, orchestration)
- Shared components = visual display (no logic)
- Service = data source (HTTP/mocks)
- Models = typed domain contracts

### ✔ Feature-first
Avoids “component/module hell”.
Easier to scale when adding features.

### ✔ Future-ready data architecture
Moving from mocks → HTTP API only requires modifying `shared/services`.

---

## 6. Benefits of this architecture
- Clear and predictable file organisation.
- Better maintenability and readability.
- Easier onboarding for a new developer.
- Pages stay lightweight and focused.
- Data access is centralized and stable.
- Easy transition from mock JSON → real backend.
- Reusable components kept in a dedicated, structured area.
- The architecture aligns with Angular standalone best practices.

---

## 7. Final note
This structure defines the foundation for all future implementations.
It ensures:
- coherence,
- scalability,
- and clean separation between presentation, logic, and data.