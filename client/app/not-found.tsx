import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-57px)] bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-4xl font-extrabold text-gray-900">404 - Page Not Found</h2>
          <p className="mt-2 text-sm text-gray-600">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
        <div className="mt-8">
          <p className="text-md text-gray-600">
            Don&apos;t worry, you can still master IELTS with confidence! Let&apos;s get you back on track.
          </p>
        </div>
        <div className="mt-6">
          <Link 
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  )
}