# Project Documentation – Notepad+++

This document contains the full documentation for the Notepad+++ application, created for modules **M294 (Frontend)** and **M295 (Backend)**.

---

## 1. Project Idea

### Overview

With this app you can create notes and directories for different ideas and project to keep them clean and structured.

Simply create a idea/project directory for example, Holiday trip ideas. Then open that directory and create notes for everything you need to keep track off.

You can add as many notes as you want inside a directory and name them accordingly like Hotels, Restaurants, or Sightseeing Activities.

If you need to change something in a note, just click and edit it. If a note is no longer relevant, delete it. Once a project is finished, you can remove the whole directory.

### Purpose

Have you ever tried to build your own note-taking system? Maybe on paper? Or with something like OneNote?

The problem with paper is it gets messy. Notes get lost, mistakes are hard to fix, and organizing multiple topics is nearly impossible.

And while OneNote seems like a digital solution, it often ends up cluttered. You might have experienced this: you're deep into a project and need to find a note from the beginning but everything is buried. The structure is gone, and you’re back to square one.

Here’s the solution:
A simple, clean, and minimalistic note-taking app that lets you organize your notes by project or idea.
It’s a bit like digital sticky notes — but smarter, more structured, and impossible to lose.

---

## 2. Requirements

### Functional Requirements

- The user can create a note directory and assign it a custom name.
- The user can create notes inside a selected directory and name them individually.
- The user can view the content of each note.
- The user can edit a note and add or change its content.
- The user can delete individual notes.
- The user can delete entire directories when they are no longer needed.

---

### UI/UX Functional Flow (Frontend-Specific Behaviour)

#### Directory Sidebar

- A sidebar displays all note directories.
- A “Create Directory” button opens a pop-up with a name input field.
- New directories appear in the sidebar, sorted by creation date.
- Each directory has a trash can icon to delete it (with confirmation dialog).
- Clicking a directory shows all its notes in the main section.

#### Notes Display & Interaction

- The main section shows notes belonging to the selected directory.
- A “Create Note” button opens a pop-up with:
  - A title input field
  - A multiline text field
  - A confirm/create button
- Created notes appear as cards (squares) in the main area.

#### Note Management

- Clicking a note opens a pop-up showing the note’s content.
- The pop-up includes:
  - An “Edit Note” button to enable editing
  - A “Delete Note” button (with confirmation dialog)
  - A “Done Editing” button to save changes
  - A “Close (X)” button to close the pop-up
- After deleting a note, it is removed from the UI immediately.
- Deleting a directory also removes all contained notes and resets the main screen.

---

### Non-Functional Requirements

- The application should load quickly and respond within 1 second to CRUD actions.
- The system must persist all data in a MySQL database (via Docker).
- The backend must validate all inputs and return proper error messages.
- The UI should give user feedback (loading states, error/success toasts).
- The system must include basic unit tests for both frontend and backend logic.
- The application must be installable via a short and clear setup guide.

---

## 3. Use Cases

### Use Case 1: Create Folder

- **Actor**: User
- **Preconditions**: User is on the main view of the application
- **Steps**:
  1. User clicks the "Create Directory" button in the sidebar
  2. A pop-up appears asking for the folder name
  3. User enters a name and confirms
- **Expected Result**:  
  A new directory appears in the sidebar, sorted by creation date

---

### Use Case 2: Add Note to Folder

- **Actor**: User
- **Preconditions**: A folder is selected
- **Steps**:
  1. User clicks the "Create Note" button in the main section
  2. A pop-up appears with a title field and a text field
  3. User enters note content and clicks "Create"
- **Expected Result**:  
  A new note card appears in the main section, linked to the selected folder

---

### Use Case 3: View and Edit Note

- **Actor**: User
- **Preconditions**: At least one note exists in the selected folder
- **Steps**:
  1. User clicks on a note card
  2. A pop-up appears showing the note content
  3. User clicks "Edit Note"
  4. User changes the content and clicks "Done Editing"
- **Expected Result**:  
  The note is updated and saved; the updated content is shown in the note pop-up

