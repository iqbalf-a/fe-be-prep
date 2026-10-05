/**
 * data/catalog.js
 * ---------------------------------------------------------------------------
 * The single registry of everything studyable in the app.
 *
 * Content comes from two places:
 *   - *.generated.js  produced by scripts/migrate-html.mjs from the source study
 *     guide, which remains the source of truth for all learning material
 *   - the hand-written modules, which cover the topics the source document does
 *     not contain (React/Frontend, Spring Boot, Kafka, Redis, system design,
 *     the interview question bank and the Performance Test Engineer section)
 *
 * Every chapter exposes a stable id, so stored progress stays attached to the
 * right topic across reloads and data-file regeneration.
 */

import { javascriptModules } from './javascript.generated.js';
import { backendNodeModules } from './backend-node.generated.js';
import { frontendModules } from './frontend.js';
import { springModules } from './spring.js';
import { interviewSections } from './interview.js';
import { performanceTestChapters } from './performance-test.js';
import { normalizeModules } from './build.js';

export const TRACKS = [
  { id: 'js', label: 'JavaScript', icon: 'JS', hint: 'Fundamental sampai asynchronous' },
  { id: 'frontend', label: 'Frontend', icon: 'FE', hint: 'React, browser, keamanan web' },
  { id: 'backend', label: 'Backend', icon: 'BE', hint: 'Spring Boot, Kafka, Redis, database' },
  { id: 'interview', label: 'Interview', icon: 'IV', hint: 'Prediksi pertanyaan technical test' },
];

export const PRIORITIES = {
  P1: { label: 'P1 Wajib', short: 'P1' },
  P2: { label: 'P2 Sering', short: 'P2' },
  P3: { label: 'P3 Tambahan', short: 'P3' },
};

/** Stable, human-meaningful ids keep stored progress attached to the right topic. */
export const TRACK_MODULES = {
  js: javascriptModules,
  frontend: frontendModules,
  backend: [...springModules, ...backendNodeModules],
  interview: interviewSections,
};

/** The Performance Test Engineer section lives inside the interview track. */
const INTERVIEW_ABOUT_ME = {
  id: 'pte-about-me',
  no: 'IV9',
  title: 'How to Answer as a Performance Test Engineer',
  plainTitle: 'How to Answer as a Performance Test Engineer',
  desc:
    'Cara memposisikan pengalaman Performance Test Engineer secara jujur saat transitioning ke development.',
  priorityNote: 'Penting untuk interview',
  chapters: performanceTestChapters,
};

/** Normalized modules per track, in navigation order. */
const MODULES = {
  js: normalizeModules(TRACK_MODULES.js),
  frontend: normalizeModules(TRACK_MODULES.frontend),
  backend: normalizeModules(TRACK_MODULES.backend),
  interview: normalizeModules([...TRACK_MODULES.interview, INTERVIEW_ABOUT_ME]),
};

const TRACKS_WITH_MODULES = TRACKS.map((track) => ({
  ...track,
  modules: MODULES[track.id] ?? [],
}));

/** Every chapter in the app, with the module/track it belongs to. */
export const ALL_CHAPTERS = TRACKS_WITH_MODULES.flatMap((track) =>
  track.modules.flatMap((module) =>
    module.chapters.map((chapter) => ({
      ...chapter,
      trackId: track.id,
      moduleId: module.id,
      moduleTitle: module.plainTitle,
      moduleTitleHtml: module.title,
      moduleNo: module.no,
    })),
  ),
);

export const CHAPTERS_BY_ID = new Map(ALL_CHAPTERS.map((chapter) => [chapter.id, chapter]));

export const MODULES_BY_ID = new Map(
  TRACKS_WITH_MODULES.flatMap((track) =>
    track.modules.map((module) => [module.id, { ...module, trackId: track.id }]),
  ),
);

export const TRACK_STATS = Object.fromEntries(
  TRACKS_WITH_MODULES.map((track) => {
    const chapters = ALL_CHAPTERS.filter((c) => c.trackId === track.id);
    return [
      track.id,
      {
        total: chapters.length,
        minutes: chapters.reduce((sum, c) => sum + c.minutes, 0),
        p1: chapters.filter((c) => c.priority === 'P1').length,
        modules: track.modules.length,
      },
    ];
  }),
);

export const TOTAL_MINUTES = ALL_CHAPTERS.reduce((sum, c) => sum + c.minutes, 0);

export function modulesOfTrack(trackId) {
  return MODULES[trackId] ?? [];
}