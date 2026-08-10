/* ------------------------------------------------------------------ *
 * Read-only code viewer with a tiny built-in highlighter.
 *
 * Deliberately dependency-free: the case study shows two short excerpts
 * (Go + SQL), which does not justify shipping a full grammar engine to
 * every visitor. One regex per language, four token classes, no state.
 * ------------------------------------------------------------------ */

export type CodeLang = "go" | "sql";

type Token = { text: string; kind: keyof typeof TOKEN_CLASS };

const TOKEN_CLASS = {
  comment: "text-muted-3 italic",
  string: "text-[#7ff0c4]",
  number: "text-[#f5b78a]",
  keyword: "text-[#2bd9ff]",
  call: "text-[#9fe8ff]",
  plain: "text-[#d7dde6]",
} as const;

/* Capture groups are ordered comment | string | number | keyword | call so a
 * single pass can map group index → token class. */
const GRAMMAR: Record<CodeLang, RegExp> = {
  go: new RegExp(
    [
      "(\\/\\/[^\\n]*)",
      "(`[^`]*`|\"(?:[^\"\\\\\\n]|\\\\.)*\")",
      "(\\b\\d+(?:\\.\\d+)?\\b)",
      "(\\b(?:package|import|func|return|var|const|type|struct|interface|map|chan|range|defer|go|select|if|else|for|switch|case|default|break|continue|nil|true|false|error|string|bool|byte|rune|int|int64|float64)\\b)",
      "([A-Za-z_][A-Za-z0-9_.]*)(?=\\()",
    ].join("|"),
    "g"
  ),
  sql: new RegExp(
    [
      "(--[^\\n]*)",
      "('(?:[^']|'')*')",
      "(\\b\\d+(?:\\.\\d+)?\\b)",
      "(\\b(?:CREATE|TABLE|ALTER|ADD|DROP|COLUMN|UNIQUE|PARTIAL|INDEX|ON|WHERE|IS|NOT|NULL|AND|OR|PRIMARY|KEY|FOREIGN|REFERENCES|DEFAULT|CASCADE|SET|IF|EXISTS|CHECK|CONSTRAINT|INTERVAL|SELECT|FROM|INSERT|INTO|UPDATE|VALUES|UUID|TEXT|BOOLEAN|TIMESTAMPTZ|NUMERIC|INT|TRUE|FALSE|now|gen_random_uuid)\\b)",
      "(\\b[A-Za-z_][A-Za-z0-9_]*\\b)(?=\\s*\\()",
    ].join("|"),
    "gi"
  ),
};

const KINDS = ["comment", "string", "number", "keyword", "call"] as const;

function tokenize(code: string, lang: CodeLang): Token[] {
  const re = new RegExp(GRAMMAR[lang].source, GRAMMAR[lang].flags);
  const out: Token[] = [];
  let last = 0;

  for (const m of code.matchAll(re)) {
    const at = m.index ?? 0;
    if (at > last) out.push({ text: code.slice(last, at), kind: "plain" });
    const groupIndex = KINDS.findIndex((_, i) => m[i + 1] !== undefined);
    out.push({ text: m[0], kind: KINDS[groupIndex] ?? "plain" });
    last = at + m[0].length;
  }
  if (last < code.length) out.push({ text: code.slice(last), kind: "plain" });
  return out;
}

export function CodeBlock({
  code,
  lang,
  filename,
  label,
}: {
  code: string;
  lang: CodeLang;
  /** Path shown in the title bar — real path in the escuta… repository. */
  filename: string;
  /** Accessible name for the scroll region (already translated). */
  label: string;
}) {
  const tokens = tokenize(code, lang);

  return (
    <div className="overflow-hidden rounded-[16px] border border-[rgba(90,140,255,0.28)] bg-[rgba(4,6,10,0.72)] shadow-[0_22px_60px_-30px_rgba(90,140,255,0.5)]">
      <div className="flex items-center justify-between gap-[12px] border-b border-white/[0.08] bg-white/[0.02] px-[16px] py-[10px]">
        <span className="truncate font-mono text-[11.5px] tracking-[0.5px] text-muted-2">
          {filename}
        </span>
        <span className="shrink-0 rounded-full border border-[rgba(90,140,255,0.4)] bg-[rgba(90,140,255,0.08)] px-[9px] py-[3px] font-mono text-[10px] uppercase tracking-[1.5px] text-accent">
          {lang}
        </span>
      </div>
      {/* tabIndex makes the horizontal scroller reachable by keyboard. */}
      <div
        role="region"
        aria-label={label}
        tabIndex={0}
        className="overflow-x-auto"
      >
        <pre className="m-0 p-[clamp(16px,2vw,22px)] font-mono text-[12.5px] leading-[1.75]">
          <code>
            {tokens.map((tok, i) => (
              <span key={i} className={TOKEN_CLASS[tok.kind]}>
                {tok.text}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