---

### Use Case 4: Delete Note

- **Actor**: User
- **Preconditions**: At least one note exists
- **Steps**:
  1. User clicks on a note card
  2. In the pop-up, user clicks the "Delete Note" button
  3. A confirmation dialog appears
  4. User confirms deletion
- **Expected Result**:  
  The note is permanently deleted and removed from the main section

---

### Use Case 5: Delete Folder

- **Actor**: User
- **Preconditions**: At least one folder exists
- **Steps**:
  1. User clicks the trash can icon next to a folder name in the sidebar
  2. A confirmation dialog appears
  3. User confirms deletion
- **Expected Result**:  
  The folder and all contained notes are deleted; the main view resets

---

## 4. Class Diagram

### Diagram

![Class Diagram](./img/class-diagram.png)

### Entities & Relationships

- **Folder**

  - `id` (Long): Unique identifier
  - `name` (String): Folder title
  - `createdAt` (Timestamp): Date of creation
  - **Relationship**: One folder can have many notes

- **Note**
  - `id` (Long): Unique identifier
  - `title` (String): Note title
  - `content` (Text): The main text of the note
  - `createdAt` (Timestamp): Date of creation
  - `folderId` (Long): Foreign key referencing the owning folder

**Relationship:**  
One `Folder` → has many `Note`  
One `Note` → belongs to one `Folder`

---

## 5. REST API

### Overview

The REST API exposes endpoints for managing **users**, **folders**, and their associated **notes**.  
Authentication is handled via JWT, with role-based access control for user and admin operations.

### Endpoints

#### Authentication Endpoints

| Method | Endpoint           | Description                     | Request Body        | Response            |
| ------ | ------------------ | ------------------------------- | ------------------- | ------------------- |
| POST   | `/auth/register`  | Register a new user             | RegisterRequestDto | Registered user DTO |
| POST   | `/auth/login`     | Authenticate user and issue JWT | LoginRequestDto    | JWT + user data     |

#### Admin Endpoints

| Method | Endpoint                    | Description                              | Request Body              | Response           |
| ------ | --------------------------- | ---------------------------------------- | ------------------------- | ------------------ |
| GET    | `/admin/users`              | List all registered users (ADMIN only)   | –                         | List of users      |
| PUT    | `/admin/users/{id}/password`| Reset password of a user (ADMIN only)    | ResetPasswordRequestDto   | 204 No Content     |

#### User Endpoints

| Method | Endpoint          | Description                      | Request Body            | Response        |
| ------ | ----------------- | -------------------------------- | ----------------------- | --------------- |
| GET    | `/user`           | Get authenticated user profile  | –                       | AppUser         |
| PUT    | `/user/password`  | Update own password              | ResetPasswordRequestDto | 204 No Content  |

#### Folder Endpoints

| Method | Endpoint        | Description               | Request Body | Response        |
| ------ | --------------- | ------------------------- | ------------ | --------------- |
| GET    | `/folders`      | List all folders          | –            | List of folders |
| GET    | `/folders/{id}` | Get a single folder       | –            | Folder + notes  |
| POST   | `/folders`      | Create new folder         | Folder JSON  | Created folder  |
| DELETE | `/folders/{id}` | Delete folder & its notes | –            | 204 No Content  |

#### Note Endpoints

| Method | Endpoint              | Description           | Request Body | Response       |
| ------ | --------------------- | --------------------- | ------------ | -------------- |
| GET    | `/folders/{id}/notes` | Get notes in a folder | –            | List of notes  |
| POST   | `/folders/{id}/notes` | Add note to folder    | Note JSON    | Created note   |
| GET    | `/notes/{id}`         | Get single note       | –            | Note JSON      |
| PUT    | `/notes/{id}`         | Update existing note  | Note JSON    | Updated note   |
| DELETE | `/notes/{id}`         | Delete note           | –            | 204 No Content |


### Data Models

#### Folder (Request/Response)

```json
{
  "id": 1,
  "name": "Holiday Ideas",
  "createdAt": "2025-06-28T10:00:00Z"
}
```

