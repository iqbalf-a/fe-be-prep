/**
 * components/CodeBlock.jsx
 * ---------------------------------------------------------------------------
 * Code sample with a language label and a copy button. Highlighting is done by
 * the offline tokenizer in utils/highlight.js, so this works with no network and
 * no third-party highlighter. The panel stays dark in both themes, matching the
 * source document.
 */

import { useCallback, useMemo, useState } from 'react';
import { highlightTokens } from '../utils/highlight.js';
import { Button, IconCheck, IconCopy } from './ui.jsx';

const LANG_LABEL = {
  java: 'Java',
  js: 'JavaScript',
  jsx: 'JSX',
  sql: 'SQL',
  bash: 'Shell',
  yaml: 'YAML',
  json: 'JSON',
  text: 'Teks',
};

export default function CodeBlock({ code, lang = 'text' }) {
  const [copied, setCopied] = useState(false);
  const tokens = useMemo(() => highlightTokens(code ?? ''), [code]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }, [code]);

  return (
    <figure className="code-block my-4 overflow-hidden rounded-xl border border-black/20 bg-code">
      <figcaption className="code-block__bar flex items-center justify-between border-b border-white/10 bg-black/25 px-3 py-1.5">
        <span className="code-block__lang font-mono text-[0.7rem] tracking-[0.08em] text-code-ink/60 uppercase">
          {LANG_LABEL[lang] ?? lang}
        </span>
        <Button
          variant="plain"
          size="sm"
          className="code-block__copy px-2 text-code-ink/70 hover:bg-white/10 hover:text-code-ink"
          onClick={copy}
          aria-label="Salin kode"
        >
          {copied ? <IconCheck width={14} height={14} /> : <IconCopy width={14} height={14} />}
          {copied ? 'Tersalin' : 'Salin'}
        </Button>
      </figcaption>
      <pre className="code-block__pre overflow-x-auto px-4 py-3 font-mono text-[0.84rem] leading-relaxed text-code-ink">
        <code>
          {tokens.map((token, index) =>
            token.cls ? (
              <span key={index} className={token.cls}>
                {token.text}
              </span>
            ) : (
              <span key={index}>{token.text}</span>
            ),
          )}
        </code>
      </pre>
    </figure>
  );
}