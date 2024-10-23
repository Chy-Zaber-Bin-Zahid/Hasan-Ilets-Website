import { Book, Headphones, GraduationCap, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Master IELTS with Confidence</h1>
          <p className="text-xl text-gray-600 mb-8">Unlock global opportunities with our comprehensive IELTS preparation courses</p>
          <Button asChild size="lg">
            <Link href="/courses">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Book className="mr-2 h-5 w-5" />
                Reading
              </CardTitle>
            </CardHeader>
            <CardContent>
              Enhance your reading comprehension skills with our targeted exercises and strategies.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Headphones className="mr-2 h-5 w-5" />
                Listening
              </CardTitle>
            </CardHeader>
            <CardContent>
              Improve your listening skills with our diverse range of audio materials and practice tests.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="mr-2 h-5 w-5" />
                Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              Access our comprehensive courses designed to boost your IELTS performance across all sections.
            </CardContent>
          </Card>
        </section>

        <section className="bg-blue-900 text-white rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4">Why IELTS is important?</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <ArrowRight className="mr-2 h-4 w-4" />
              Open doors to international education opportunities
            </li>
            <li className="flex items-center">
              <ArrowRight className="mr-2 h-4 w-4" />
              Enhance your career prospects globally
            </li>
            <li className="flex items-center">
              <ArrowRight className="mr-2 h-4 w-4" />
              Prove your English proficiency for immigration purposes
            </li>
          </ul>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to start your IELTS journey?</h2>
          <p className="text-gray-600 mb-8">Join thousands of successful test-takers who have achieved their goals with our expert guidance.</p>
          <Button asChild>
            <Link href="/contact">
              <Mail className="mr-2 h-4 w-4" />
              Contact Us
            </Link>
          </Button>
        </section>
      </main>
    </div>
  )
}