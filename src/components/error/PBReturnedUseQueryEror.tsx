import { ClientResponseError } from "pocketbase";

interface ReturnedUseQueryErorProps {
  error: ClientResponseError | Error | null;
}

export function PBReturnedUseQueryError({ error }: ReturnedUseQueryErorProps) {
  return (
    <div className="h-full flex w-full items-center justify-center p-2 text-sm bg-error-content">
      {error && (
        <div className="rounded-lg border p-2 text-error">{error.message}</div>
      )}
    </div>
  );
}
