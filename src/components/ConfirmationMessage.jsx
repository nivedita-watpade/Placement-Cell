function ConfirmationMessage({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Modal Box */}
      <div className="relative bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md text-center z-10">
        <div className="text-5xl mb-4">📭</div>

        <h2 className="text-xl font-semibold text-gray-800 mb-6">{message}</h2>

        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#00a03d] text-white rounded-lg"
          >
            Yes
          </button>

          <button
            onClick={onCancel}
            className="px-4 py-2 bg-[#e20000] text-white rounded-lg"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationMessage;
