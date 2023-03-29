export default function Container({ title, children }) {
  return (
    <div className="py-8">
      <header>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 text-center">
            {title}
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
