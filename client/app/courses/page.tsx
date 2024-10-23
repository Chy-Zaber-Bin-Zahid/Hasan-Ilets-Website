import Link from 'next/link'

// Simulated API function
async function getCourses() {
  // In a real application, this would be an API call
  return [
    { id: 'ielts-academic', name: 'IELTS Academic Course', description: 'Prepare for the IELTS Academic test' },
    { id: 'ielts-general', name: 'IELTS General Training', description: 'Get ready for the IELTS General Training test' },
    { id: 'spoken-english', name: 'Spoken English', description: 'Improve your English speaking skills' },
    { id: 'ielts-sprint', name: 'IELTS Final Sprint', description: 'Last-minute preparation for your IELTS test' },
  ]
}

export default async function CoursesPage() {
  const courses = await getCourses()

  return (
    <div className=" bg-white py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-1">IELTS Preparation</p>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-4">
            My Courses
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:text-xl">
            Choose a course to get started on your IELTS journey
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{course.name}</h2>
              <p className="text-gray-600 text-sm">{course.description}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="absolute top-16 left-3 w-24 h-24 bg-blue-100 rounded-full -z-10 opacity-50" />
      <div className="absolute top-1/4 right-3 w-32 h-32 bg-yellow-100 rounded-full -z-10 opacity-50" />
      <div className="absolute bottom-3 right-1/4 w-40 h-40 bg-purple-100 rounded-full -z-10 opacity-50" />
    </div>
  )
}