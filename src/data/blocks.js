/**
 * data/blocks.js
 * ---------------------------------------------------------------------------
 * Terse constructors for the content block shapes produced by
 * scripts/migrate-html.mjs.
 *
 * Hand-written data files use these so each chapter reads like an outline rather
 * than a wall of object literals. The generated files use the plain object form
 * because they are machine-produced.
 */

export const p = (html) => ({ type: 'p', html });
export const h4 = (html) => ({ type: 'h4', html });
export const code = (code, lang = 'java') => ({ type: 'code', code, lang });
export const ul = (...items) => ({ type: 'ul', items });
export const ol = (...items) => ({ type: 'ol', items });
export const table = (head, rows) => ({ type: 'table', head, rows });
export const group = (...body) => ({ type: 'group', body });

/** Green callout: a short scripted answer worth memorising. */
export const tip = (title, ...body) => ({ type: 'quote', variant: 'tip', title, body });

/** Amber callout: a common mistake or caveat. */
export const warn = (title, ...body) => ({ type: 'quote', variant: 'warn', title, body });

/** Collapsed question/answer pair, matching the source document's interview cards. */
export const qa = (question, ...answer) => ({ type: 'qa', question, answer });

/** Collapsed "show the answer" block, used for coding-problem solutions. */
export const reveal = (summary, ...body) => ({ type: 'reveal', summary, body });

/** A practice problem with an optional playground seed. */
export const problem = (task, io, seed = '') => ({ type: 'problem', task, io, seed });

/** Persisted checklist, stored separately from chapter completion. */
export const checklist = (...items) => ({
  type: 'checklist',
  items: items.map((label, index) => ({
    id: `check-${index + 1}`,
    label,
    text: label.replace(/<[^>]*>/g, ''),
  })),
});

/** Shorthand for a chapter definition. */
export const chapter = (id, title, priority, minutes, tags, blocks) => ({
  id,
  title,
  priority,
  minutes,
  tags,
  blocks,
});

/** Shorthand for a module definition. */
export const module = (id, no, title, desc, priorityNote, chapters) => ({
  id,
  no,
  title,
  plainTitle: title,
  desc,
  priorityNote,
  chapters,
});