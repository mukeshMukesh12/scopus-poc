## Clone this project

## Add .env.local

in .env.local add NEXT_PUBLIC_APIKEY=<yours elsevier api key>

## Project Overview

The Scopus API allows searching for articles, authors, and affiliations using different endpoints.

Implemented Features
✔ Search for Articles

API Endpoint: https://api.elsevier.com/content/search/scopus?query={query}
Requires API Key (X-ELS-APIKey)
Returns metadata like title, authors, publication name, DOI, and citations
✔ Search for Authors

API Endpoint: https://api.elsevier.com/content/search/author?query={query}
Requires OAuth Token (X-ELS-Authtoken) for detailed results
Returns author name, affiliation, and Scopus ID
✔ Search for Affiliations

API Endpoint: https://api.elsevier.com/content/search/affiliation?query={query}
Requires OAuth Token (X-ELS-Authtoken)
Returns institution name, country, and author count

## Tech Stack: Next.js 15 (App Router), TypeScript, Fetch API

## /app/api/scopus/route.ts is a server-side API endpoint in Next.js that fetches data from the Scopus API and returns it to the frontend.

## /components/ScopusSearch.tsx is a React component in Next.js that calls the API endpoint defined in route.ts to fetch search results from the Scopus API and display them on the frontend.

## /app/page.tsx shows the Scopus Search page
