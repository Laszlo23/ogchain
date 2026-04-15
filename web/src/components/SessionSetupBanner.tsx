import type { SiweVerifyResponse } from "@/lib/siwe-verify-types";

type Props = {
  verify: SiweVerifyResponse | null;
  className?: string;
};

export function SessionSetupBanner({ verify, className }: Props) {
  if (!verify || verify.sessionEstablished) return null;
  const err = verify.sessionError;
  if (!err) return null;

  return (
    <div
      className={`rounded-xl border border-amber-500/35 bg-amber-950/30 px-4 py-3 text-sm text-amber-100/95 ${className ?? ""}`}
    >
      <p className="font-medium text-amber-200">Session not active</p>
      {err === "missing_database" && (
        <p className="mt-1 text-xs leading-relaxed text-amber-200/80">
          Set <code className="text-zinc-200">DATABASE_URL</code> and run{" "}
          <code className="text-zinc-200">web/sql/schema.sql</code> and{" "}
          <code className="text-zinc-200">web/sql/community_schema.sql</code> so sign-in can bind your wallet.
        </p>
      )}
      {err === "missing_session_secret" && (
        <p className="mt-1 text-xs leading-relaxed text-amber-200/80">
          Set <code className="text-zinc-200">SESSION_SECRET</code> (16+ random characters) in{" "}
          <code className="text-zinc-200">web/.env.local</code> and restart the server so HttpOnly cookies can be issued.
        </p>
      )}
    </div>
  );
}
