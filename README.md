# Dedale API

The Dedale API is the backend service that powers both the backoffice (for creating courses) and the Dedale mobile application (for courses and quizzes). It is hosted on a dedicated OVH server, initialized with `npm`, and uses a MariaDB database.

## Key Features

- **Backoffice**: Management of course creation forms.
- **Mobile Application**: Access to courses and quizzes for users. Solved quizzes allow users to earn medals.

## Technologies Used

- **Server**: Linux Debian
- **Database**: MariaDB
- **Language**: JavaScript (Node.js)
- **Package Manager**: npm

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ludimuseo/dedale_serverapi.git
   cd dedale_serverapi
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

## Configuration

The main configuration file is located in `config/`. You can define database connection settings, API keys, and other necessary environment variables there.

## Usage

### Backoffice

- **Course Creation**: Use dedicated endpoints to create and manage courses via the backoffice.

### Mobile Application

- **Courses**: Users can access available courses.
- **Quizzes**: Users can solve quizzes to earn medals.

## Contributors

| ~                                                                                                            | Contributors               |
| ------------------------------------------------------------------------------------------------------------ | -------------------------- |
| <img src="https://avatars.githubusercontent.com/u/167294285?v=4" width="50" alt="@Maeva-RODRIGUES avatar" /> | [@Maeva-RODRIGUES][User01] |
| <img src="https://avatars.githubusercontent.com/u/91600327?v=4" width="50" alt="@Eternal-Grace avatar" />    | [@Eternal-Grace][User02]   |
| <img src="https://avatars.githubusercontent.com/u/3463006?v=4" width="50" alt="@fred2541 avatar" />          | [@fred2541][User03]        |
| <img src="https://avatars.githubusercontent.com/u/128374528?v=4" width="50" alt="@A-Fidele avatar" />        | [@A-Fidele][User04]        |


[User01]: https://github.com/Maeva-RODRIGUES/
[User02]: https://github.com/Eternal-Grace/
[User03]: https://github.com/fred2541/
[User04]: https://github.com/A-Fidele/


---
