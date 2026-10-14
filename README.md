# Jasir Abdul Hameed portfolio

A recruiter-focused, dependency-free portfolio for entry-level Applied AI and GenAI application roles.

## Run locally

Serve this directory with any static HTTP server. For example:

```sh
python -m http.server 4173
```

Open http://localhost:4173. No package installation or build command is required.

## Update

- `index.html`: profile, project case studies, links and metadata.
- `styles.css`: responsive design and accessibility states.
- `app.js`: recorded retrieval comparison, keyboard tab controls and copy-email feedback.
- `resume.pdf`: downloadable resume; replace after updating it.
- `assets/`: self-hosted Geist fonts, favicon and social preview.

## Evidence boundaries

Jruva's figures are recorded development retrieval results from a small synthetic corpus, not an independent estimate of production answer quality. Private code is not included. The timing boundaries and dataset limitations are shown on the page.

CustomerIQ is a demonstration with uncalibrated scores and incomplete original model provenance. DomainTune's training provenance and comparative evaluation are unfinished; no fine-tuning improvement is claimed.

The portfolio is static and does not access private GitHub data, scrape LinkedIn at runtime, collect visitor submissions or call an LLM. Profile links open the user's existing professional pages. The comparison is a visualization of recorded data, not live inference.

## Hosting

Deploy the repository as a static project on Vercel with Framework Preset `Other`, no build/install commands, and repository root as the output directory. `vercel.json` supplies response headers.

## Fonts

Geist and Geist Mono by Vercel are bundled under the SIL Open Font License. See `assets/OFL.txt`.
