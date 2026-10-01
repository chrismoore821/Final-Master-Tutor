# Red Team Tutor

A mobile-friendly learning site with a cybersecurity tutor, Code Tutor, and a Ghanaian SHS tutor. All three tutors support Groq and Google Gemini with shared provider settings. The supplied static application was preserved rather than replaced with a framework template.

## Technologies and structure

The site uses static HTML, CSS, and vanilla JavaScript. Netlify publishes only `public/`, so documentation and uploaded source files are not part of the public site.

- `public/index.html`: cybersecurity tutor and shared learning tools.
- `public/code.html`: programming lessons, editor, snippets, and quizzes.
- `public/shs.html`: SHS subjects, lessons, syllabus, quizzes, and study resources.
- `public/assets/code-quizzes.js`: 54 built-in practice questions covering all 18 programming topics.
- `public/assets/ai-settings.js`: shared provider endpoints, model lists, key settings, and backup compatibility.
- `public/manifest.json` and `public/assets/icon-*.png`: installable-site metadata and icons.
- `netlify.toml`: static publish configuration; no build step is required.

## Local preview

With Node.js and the Netlify CLI installed, run this command from the project root:

```sh
netlify dev --port 8889
```

Open `http://localhost:8889`, `/code.html`, or `/shs.html` in a browser. The site does not require a package installation or compilation step.

## Feature availability

Code Tutor's built-in practice quizzes require no API key. If the AI quiz service cannot respond or returns invalid questions, Code Tutor falls back to these questions. AI chat, generated lessons, and AI quizzes use the provider selected in Settings and require its API key. Remote execution of non-JavaScript languages retains the supplied Piston integration and depends on that external service's availability. HTML previews and synchronous JavaScript examples run in the browser.

Tag-based quiz choices are stored with JavaScript Unicode escapes and displayed as text, so HTML elements and C header names remain visible rather than becoming markup. Built-in quizzes are validated before opening; an incomplete bank shows a recovery message instead of rendering blank choices or crashing.

## Provider settings

1. Open Settings on any tutor page.
2. Select Groq or Google Gemini. The model dropdown updates immediately.
3. Enter the matching API key; both password fields can be filled at once.
4. Choose a model and press Save & Close.

Both keys and the selected provider are remembered in this browser across all three pages. Model choices are remembered separately for each provider. Switching the dropdown without saving does not change the provider used for requests. An existing legacy `apiKey` setting is treated as the Groq key. Requests read saved settings each time, including changes saved from another tutor tab, and never send a model belonging to the other provider.

Requests go directly to Groq's chat-completions endpoint or Gemini's OpenAI-compatible endpoint with the selected provider's key. The model lists use the IDs supplied for this project; access, availability, and quotas depend on the provider and account. A failed request displays an error or, for Code quizzes, uses the existing offline fallback. No free-tier quota guarantees are built into the site.

The existing browser-local progress, notes, settings, and backup format remain compatible; no new persistence service was introduced. Data remains specific to the current browser and site origin. API keys are stored in browser localStorage, not encrypted or protected by an account login. Only use the site on a trusted device. Backups from all three pages include both saved API keys in plain text, together with provider and model preferences. Restoring older backups treats their single key as a Groq key. Save Settings before exporting; unsaved field values are not included. Treat exported backups as private: do not share them, place real credentials in source files, or commit backups.

## Browser review checklist

- On each page, save both provider keys, select Gemini, reload, and confirm the selected provider and both fields remain saved. Send a message and generate a quiz, then repeat with Groq.
- Change the provider without saving and confirm requests still use the saved provider. Save a different provider in another tutor tab and confirm the next request follows the new saved selection.
- With no key or while offline, start the HTML and C practice quizzes in Code Tutor. Confirm tag and header choices display literally and New Quiz remains available after completing a quiz.
- In each tutor, enable Read replies aloud, save Settings, and confirm a new reply is spoken. Existing replies are read using their Read button.
- Mute speech in Red Team Tutor or SHS Tutor, open Code Tutor, and enable Read replies aloud. Confirm speech is unmuted and the speaker control beside Test voice works without crowding the mobile header.
- Try Test voice and Read on a saved note. Confirm only the Read button changes to Stop, and its original label returns after stopping, finishing, or a playback error.
- Confirm blocked or failed speech playback displays a helpful message, and starting another reading does not leave the previous Read button stuck on Stop.
- Confirm that no source text appears beneath the Code or SHS page interface.
- Open Settings, subjects/lessons, syllabus filters, notes, progress, and statistics on SHS.
- Start and continue an SHS lesson, then exit it and use Continue again.
- On Code Tutor, select Quiz, choose a topic without a key, answer its questions, and view the score and XP award.
- Open an HTML snippet in the editor and run its preview; verify the editor selects the matching language for other snippets.
- Check that a failed AI quiz request produces a built-in Code quiz or a visible SHS error, not an empty panel.
- Complete two consecutive quizzes on each page and confirm the new questions appear in the new quiz card, without overwriting earlier results.
- While a tutor reply or quiz is loading, try another prompt, quiz, Clear chat, and Restore. Confirm requests do not overlap or replace data during generation, and controls recover after a failed or timed-out request.
- On Code Tutor, clear an editor language, switch languages, and reload. Confirm the selected language and intentionally empty code stay saved.
- Restore a backup with an explicitly empty Groq key and confirm an older legacy key is not reused. Confirm failed restores display an error instead of reporting success.
- Review Reset Stats using disposable browser data, since the statistics are shared across pages.
- Confirm Settings still opens in a browser without speech synthesis support.
- Save distinct disposable placeholder keys for Groq and Gemini; switch providers, reopen Settings, and navigate between tutors to confirm both values remain separate. Do not use real credentials for storage checks.
- Choose different models for each provider, switch repeatedly, and confirm the model dropdown never contains the other provider's models. Close Settings without saving and confirm the active provider is unchanged.
- With valid keys supplied privately in the browser, review chat, generated lessons, and quizzes under both providers. Confirm missing-key messages identify the selected provider and Code Tutor retains its offline quiz fallback.
- Export and restore a backup on each page using disposable placeholder keys. Confirm both keys, the provider, and model preferences survive, and an older single-key backup restores its Groq key. Confirm the visible backup privacy warning describes both keys.

Local builds, development servers, automated tests, and live provider requests were not run during this update; deployment validation is handled by the platform.
