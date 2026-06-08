# Component Guidelines

This document provides guidelines and usage examples for the key components in the portfolio website.

## Header
- Location: `src/components/Header.tsx`
- Description: Renders the site navigation bar with logo and menu links.
- Props:
  - `title?: string` – Optional title to display.

## ProjectPreviews
- Location: `src/components/ProjectPreviews.tsx`
- Description: Shows a grid of project preview cards.
- Props:
  - `projects: Project[]` – Array of project data.

## DesignStoryCanvas
- Location: `src/components/DesignStoryCanvas.tsx`
- Description: Canvas component for interactive design stories.
- Props:
  - `storyId: string` – Identifier for the story to display.

## CaseStudyDetail
- Location: `src/components/CaseStudyDetail.tsx`
- Description: Detailed view for a single case study.
- Props:
  - `caseStudy: CaseStudy` – Data object for the case study.
