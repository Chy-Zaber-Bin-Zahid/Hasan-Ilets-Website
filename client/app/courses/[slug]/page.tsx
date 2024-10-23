'use client'

import { notFound } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

interface Course {
  title: string
  duration: string
  classes: number
  clubAccess: string
  classLength: string
  mockTests: number
  image: string
}

// Simulated API function
async function getCourseBySlug(slug: string): Promise<Course | null> {
  // In a real application, this would be an API call or database query
  const courses = {
    'ielts-academic': {
      title: 'IELTS Academic Course',
      duration: '3 months',
      classes: 36,
      clubAccess: '6 months free club access',
      classLength: '1.5 hours',
      mockTests: 1,
      image: '/images/course.jpg'
    },
    'ielts-general': {
      title: 'IELTS General Training',
      duration: '3 months',
      classes: 48,
      clubAccess: '6 months free club access',
      classLength: '2 hours',
      mockTests: 2,
      image: '/images/course.jpg'
    },
    'spoken-english': {
      title: 'Spoken English',
      duration: '2 months',
      classes: 24,
      clubAccess: '3 months free club access',
      classLength: '1.5 hours',
      mockTests: 0,
      image: '/images/course.jpg'
    },
    'ielts-sprint': {
      title: 'IELTS Final Sprint',
      duration: '1 month',
      classes: 26,
      clubAccess: '2 months free club access',
      classLength: '3 hours',
      mockTests: 0,
      image: '/images/course.jpg'
    }
  }

  return courses[slug as keyof typeof courses] || null
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const courseRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const [course, setCourse] = useState<Course | null>(null)
  const [animationTriggered, setAnimationTriggered] = useState(false)

  useEffect(() => {
    const fetchCourse = async () => {
      const fetchedCourse = await getCourseBySlug(params.slug)
      if (!fetchedCourse) {
        notFound()
      }
      setCourse(fetchedCourse)
      setAnimationTriggered(true)
    }

    fetchCourse()
  }, [params.slug])

  useEffect(() => {
    if (animationTriggered && imageRef.current && infoRef.current) {
      gsap.fromTo(imageRef.current,
        { x: '-100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 2, ease: 'power3.out' }
      )

      gsap.fromTo(infoRef.current,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 2, ease: 'power3.out' }
      )
    }
  }, [animationTriggered])

  if (!course) {
    return null // or a loading spinner
  }

  return (
    <div ref={courseRef} className="bg-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div ref={imageRef} className="w-full md:w-1/2 flex justify-center items-center h-[500px]">
            <Image
              src={course.image}
              alt={`${course.title} Image`}
              layout="fill"
               className="object-cover md:object-contain"
              objectPosition="top"
            />
          </div>
          <div ref={infoRef} className="w-full md:w-1/2 space-y-6">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">{course.title}</h1>
            <div className="space-y-4">
              <p className="flex items-center">
                <span className="w-40 font-semibold text-gray-700">Duration:</span>
                <span className="text-gray-600">{course.duration}</span>
              </p>
              <p className="flex items-center">
                <span className="w-40 font-semibold text-gray-700">Number of Classes:</span>
                <span className="text-gray-600">{course.classes}</span>
              </p>
              <p className="flex items-center">
                <span className="w-40 font-semibold text-gray-700">Club Access:</span>
                <span className="text-gray-600">{course.clubAccess}</span>
              </p>
              <p className="flex items-center">
                <span className="w-40 font-semibold text-gray-700">Class Length:</span>
                <span className="text-gray-600">{course.classLength}</span>
              </p>
              <p className="flex items-center">
                <span className="w-40 font-semibold text-gray-700">Mock Tests:</span>
                <span className="text-gray-600">{course.mockTests}</span>
              </p>
            </div>
            {/* <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors">
              Enroll Now
            </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}