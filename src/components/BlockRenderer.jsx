/**
 * components/BlockRenderer.jsx
 * ---------------------------------------------------------------------------
 * Renders the content block shapes produced by scripts/migrate-html.mjs and by
 * the hand-written data files. One switch, one place: adding a new block type
 * means touching only this file.
 *
 * Every text-bearing branch goes through Inline, which is the single component
 * allowed to interpret the small HTML subset used in the content.
 */

import { useId, useState } from 'react';
import Inline from '../utils/inline.jsx';
import CodeBlock from './CodeBlock.jsx';
import { useStudy } from '../context/StudyContext.jsx';
import { Button, IconChevron, IconStar, IconWarn } from './ui.jsx';

function List({ items, ordered, query }) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag
      className={`content-list my-3 pl-6 ${ordered ? 'list-decimal' : 'list-disc'} marker:text-muted/60`}
    >
      {items.map((item, index) => (
        <li key={index} className="my-1">
          {/* Hand-written data passes whole blocks (p(...)) as
              list items, while the migration emits plain HTML
              strings. Both render; an object must never fall
              through to Inline, which would stringify it. */}
          {typeof item === 'string' ? (
            <Inline html={item} query={query} />
          ) : (
            <Block block={item} query={query} />
          )}
        </li>
      ))}
    </Tag>
  );
}