#### Note (Request/Response)

```json
{
  "id": 12,
  "title": "Hotel research",
  "content": "Check out Booking.com and compare prices.",
  "createdAt": "2025-06-28T10:15:00Z",
  "folderId": 1
}
```

---

## 6. Test Plan

### Environment

- Node.js / React
- Spring Boot
- MySQL (Docker)
- Browser: Chrome
- Tools: Postman, JUnit, Jest

---

### 6.1 Manual API testing (Postman)

| Test ID | Endpoint                 | Description                   | Expected Status | Status |
| ------- | ------------------------ | ----------------------------- | --------------- | ------ |
| TC01    | POST /folders            | Create folder                 | 200 OK          | ✓      |
| TC02    | GET /folders             | Get all folders               | 200 OK          | ✓      |
| TC03    | GET /folders/{id}        | Get folder by ID              | 200 OK          | ✓      |
| TC04    | POST /folders/{id}/notes | Add note to folder            | 200 OK          | ✓      |
| TC05    | GET /folders/{id}/notes  | Get notes in folder           | 200 OK          | ✓      |
| TC06    | GET /notes/{id}          | Get single note by ID         | 200 OK          | ✓      |
| TC07    | PUT /notes/{id}          | Update existing note          | 200 OK          | ✓      |
| TC08    | GET /folders/{id}        | Verify note appears in folder | 200 OK          | ✓      |
| TC09    | DELETE /notes/{id}       | Delete note                   | 204 No Content  | ✓      |
| TC10    | DELETE /folders/{id}     | Delete folder and its notes   | 204 No Content  | ✓      |

---

### Summary (6.1 Manual API Testing)

- Total Tests: 10
- Passed: 10
- Failed: 0
- Blocked: 0

---

### 6.2 Backend Unit Tests (JUnit)

| Test ID | Class / Method                                   | Description                                                   | Expected Result                              | Status |
| ------- | ------------------------------------------------ | ------------------------------------------------------------- | -------------------------------------------- | ------ |
| TC11    | FolderService.getAllFolders                      | Returns a list of mapped FolderDto objects                    | List size matches mock repository            | ✓      |
| TC12    | FolderService.getFolderById                      | Returns single FolderDto                                      | DTO with matching ID is returned             | ✓      |
| TC13    | FolderService.createFolder                       | Maps DTO to entity, saves, and returns DTO                    | Created folder DTO returned                  | ✓      |
| TC14    | FolderService.deleteFolderById                   | Deletes folder if it exists                                   | Repository delete method is called           | ✓      |
| TC15    | NoteService.getNotesInFolder                     | Returns list of notes for a given folder ID                   | List of NoteDto returned                     | ✓      |
| TC16    | NoteService.getNoteById                          | Retrieves single note by ID                                   | Matching NoteDto returned                    | ✓      |
| TC17    | NoteService.createNote                           | Creates a new Note under an existing folder                   | Saved NoteDto is returned                    | ✓      |
| TC18    | NoteService.updateNoteById                       | Updates existing note content/title                           | Changes saved and returned                   | ✓      |
| TC19    | NoteService.deleteNote                           | Deletes note if it exists                                     | Repository delete called                     | ✓      |
| TC20    | NoteService.deleteNote (fail)                    | Throws if note does not exist                                 | Exception is thrown                          | ✓      |
| TC21    | AppUserService.registerUser                     | Registers a new user with encoded password                    | User saved with hashed password              | ✓      |
| TC22    | AppUserService.registerUser (username exists)   | Prevents registration when username already exists            | IllegalArgumentException thrown              | ✓      |
| TC23    | AppUserService.registerUser (email exists)      | Prevents registration when email already exists               | IllegalArgumentException thrown              | ✓      |
| TC24    | AppUserService.findByEmail                      | Retrieves user by email                                       | Matching AppUser returned                    | ✓      |
| TC25    | AppUserService.findByUsername                   | Retrieves user by username                                    | Matching AppUser returned                    | ✓      |
| TC26    | AppUserService.authenticateUser                 | Authenticates user with correct credentials                   | Authenticated user returned                  | ✓      |
| TC27    | AppUserService.authenticateUser (fail)          | Rejects authentication with incorrect password                | Empty result returned                        | ✓      |
| TC28    | AppUserService.authenticateUser (not found)    | Handles authentication when user does not exist               | Empty result returned                        | ✓      |
| TC29    | AppUserService.updatePassword                   | Updates password for existing user                            | Encoded password saved                       | ✓      |
| TC30    | AppUserService.updatePassword (not found)       | Throws when updating password for non-existent user           | 404 exception is thrown                      | ✓      |
| TC31    | AppUserService.updatePasswordUser               | Updates password using provided AppUser instance              | Encoded password saved                       | ✓      |

