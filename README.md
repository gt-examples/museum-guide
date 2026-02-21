# Museum Guide

A multilingual museum visitor guide demonstrating internationalization with General Translation. Browse exhibitions, explore the collection, and discover artworks from around the world.

**[Live Demo](https://museum-guide.generaltranslation.dev)** | **[General Translation Docs](https://generaltranslation.com/docs)**

## About

Museum Guide is an example application showcasing how to build a fully internationalized museum visitor experience with Next.js and General Translation. It features exhibition browsing, artwork detail pages with zoom, collection filtering, and complete multilingual support across English, Spanish, French, Japanese, and Chinese.

## GT Features Used

- `<T>` — JSX translation with wide wrapping for full context
- `<Branch>` — Conditional rendering for status labels and medium types
- `<Plural>` — Pluralization for artwork and exhibition counts
- `<Num>` — Locale-aware number formatting for years and dimensions
- `<DateTime>` — Locale-aware date formatting for exhibition dates
- `<LocaleSelector>` — Language picker
- `getGT` / `useGT` — String translations for metadata, placeholders, and attributes
- `loadTranslations` — Local translation storage

## Getting Started

```bash
git clone https://github.com/gt-examples/museum-guide.git
cd museum-guide
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Built With

- [Next.js](https://nextjs.org)
- [General Translation](https://generaltranslation.com) (gt-next)
- [Tailwind CSS](https://tailwindcss.com)
