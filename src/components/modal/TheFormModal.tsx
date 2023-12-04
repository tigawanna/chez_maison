interface TheFormModalProps {
  id: string;
  label: React.ReactNode;
  children: React.ReactNode;
  close_on_bg_click?: boolean;
}

export function TheFormModal({
  id,
  label,
  children,
  close_on_bg_click = true,
}: TheFormModalProps) {
  return (
    <div className="flex items-center justify-center">
      {/* The button to open modal */}
      <label htmlFor={id} className="">
        {label}
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className=" modal modal-bottom  md:modal-middle bg-base-100 z-60">
        <div className="modal-box ">{children}</div>
        <label className="modal-backdrop z-60" htmlFor={id}>
          Close
        </label>
      </div>
    </div>
  );
}

export function closeModal(modal_id: string) {
  const hidden_checkbox = document.getElementById(modal_id) as HTMLInputElement;
  if (hidden_checkbox && hidden_checkbox.type === "checkbox") {
    hidden_checkbox.checked = false;
  }
}
