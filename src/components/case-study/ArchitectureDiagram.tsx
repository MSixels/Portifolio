/* ------------------------------------------------------------------ *
 * Request flow of the escuta… platform, drawn as inline SVG in the same
 * cyan-neon palette as the rest of the site.
 *
 *   Stripe (REST)        UptimeRobot (GET /health)
 *          \                  /
 *   Next.js ──REST──> API Go ──SQL──> PostgreSQL
 *   (Vercel)          (Render)        (Supabase)
 *
 * Prose lives in i18n and arrives through `labels`; everything hard-coded
 * here is a product name or a wire protocol, which is not translated.
 * ------------------------------------------------------------------ */

const ACCENT = "#5a8cff";
const CYAN = "#2bd9ff";
const INK = "#eef1f5";
const MUTED = "#aeb6c2";

type NodeBoxProps = {
  x: number;
  y: number;
  w?: number;
  title: string;
  host: string;
  role: string;
  dim?: boolean;
};

function NodeBox({ x, y, w = 220, title, host, role, dim }: NodeBoxProps) {
  const stroke = dim ? "rgba(90,140,255,0.35)" : "rgba(43,217,255,0.55)";
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={82}
        rx={14}
        fill={dim ? "rgba(90,140,255,0.05)" : "rgba(43,217,255,0.07)"}
        stroke={stroke}
        strokeWidth={1.2}
      />
      <text
        x={x + 18}
        y={y + 24}
        fill={MUTED}
        fontSize={9.5}
        letterSpacing={2}
        fontFamily="var(--font-mono)"
      >
        {role.toUpperCase()}
      </text>
      <text
        x={x + 18}
        y={y + 47}
        fill={INK}
        fontSize={17}
        fontFamily="var(--font-body)"
      >
        {title}
      </text>
      <text
        x={x + 18}
        y={y + 67}
        fill={dim ? MUTED : CYAN}
        fontSize={11.5}
        fontFamily="var(--font-mono)"
      >
        {host}
      </text>
    </g>
  );
}

function EdgeLabel({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text
      x={x}
      y={y}
      fill={CYAN}
      fontSize={10.5}
      letterSpacing={1.4}
      textAnchor="middle"
      fontFamily="var(--font-mono)"
    >
      {text}
    </text>
  );
}

export function ArchitectureDiagram({
  labels,
  title,
}: {
  labels: { front: string; api: string; db: string; edge: string };
  /** Accessible name for the whole figure (already translated). */
  title: string;
}) {
  return (
    <svg
      viewBox="0 0 900 330"
      role="img"
      aria-label={title}
      className="h-auto w-full min-w-[680px]"
    >
      <defs>
        <marker
          id="arch-arrow"
          markerWidth={9}
          markerHeight={9}
          refX={7}
          refY={3}
          orient="auto"
        >
          <path d="M0,0 L7,3 L0,6 z" fill={CYAN} />
        </marker>
        <filter id="arch-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#arch-glow)" opacity={0.9}>
        {/* Peripherals feed into the Go API */}
        <path
          d="M340 112 L340 158 L406 158 L406 188"
          fill="none"
          stroke={ACCENT}
          strokeWidth={1.2}
          strokeDasharray="5 5"
          markerEnd="url(#arch-arrow)"
        />
        <path
          d="M585 112 L585 158 L494 158 L494 188"
          fill="none"
          stroke={ACCENT}
          strokeWidth={1.2}
          strokeDasharray="5 5"
          markerEnd="url(#arch-arrow)"
        />
        {/* Main request path */}
        <line
          x1={242}
          y1={231}
          x2={332}
          y2={231}
          stroke={CYAN}
          strokeWidth={1.4}
          markerEnd="url(#arch-arrow)"
        />
        <line
          x1={562}
          y1={231}
          x2={652}
          y2={231}
          stroke={CYAN}
          strokeWidth={1.4}
          markerEnd="url(#arch-arrow)"
        />
      </g>

      <EdgeLabel x={287} y={219} text="REST / JSON" />
      <EdgeLabel x={607} y={219} text="SQL" />
      <text
        x={416}
        y={150}
        fill={MUTED}
        fontSize={10}
        letterSpacing={1.2}
        fontFamily="var(--font-mono)"
      >
        webhook
      </text>
      {/* Right-aligned so it stops short of the UptimeRobot drop at x=585. */}
      <text
        x={575}
        y={150}
        fill={MUTED}
        fontSize={10}
        letterSpacing={1.2}
        textAnchor="end"
        fontFamily="var(--font-mono)"
      >
        GET /health
      </text>

      <NodeBox x={250} y={30} w={180} title="Stripe" host="REST" role={labels.edge} dim />
      <NodeBox x={490} y={30} w={190} title="UptimeRobot" host="cron 5 min" role={labels.edge} dim />

      <NodeBox x={20} y={190} title="Next.js" host="Vercel" role={labels.front} />
      <NodeBox x={340} y={190} title="API Go" host="Render" role={labels.api} />
      <NodeBox x={660} y={190} title="PostgreSQL" host="Supabase" role={labels.db} />
    </svg>
  );
}
