# Sukoon Data Flow Diagram

## System Overview

```mermaid
graph TB
    subgraph Client
        UI[User Interface]
        LC[Local Storage Cache]
    end

    subgraph Components
        direction TB
        Nav[Navigation]
        Chat[AI Chat]
        Mood[Mood Tracker]
        Journal[Journal]
        Breath[Breathing Exercises]
        Comm[Community]
        Res[Resources]
        Well[Wellness Tools]
    end

    subgraph Data_Storage
        LS[Local Storage]
        DB[(Future Database)]
    end

    subgraph External_Services
        AI[AI Service]
        Auth[Authentication]
    end

    %% User Interactions
    User((User)) --> UI
    UI --> Components

    %% Component Data Flow
    Components --> LC
    LC --> LS
    
    %% Individual Component Flows
    Chat --> AI
    AI --> Chat
    
    Mood --> LS
    Journal --> LS
    Comm --> DB
    
    %% Authentication Flow
    Auth --> UI
    UI --> Auth
```

## Component-Level Data Flow

### 1. Journal Component
```mermaid
graph TB
    subgraph Journal_Flow
        JE[Journal Entry]
        JL[Entry List]
        JC[Calendar View]
        LS[Local Storage]
        
        JE -->|Save Entry| LS
        LS -->|Load Entries| JL
        JC -->|Select Date| JE
        JL -->|Select Entry| JE
    end
```

### 2. Mood Tracker Component
```mermaid
graph TB
    subgraph Mood_Flow
        ME[Mood Entry]
        MC[Mood Calendar]
        MH[Mood History]
        LS[Local Storage]
        
        ME -->|Save Mood| LS
        LS -->|Load History| MH
        MC -->|View Date| ME
        MH -->|Display Trends| MC
    end
```

### 3. Breathing Exercise Component
```mermaid
graph TB
    subgraph Breathing_Flow
        BE[Exercise Selection]
        BT[Timer]
        BP[Progress]
        BS[Session State]
        
        BE -->|Start Exercise| BT
        BT -->|Update| BP
        BP -->|Save| BS
        BS -->|Load| BE
    end
```

## Data Models

### Journal Entry
```typescript
type JournalEntry = {
    id: string
    date: string
    title: string
    content: string
}
```

### Mood Entry
```typescript
type MoodEntry = {
    id: string
    date: string
    mood: "great" | "good" | "okay" | "bad" | "awful"
    note: string
}
```

### Community Post
```typescript
type Post = {
    id: string
    author: {
        name: string
        avatar: string
    }
    content: string
    likes: number
    comments: number
    time: string
}
```

## Data Flow Description

1. **User Authentication**
   - User authentication state is managed globally
   - Auth tokens stored in secure HTTP-only cookies
   - Protected routes require valid authentication

2. **Local Storage**
   - Journal entries stored with unique IDs
   - Mood entries tracked with timestamps
   - User preferences and settings cached
   - Exercise progress saved locally

3. **State Management**
   - Component-level state using React useState
   - Shared state handled through context
   - Real-time updates for interactive features

4. **External Services**
   - AI chat integration for mental health support
   - Future database integration for community features
   - Authentication service for user management

5. **Data Persistence**
   - Automatic saving of journal entries
   - Real-time mood tracking updates
   - Progress tracking for exercises
   - Community interactions stored in database

6. **Error Handling**
   - Failed API calls gracefully degraded
   - Local storage fallbacks
   - User feedback for data operations
   - Retry mechanisms for network issues 