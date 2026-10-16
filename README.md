# Pip, Quill & Dash: how data flows through AI

A playful learning website for our team, in three books:

- **Book 1, Pip:** how data is used to build and train an AI model
- **Book 2, Quill:** what happens to our data when we use an AI tool
- **Book 3, Dash:** what happens to data when an AI agent takes actions

## What is in this repository

- `site/` is the website that Azure Static Web Apps publishes (`index.html`, pictures and film in `img/`).
- `source/` holds the book texts and the code the page is built from. `build.py` combines them into `site/index.html`.

Progress, questions and edits are stored in Supabase, so publishing a new version never resets anyone's progress.