function TableBlock({ block, query, bleed }) {
  return (
    <div className={`table-wrap my-4 overflow-x-auto rounded-xl border border-line ${bleed ? '-mx-4 sm:mx-0' : ''}`}>
      <table className="content-table w-full border-collapse text-left text-[0.88rem]">
        <thead>
          <tr>
            {block.head.map((cell, index) => (
              <th key={index} scope="col" className="border-b border-line bg-soft px-3 py-2 font-bold whitespace-nowrap">
                <Inline html={cell} query={query} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="last:[&>td]:border-0">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border-b border-line px-3 py-2 align-top">
                  <Inline html={cell} query={query} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function QuoteBlock({ block, query }) {
  const isTip = block.variant === 'tip';
  const Icon = isTip ? IconStar : IconWarn;
  return (
    <aside
      className={`callout callout--${isTip ? 'tip' : 'warn'} my-4 rounded-xl border-l-4 px-4 py-3 ${
        isTip ? 'border-ok/60 bg-ok/10' : 'border-warn/60 bg-warn/10'
      }`}
    >
      <p className={`callout__title mb-1.5 flex items-center gap-1.5 text-[0.92rem] font-bold ${isTip ? 'text-ok' : 'text-warn'}`}>
        <Icon width={15} height={15} className="shrink-0" />
        <Inline html={block.title ?? ''} query={query} />
      </p>
      <div className="callout__body [&_.block:last-child]:mb-0">
        {(block.body ?? []).map((item, index) => (
          <Block key={index} block={item} query={query} />
        ))}
      </div>
    </aside>
  );
}

/** Collapsed card. Uses <details> so it works without JavaScript state. */
function QABlock({ block, query }) {
  return (
    <details className="qa-card group my-3 overflow-hidden rounded-xl border border-line bg-panel">
      <summary className="qa-card__q pointer-coarse:py-4 flex cursor-pointer items-start gap-2 px-4 py-3 font-semibold hover:bg-soft">
        <IconChevron
          width={15}
          height={15}
          className="qa-card__chevron mt-1 shrink-0 text-brand transition-transform duration-150"
        />
        <span className="flex-1">
          <Inline html={block.question} query={query} />
        </span>
      </summary>
      <div className="qa-card__a border-t border-line px-4 py-3 pl-11">
        {(block.answer ?? []).map((item, index) => (
          <Block key={index} block={item} query={query} />
        ))}
      </div>
    </details>
  );
}

function RevealBlock({ block, query }) {
  const [shown, setShown] = useState(false);
  const panelId = useId();
  return (
    <div className="reveal my-3 grid justify-items-start gap-2.5">
      <Button
        variant="soft"
        className="pointer-coarse:min-h-11"
        aria-expanded={shown}
        aria-controls={panelId}
        onClick={() => setShown((value) => !value)}
      >
        {shown ? 'Sembunyikan jawaban' : block.summary}
      </Button>
      {shown && (
        <div className="reveal__body w-full border-l-2 border-line pl-3" id={panelId}>
          {(block.body ?? []).map((item, index) => (
            <Block key={index} block={item} query={query} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProblemBlock({ block, query }) {
  return (
    <div className="problem my-4 rounded-xl border border-dashed border-line bg-soft px-4 py-3">
      <p className="problem__label mb-1 text-[0.7rem] font-extrabold tracking-[0.12em] text-brand uppercase">Latihan</p>
      <p className="problem__task mb-1.5 text-[0.92rem]">
        <Inline html={block.task} query={query} />
      </p>
      {block.io && (
        <p className="problem__io m-0 text-[0.92rem]">
          <strong>Contoh I/O:</strong> <Inline html={block.io} query={query} />
        </p>
      )}
    </div>
  );
}

/** Checklist progress is stored separately from chapter completion. */
function ChecklistBlock({ block, chapterId }) {
  const { isChecklistItemDone, toggleChecklistItem } = useStudy();
  const items = block.items ?? [];
  const doneCount = items.filter((item) => isChecklistItemDone(chapterId, item.id)).length;

  return (
    <div className="checklist my-4 rounded-xl border border-line bg-panel px-4 py-3">
      <p className="checklist__meta mb-2 text-sm text-muted">
        Checklist <strong className="text-ink">{doneCount}</strong>/<strong className="text-ink">{items.length}</strong>
      </p>
      <ul className="checklist__list grid list-none gap-1.5">
        {items.map((item) => {
          const done = isChecklistItemDone(chapterId, item.id);
          return (
            <li key={item.id}>
              <label
                className={`grid cursor-pointer grid-cols-[auto_1fr] items-start gap-2.5 text-[0.9rem] pointer-coarse:min-h-11 ${
                  done ? 'is-done text-muted line-through decoration-line' : 'hover:text-brand'
                }`}
              >
                <input
                  type="checkbox"
                  className="mt-1 size-4 accent-brand"
                  checked={done}
                  onChange={() => toggleChecklistItem(chapterId, item.id)}
                />
                <Inline html={item.label} />
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Block({ block, query, chapterId, bleed }) {
  if (!block) return null;

  switch (block.type) {
    case 'p':
      return (
        <p className="content-p my-3">
          <Inline html={block.html} query={query} />
        </p>
      );
    case 'h4':
      return (
        <h4 className="content-h4 mt-6 mb-1.5 text-[1.05rem] font-bold tracking-tight">
          <Inline html={block.html} query={query} />
        </h4>
      );
    case 'code':
      return <CodeBlock code={block.code} lang={block.lang} bleed={bleed} />;
    case 'ul':
      return <List items={block.items} query={query} />;
    case 'ol':
      return <List items={block.items} ordered query={query} />;
    case 'table':
      return <TableBlock block={block} query={query} bleed={bleed} />;
    case 'group':
      return (
        <div className="content-group">
          {(block.body ?? []).map((item, index) => (
            <Block key={index} block={item} query={query} chapterId={chapterId} bleed={bleed} />
          ))}
        </div>
      );
    case 'quote':
      return <QuoteBlock block={block} query={query} />;
    case 'qa':
      return <QABlock block={block} query={query} />;
    case 'reveal':
      return <RevealBlock block={block} query={query} />;
    case 'problem':
      return <ProblemBlock block={block} query={query} />;
    case 'checklist':
      return <ChecklistBlock block={block} chapterId={chapterId} />;
    default:
      // Unknown block: never crash the page, just skip it.
      return null;
  }
}

export default function BlockRenderer({ blocks, query, chapterId }) {
  return (
    <>
      {(blocks ?? []).map((block, index) => (
        <div id={`block-${index}`} key={index} className="block">
          {/* Top-level blocks may break out of the page padding on
              mobile (tables and code go full-bleed); the same block
              nested inside a card or callout stays inset. */}
          <Block block={block} query={query} chapterId={chapterId} bleed />
        </div>
      ))}
    </>
  );
}