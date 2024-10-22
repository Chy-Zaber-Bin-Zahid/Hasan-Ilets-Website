import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Test {
  year: number;
  passages: string[];
}

function Reading() {
  const tests: Test[] = [
    { year: 19, passages: ['reading-1', 'reading-2', 'reading-3', 'reading-4'] },
    { year: 18, passages: ['reading-5', 'reading-6', 'reading-7', 'reading-8'] },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-wider text-red-500 mb-2">ielts academic</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Cambridge Practice Reading</h1>
        <p className="text-xl text-gray-600">with Answers</p>
      </div>

      <div className="space-y-6">
        {tests.map((test) => (
          <div key={test.year} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {test.passages.map((passageId, index) => (
              <Card key={passageId} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <Link href={`/reading/${passageId}`} passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      className="w-full h-full py-6 text-lg font-semibold"
                    >
                      Cam {test.year} Test {index + 1}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-16 left-3 w-24 h-24 bg-blue-100 rounded-full -z-10 opacity-50" />
      <div className="absolute top-1/4 right-3 w-32 h-32 bg-yellow-100 rounded-full -z-10 opacity-50" />
      <div className="absolute bottom-3 right-1/4 w-40 h-40 bg-purple-100 rounded-full -z-10 opacity-50" />
    </div>
  )
}

export default Reading