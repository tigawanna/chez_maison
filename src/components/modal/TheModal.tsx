interface TheModalProps {
  id: string;
  label: React.ReactNode;
  children: React.ReactNode;
  close_on_bg_click?: boolean;
}

export function TheModal({
  id,
  label,
  children,
  close_on_bg_click = true,
}: TheModalProps) {
  return (
    <div className="flex h-full max-h-screen  w-full items-center justify-center ">
      {/* Open the modal using ID.showModal() method */}
      {/* @ts-expect-error */}
      <button className="btn" onClick={() => window[id].showModal()}>
        {label}
      </button>
      <dialog id={id} className="modal">
        <form
          method="dialog"
          className="modal-bottom relative max-h-[90%] w-[80%] overflow-y-scroll sm:modal-middle lg:w-[70%]"
        >
          <button className="oveflow-scroll btn btn-circle btn-ghost btn-sm absolute right-[2%] top-[2%] text-3xl">
            ✕
          </button>
          {children}
        </form>
        {close_on_bg_click && (
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        )}
      </dialog>
    </div>
  );
}