#### Summary

- Total Tests: 21
- Passed: 21
- Failed: 0
- Blocked: 0

---

### 6.3 Manual Frontend Testing

| Test ID | Feature       | Description                                                            | Expected Result                                                  | Status |
| ------- | ------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------- | ------ |
| TC21    | Create Folder | Clicking "New Folder" opens a form; after confirming, folder appears   | New folder is shown in the sidebar                               | ✓      |
| TC22    | Select Folder | Clicking on a folder in the sidebar                                    | Notes in that folder are shown; "New Note" button visible        | ✓      |
| TC23    | Create Note   | Clicking "New Note" opens a form; after confirming, note is created    | New note appears in the main area                                | ✓      |
| TC24    | Read Note     | Clicking on a note                                                     | Note content is displayed                                        | ✓      |
| TC25    | Update Note   | Clicking "Edit Note" allows editing; after confirming, note is updated | Updated content is saved and displayed                           | ✓      |
| TC26    | Delete Note   | Clicking on a note → "Delete" → confirm                                | Note is deleted and removed from the main screen                 | ✓      |
| TC27    | Delete Folder | Clicking the X button next to a folder and confirming deletion         | Folder is removed from sidebar and all related notes are deleted | ✓      |

#### Summary

- Total Tests: 7
- Passed: 7
- Failed: 0
- Blocked: 0

### 6.4 Frontend Unit Tests (Vitest)

| Test ID | Component / Feature | Description                             | Expected Result                       | Status |
| ------- | ------------------- | --------------------------------------- | ------------------------------------- | ------ |
| TC28    | NoteCard            | Renders title and triggers onClick      | Note title appears, click is handled  | ✓      |
| TC29    | FolderItem          | Renders folder and handles delete/click | Name shown, delete and click work     | ✓      |
| TC30    | PopupNote           | Handles form input and triggers create  | Note is submitted, onCreate is called | ✓      |

#### Summary (Frontend Unit)

- Total Tests: 3
- Passed: 3
- Failed: 0
- Blocked: 0

---

## 7. Installation Instructions

### Backend Setup

**Requirements:**

- Java 17+
- Maven
- Docker & Docker Compose

**Steps:**

1. Clone the repo:

```bash
git clone https://github.com/dein-benutzername/notepad---.git
cd notepad+++
```

2. Run MySQL container:

```bash
cd db
docker compose up -d
```

3. Run the Spring Boot application:

```bash
cd backend
./mvnw spring-boot:run
```

### Frontend Setup

**Requirements:**

- Node.js
- npm

**Steps:**

1. Change to frontend directory:

```bash
cd frontend/
```

2. Install packages:

```bash
 npm install
```

3. Run the frontend:

```bash
npm run dev
```

---

## 8. Support Log

### Online Resources

- [Spring Boot CRUD + MySQL Guide](https://www.baeldung.com/spring-boot-crud-thymeleaf)
- [React + Axios API Setup](https://axios-http.com/docs/intro)
- [Vitest Dokumentation](https://vitest.dev/guide/)
- [Testing Library Examples](https://testing-library.com/docs/react-testing-library/example-intro)
- Chat Gpt "For Formating help in the documentation and as last resort for coding help"

---
