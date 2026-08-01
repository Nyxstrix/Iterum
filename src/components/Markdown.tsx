import type { ReactNode } from 'react';

/**
 * A deliberately small markdown subset for lesson content: headings, paragraphs,
 * bullet lists, fenced code, tables, inline code and bold. Rendered to real React
 * elements rather than injected HTML, so lesson data can never inject markup.
 */

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`)/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  return text.split(INLINE).map((part, index) => {
    const key = `${keyPrefix}-${index}`;
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return <code key={key}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

/** Inline-only rendering, for prompts, hints and bullet points. */
export function Inline({ text }: { text: string }) {
  return <>{renderInline(text, 'inline')}</>;
}

type Block =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; text: string }
  | { type: 'table'; rows: string[][] };

function parse(source: string): Block[] {
  const lines = source.split('\n');
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (line.trim() === '') {
      index += 1;
      continue;
    }

    if (line.trimStart().startsWith('```')) {
      const body: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trimStart().startsWith('```')) {
        body.push(lines[index]);
        index += 1;
      }
      index += 1; // closing fence
      blocks.push({ type: 'code', text: body.join('\n') });
      continue;
    }

    if (line.startsWith('### ')) {
      blocks.push({ type: 'heading', text: line.slice(4) });
      index += 1;
      continue;
    }

    if (line.startsWith('|')) {
      const rows: string[][] = [];
      while (index < lines.length && lines[index].startsWith('|')) {
        const cells = lines[index]
          .split('|')
          .slice(1, -1)
          .map((cell) => cell.trim());
        // Skip the |---|---| separator row.
        if (!cells.every((cell) => /^:?-+:?$/.test(cell))) rows.push(cells);
        index += 1;
      }
      blocks.push({ type: 'table', rows });
      continue;
    }

    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (index < lines.length && lines[index].startsWith('- ')) {
        items.push(lines[index].slice(2));
        index += 1;
      }
      blocks.push({ type: 'list', items });
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() !== '' &&
      !lines[index].startsWith('- ') &&
      !lines[index].startsWith('### ') &&
      !lines[index].startsWith('|') &&
      !lines[index].trimStart().startsWith('```')
    ) {
      paragraph.push(lines[index]);
      index += 1;
    }
    blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
  }

  return blocks;
}

export function Markdown({ source }: { source: string }) {
  const blocks = parse(source);

  return (
    <div className="lesson-prose">
      {blocks.map((block, index) => {
        const key = `block-${index}`;
        switch (block.type) {
          case 'heading':
            return <h3 key={key}>{renderInline(block.text, key)}</h3>;
          case 'paragraph':
            return <p key={key}>{renderInline(block.text, key)}</p>;
          case 'list':
            return (
              <ul key={key}>
                {block.items.map((item, itemIndex) => (
                  <li key={`${key}-${itemIndex}`}>{renderInline(item, `${key}-${itemIndex}`)}</li>
                ))}
              </ul>
            );
          case 'code':
            return (
              <pre key={key}>
                <code>{block.text}</code>
              </pre>
            );
          case 'table':
            return (
              <div key={key} className="overflow-x-auto">
                <table className="w-full border-collapse text-[0.8125rem]">
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={`${key}-${rowIndex}`} className="border-b border-line last:border-0">
                        {row.map((cell, cellIndex) => (
                          <td
                            key={`${key}-${rowIndex}-${cellIndex}`}
                            className={
                              rowIndex === 0
                                ? 'py-2 pr-4 font-medium text-fg'
                                : 'py-2 pr-4 text-muted'
                            }
                          >
                            {renderInline(cell, `${key}-${rowIndex}-${cellIndex}`)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
