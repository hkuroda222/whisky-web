export const Loading: React.FC = () => {
  return (
    <>
      <div className="fixed overflow-y-auto overflow-x-hidden top-2/4 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-full h-full max-h-full bg-gray-600/70" />
      <div className="fixed z-50 top-2/4 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <div className="animate-spin h-20 w-20 border-4 border-blue-700 rounded-full border-t-transparent" />
      </div>
    </>
  );
};
