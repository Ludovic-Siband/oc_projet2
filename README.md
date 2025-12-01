# 🏅 Olympic Games Dashboard

## 📑 Table of Contents
1. [Overview](#overview)
2. [Technical Stack](#technical-stack)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the App](#running-the-app)
   - [Build for production](#build-for-production)
4. [Project Structure](#project-structure)
5. [Features Implemented](#features-implemented)
6. [Architecture Principles](#architecture-principles)
7. [Design Decisions](#design-decisions)
8. [UI Screenshot](#ui-screenshot)

---

## Overview

This Angular 18 application is a refactored and improved version of the TéléSport *Olympic Games* starter.  
It provides:

- A **Dashboard** that displays total medals per country using a pie chart.
- A **Country Detail** page containing participation statistics and a medal evolution chart.
- A **fully modernized architecture** using standalone components, signals, and feature-first organization.

The UI is **responsive**, **accessible**, and follows clean separation of responsibilities.


---

## Technical Stack

### **Frontend**
- Angular 18
  - Standalone components
  - Angular Signals
  - inject() API
  - Feature-first architecture
  - OnPush change detection
- RxJS (modern operators)
- TypeScript (strict mode)
- SCSS modules
- Chart.js

### **Tooling**
- Angular CLI
- Conventional commits
- Git workflow

---

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js ≥ 18  
- Angular CLI ≥ 18  
- npm, pnpm, or yarn  

---

### Installation

```sh
git clone <repository-url>
cd olympic-games
npm install
```

### Running the App

```sh
ng serve
```

Visit: http://localhost:4200/

### Build for production

```sh
ng build
```

---

## Project structure

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

## Features Implemented

Comming soon

---

## Architecture Principles

**Single Responsibility** :
Every component, service, and model has a clearly defined purpose.

**Container vs. Presentational Components** :

- Containers → handle logic, call services, update header.
- Presentation components → pure UI.

**Standalone Angular** :
Each component imports its own dependencies — no NgModules.

**Signals Everywhere**

Used for:

- loading states
- computed KPIs
- reactive views: No manual subscriptions needed.

**Routing Strategy**

- `/` → Dashboard
- `/country/:id` → Detailed statistics
- Invalid routes handled gracefully

---

## Design Decisions

**Why Angular Signals?**

They eliminate the need to manage subscriptions manually and give predictable reactive state.

**Why feature-first?**

It scales better, keeps related files together, and avoids huge shared folders.

**Why a reusable HeaderComponent?**

Both main pages needed the same structure — DRY and maintainability.

**Why a dedicated data service?**

Specifications state that data must be centralized (no hardcoded arrays in components).

**Why extract models?**

Ensures type safety and allows the same domain types to be reused across features.

---

## UI Screenshot

Comming soon