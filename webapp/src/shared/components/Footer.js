import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-900/10 mt-8">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-8 sm:py-8 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          <div className="pb-2">
            <Link
              href="/"
              className="text-sm leading-6 text-gray-600 hover:text-gray-900"
            >
              Explore
            </Link>
          </div>
          <div className="pb-2">
            <Link
              href="https://github.com/JovianHQ/whatbot#whatbot"
              className="text-sm leading-6 text-gray-600 hover:text-gray-900"
            >
              About
            </Link>
          </div>
          <div className="pb-2">
            <Link
              href="https://whatbotai.substack.com/"
              className="text-sm leading-6 text-gray-600 hover:text-gray-900"
            >
              Blog
            </Link>
          </div>
        </nav>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; 2023 SwiftAce Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
