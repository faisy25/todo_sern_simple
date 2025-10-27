const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(90vh-40px)] bg-base-50 text-base-900 px-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-2 sm:mb-4">
        404
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-base-900">Not Found</p>
    </div>
  );
};

export default NotFound;
