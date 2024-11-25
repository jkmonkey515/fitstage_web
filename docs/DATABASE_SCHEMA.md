# Database Schema Documentation

## Core Tables

### Users & Profiles
```sql
- profiles
  - id (uuid, PK)
  - user_id (uuid, FK)
  - role (enum)
  - username (text)
  - full_name (text)
  - avatar_url (text)
  - bio (text)
  - followed_athletes (uuid[])
  - saved_posts (uuid[])

- competitor_details
  - id (uuid, PK)
  - profile_id (uuid, FK)
  - specialties (text[])
  - achievements (jsonb)
  - hero_image_url (text)
  - profile_settings (jsonb)
```

### Competitions
```sql
- competitions
  - id (uuid, PK)
  - title (text)
  - description (text)
  - start_date (timestamp)
  - end_date (timestamp)
  - rules (jsonb)
  - schedule (jsonb)
  - media_gallery (jsonb)
  - prize_distribution (jsonb)
  - entry_fee (decimal)
  - registration_deadline (timestamp)

- competition_registrations
  - id (uuid, PK)
  - competition_id (uuid, FK)
  - competitor_id (uuid, FK)
  - category_id (uuid, FK)
  - status (enum)
  - payment_status (enum)
```

### Voting System
```sql
- voting_periods
  - id (uuid, PK)
  - competition_id (uuid, FK)
  - category_id (uuid, FK)
  - start_date (timestamp)
  - end_date (timestamp)
  - status (enum)

- voting_progress
  - id (uuid, PK)
  - spectator_id (uuid, FK)
  - competition_id (uuid, FK)
  - category_id (uuid, FK)
  - votes_used (integer)
  - max_votes (integer)
```

### Social Features
```sql
- posts
  - id (uuid, PK)
  - author_id (uuid, FK)
  - content (text)
  - media_urls (text[])
  - created_at (timestamp)

- post_reactions
  - id (uuid, PK)
  - post_id (uuid, FK)
  - user_id (uuid, FK)
  - reaction_type (enum)

- post_comments
  - id (uuid, PK)
  - post_id (uuid, FK)
  - user_id (uuid, FK)
  - content (text)
```

### Platform Management
```sql
- platform_versions
  - id (uuid, PK)
  - version (text)
  - type (enum)
  - description (text)
  - changes (jsonb)
  - files (jsonb)
  - migrations (jsonb)

- platform_analytics
  - id (uuid, PK)
  - date (date)
  - metrics (jsonb)
```