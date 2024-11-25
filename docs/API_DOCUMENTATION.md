# API Documentation

## Authentication

### POST /auth/signup
Create a new user account

### POST /auth/login
Authenticate user and create session

### POST /auth/logout
End user session

## Users

### GET /users/:id
Retrieve user profile

### PATCH /users/:id
Update user profile

### GET /users/:id/competitions
List user's competitions

## Competitions

### GET /competitions
List all competitions

### POST /competitions
Create new competition

### GET /competitions/:id
Get competition details

### PATCH /competitions/:id
Update competition

### DELETE /competitions/:id
Delete competition

## Voting

### POST /votes
Cast a vote

### GET /votes/progress
Get voting progress

### GET /votes/analytics
Get voting analytics

## Posts

### GET /posts
List posts

### POST /posts
Create new post

### PATCH /posts/:id
Update post

### DELETE /posts/:id
Delete post

### POST /posts/:id/reactions
Add reaction to post

### POST /posts/:id/comments
Add comment to post