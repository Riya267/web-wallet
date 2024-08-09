const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="p-8 shadow-lg rounded-lg text-center flex flex-col justify-center items-center">
        <h1 className="text-[3rem] lg:text-[4.25rem] leading-[4rem] font-bold text-cyan-50 my-4">
          404 - Not Found
        </h1>
        <p className="text-gray-600 my-4 text-2xl text-fuchsia-600">
          Sorry, the page you are looking for does not exist.
        </p>
        <div className="px-8 py-4 bg-gray-100 my-4 w-fit">
          <a href="/" className="text-decoration-none">
            Go back
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
