function NoDataFoundMsg() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="text-5xl mb-4">📭</div>

      <h2 className="text-xl font-semibold text-gray-800">
        No Applications found
      </h2>
    </div>
  );
}

export default NoDataFoundMsg;
