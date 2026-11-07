# Sanity CMS

This folder holds the Sanity Studio and content schemas.

## Setup

```bash
cd sanity
npm create sanity@latest -- --project-id <id> --dataset production --template clean --typescript --output-path .
```

Then put the project ID in the root `.env` (copy `.env.example`):

```
VITE_SANITY_PROJECT_ID=<id>
VITE_SANITY_DATASET=production
```

Register schemas in `schemaTypes/index.ts`. For the frontend, install `@sanity/client` in the root project.
