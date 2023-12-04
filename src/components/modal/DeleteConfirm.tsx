import { Trash, Loader, Check, X } from "lucide-react";
import { TheFormModal, closeModal } from "./TheFormModal";

interface DeleteConfirmProps {
  modal_id: string;
  is_loading: boolean;
  handleDelete: () => any;
}

export function DeleteConfirm({
  handleDelete,
  is_loading,
  modal_id,
}: DeleteConfirmProps) {
  return (
    <div className="flex items-center justify-end p-1">
      <div className="card-actions   border ">
        <TheFormModal
          label={<Trash className="h-6 w-6 hover:text-error" />}
          id={modal_id}
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 ">
            <h3 className="text-3xl font-bold text-warning">Confirm Delete</h3>
            <span className="flex w-full items-center justify-evenly gap-4">
              <button
                onClick={() => {
                  handleDelete();
                  closeModal(modal_id);
                }}
                className="btn btn-outline"
                type="button"
              >
                {is_loading ? (
                  <Loader className="h-6 w-6 text-success" />
                ) : (
                  <Check className="h-6 w-6 text-success" />
                )}
              </button>
              <button
                onClick={() => {
                  closeModal(modal_id);
                }}
                className="btn btn-outline"
              >
                <X className="h-6 w-6 text-error" />
              </button>
            </span>
          </div>
        </TheFormModal>
      </div>
    </div>
  );
}
