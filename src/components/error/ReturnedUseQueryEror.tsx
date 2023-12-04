interface ReturnedUseQueryErorProps {
  data: any;
  error: Error;
}

export function ReturnedUseQueryEror({
  error,
  data,
}: ReturnedUseQueryErorProps) {
  return (
    <div className="flex h-full  w-full items-center justify-center p-2">
      {error && (
        <div className="rounded-lg border p-2 text-error">
          {data.error.message}
        </div>
      )}
      {data && "error" in data && (
        <div className="rounded-lg border p-2 text-error">
          {data?.error.message}
        </div>
      )}
    </div>
  );
}
