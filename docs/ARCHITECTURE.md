# Architecture

## Product Architecture

The platform is designed as a modular directory so the initial Calgary deployment can expand to Canada and worldwide without redesigning the core data model.

## Main Domains

- Places
- Organizations
- Services / prayer times
- Events
- Photos
- Locations
- Contacts
- Languages
- Verification
- User submissions
- Moderation
- Search

## Core Relationships

```
Organization
  |
  +-- Religious Place
  |     +-- Location
  |     +-- Contacts
  |     +-- Services / Prayer Times
  |     +-- Events
  |     +-- Photos
  |     +-- Languages
  |
  +-- Verification / Claims

User
  +-- Claims
  +-- Update Requests
  +-- Reports
```

## Suggested Database Tables

- organizations
- religious_places
- locations
- contacts
- services
- service_times
- events
- photos
- languages
- place_languages
- verification_requests
- update_requests
- reports
- users

## Data Quality

Public place records should support:

- source
- source_url
- last_verified_at
- verification_status
- updated_at
- updated_by

This enables stale-information detection and automated update workflows.

## Privacy

Only information intended for public directory use should be stored. Private personal information should not be exposed through public profiles.

## Geographic Expansion

Avoid Calgary-specific assumptions. Locations should use standard geographic fields:

- Country
- Province / state / region
- City
- Postal / ZIP code
- Latitude
- Longitude
- Address
