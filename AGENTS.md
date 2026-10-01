# Project guide

## Architecture

This is an existing static HTML application restored from user-uploaded assets. Preserve its mobile-first dark interface and standalone page architecture. Do not replace it with a framework template for routine repairs.

Netlify publishes `public/` through `netlify.toml`. The index page is Red Team Tutor; Code Tutor and SHS Tutor are separate HTML pages linked by relative navigation. Each page embeds its CSS and main JavaScript. `public/assets/ai-settings.js` defines `window.TutorAI` and must load before each page's main script. `public/assets/code-quizzes.js` supplies Code Tutor's offline question bank and must load before the Code page's main script. Uploaded originals in `.netlify/assets/` are not the deployed source and must not be edited for application changes.

## Key directories

- `public/`: deployable pages and manifest.
- `public/assets/`: shared AI provider settings, icons, and Code Tutor's curated quiz bank.
- `.netlify/results.md`: standalone change summary for the delivery system.

## Conventions

Keep changes focused and match the existing vanilla JavaScript style. Use DOM text content or HTML escaping for external text. Avoid dependencies unless a requested feature requires them. Keep the original curriculum data and learning history keys compatible.

Inline JavaScript must have one well-formed script boundary. In JavaScript string literals inside HTML script elements, escape embedded closing script tags as `<\/script>` so the HTML parser cannot terminate the enclosing script. Do not add another opening script tag inside the active JavaScript block. Curriculum constants must be inside a script element, not rendered as body text.

Every control bound with `getElementById` must have corresponding markup. SHS's lessons panel and Back control are required during initialization, even before lessons are opened. Browser speech support is optional; unsupported speech APIs must never prevent Settings or other controls from initializing.

Quiz responses must contain a nonempty questions array, four nonempty string choices per question, and a zero-based integer answer in range. Normalize generated quiz topics to the selected topic. Prevent overlapping generation requests. Code quizzes must retain the built-in fallback and a visible way to start another quiz.

## Non-obvious decisions

No build tool or package manifest is necessary for this static site. Only `public/` is published to avoid exposing runner metadata or uploaded originals. Browser-local persistence was retained as explicitly requested for the provider patch, not redesigned. New server-backed persistence must use the relevant Netlify storage skills and platform primitives. Existing AI and remote code-execution integrations require external services; do not silently change their providers or model choices.

All AI requests must use `getActiveKey()`, `getActiveUrl()`, and `getActiveModel()` from `TutorAI`. These read saved settings for every request, so switching pages or saving in another tab does not leave stale credentials in memory. Provider changes inside the Settings sheet are drafts until Save & Close. Keep the requested model lists centralized in `public/assets/ai-settings.js`; model selection must be validated against the selected provider's list.

The browser settings keys are `ai_provider`, `apiKeyGroq`, `apiKeyGemini`, `model_groq`, and `model_gemini`. Legacy `apiKey` and `model` remain compatible, with `apiKey` always representing Groq. An explicitly empty `apiKeyGroq` must not fall back to an older key. All three backups preserve both keys and provider/model settings, with visible plaintext-key warnings; old single-key backups restore their Groq key. Use the shared settings collection and restoration helpers rather than creating diverging backup logic.

Do not include real credentials or backup contents in source files, logs, or change summaries. Future AI additions must follow the Netlify AI Gateway skill before model selection.

## Verification

Review script boundaries, DOM control bindings, question schemas, and relative asset paths. Follow the browser checklist in `README.md` when runtime validation is permitted. In platform-managed runs, honor instructions that reserve build, server, and test execution for the deployment pipeline.
