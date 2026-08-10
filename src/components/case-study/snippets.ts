/* ------------------------------------------------------------------ *
 * Source excerpts shown read-only in the escuta… case study.
 *
 * These mirror the two decisions the case study argues for: a /health
 * route with no database round-trip (so UptimeRobot can keep the Render
 * free tier awake without touching Supabase), and the PARTIAL unique
 * index that makes the Stripe webhook idempotent.
 * ------------------------------------------------------------------ */

export const GO_HEALTH = `// GET /health — deliberately static.
//
// The first version called db.Ping() here. On the Render free tier the
// instance hibernates and Supabase drops to "degraded", so the ping
// blocked, the probe timed out, and the platform stayed asleep exactly
// when it needed to wake up. The health route now proves the process is
// serving HTTP and nothing else; database health is a separate concern.
func pingHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "no-store")
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write([]byte(\`{"status":"ok"}\`))
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", pingHandler)
	// ... domain routes behind auth + RequireActiveSubscription
	log.Fatal(http.ListenAndServe(":"+port, mux))
}`;

export const SQL_SCHEMA = `-- Core of the domain: four tables, no ORM.
CREATE TABLE psicanalistas (
    id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email              TEXT        NOT NULL UNIQUE,
    senha_hash         TEXT        NOT NULL,
    trial_termina_em   TIMESTAMPTZ NOT NULL DEFAULT now() + INTERVAL '60 days',
    stripe_customer_id TEXT,
    criado_em          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE pacientes (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    psicanalista_id UUID NOT NULL REFERENCES psicanalistas(id) ON DELETE CASCADE,
    nome           TEXT        NOT NULL,
    ativo          BOOLEAN     NOT NULL DEFAULT TRUE,
    criado_em      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE pacotes (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paciente_id  UUID    NOT NULL REFERENCES pacientes(id) ON DELETE CASCADE,
    sessoes_total INT    NOT NULL,
    valor        NUMERIC(12,2) NOT NULL,
    moeda        TEXT    NOT NULL DEFAULT 'BRL'  -- BRL | USD | EUR | ARS
);

CREATE TABLE sessoes (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paciente_id UUID        NOT NULL REFERENCES pacientes(id) ON DELETE CASCADE,
    pacote_id   UUID        REFERENCES pacotes(id) ON DELETE SET NULL,
    inicia_em   TIMESTAMPTZ NOT NULL,
    status      TEXT        NOT NULL DEFAULT 'agendada'
);`;

export const SQL_INDEX = `-- migrations/0007_stripe_customer_unique.sql
--
-- Additive by design: the column arrives NULLable so every row already in
-- production stays valid and no backfill is required.
ALTER TABLE psicanalistas
    ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

-- The webhook is the reason this index is PARTIAL. Stripe retries delivery,
-- so the same customer.subscription.created can land more than once; the
-- unique constraint makes the second write fail instead of duplicating the
-- customer. It has to skip NULLs, because every account still inside the
-- 60-day trial has no Stripe customer at all — a plain UNIQUE would let
-- exactly one of them exist.
CREATE UNIQUE INDEX IF NOT EXISTS psicanalistas_stripe_customer_id_key
    ON psicanalistas (stripe_customer_id)
    WHERE stripe_customer_id IS NOT NULL;`;
