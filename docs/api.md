# MusicHub API Specification

## Authentication

### POST /api/v1/auth/register
**Description:** Create a new user.
**Request:**
```json
{
  "email": "user@example.com",
  "password": "secret",
  "name": "Alice"
}
