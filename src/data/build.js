/**
 * data/build.js
 * ---------------------------------------------------------------------------
 * Normalizes module definitions so hand-written data files stay short.
 *
 * The migration script emits fully-formed modules, but hand-written modules would
 * otherwise need to repeat boilerplate on every chapter. This fills in the
 * derived fields once, at load time:
 *
 *   no          position within the module (1-based)
 *   searchText  lowercase haystack used by global search
 *   tags        always an array
 */

function stripTags(html) {
  return String(html ?? '').replace(/<[^>]*>/g, ' ');
}

/** Flattens any block into plain text for the search index. */
export function blockText(block) {
  if (!block) return '';
  switch (block.type) {
    case 'code':
      return block.code;
    case 'table':
      return [block.head.join(' '), ...block.rows.map((row) => row.join(' '))].join(' ');
    case 'ul':
    case 'ol':
      // Items are plain HTML strings in migrated data and whole
      // blocks in hand-written data; both flatten to text.
      return block.items
        .map((item) => (typeof item === 'string' ? stripTags(item) : blockText(item)))
        .join(' ');
    case 'quote':
      return [block.title ?? '', ...(block.body ?? []).map(blockText)].join(' ');
    case 'qa':
      return [stripTags(block.question), ...(block.answer ?? []).map(blockText)].join(' ');
    case 'reveal':
      return [stripTags(block.summary), ...(block.body ?? []).map(blockText)].join(' ');
    case 'problem':
      return [stripTags(block.task), stripTags(block.io), block.seed ?? ''].join(' ');
    case 'checklist':
      return (block.items ?? []).map((item) => item.text ?? stripTags(item.label)).join(' ');
    case 'group':
      return (block.body ?? []).map(blockText).join(' ');
    default:
      return stripTags(block.html ?? '');
  }
}

export function chapterSearchText(chapter) {
  return [chapter.plainTitle, chapter.short, (chapter.tags ?? []).join(' ')]
    .concat((chapter.blocks ?? []).map(blockText))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/**
 * @param {Array} modules
 * @returns {Array} modules with normalized chapters
 */
export function normalizeModules(modules) {
  return modules.map((module) => {
    const chapters = (module.chapters ?? []).map((chapter, index) => ({
      priority: 'P3',
      minutes: 8,
      tags: [],
      notePlaceholder: '',
      blocks: [],
      ...chapter,
      no: index + 1,
      plainTitle: chapter.plainTitle ?? stripTags(chapter.title ?? chapter.id),
      short: chapter.short ?? stripTags(chapter.plainTitle ?? chapter.title ?? chapter.id),
    }));

    for (const chapter of chapters) {
      chapter.searchText = chapterSearchText(chapter);
    }

    return {
      ...module,
      chapters,
      minutes:
        module.minutes ?? chapters.reduce((sum, chapter) => sum + chapter.minutes, 0),
    };
  });
}