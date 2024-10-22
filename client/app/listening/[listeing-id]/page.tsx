"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface Question {
  id: number;
  type: 'fillin' | 'multiplechoice';
  question: string;
  correctAnswer: string;
  options?: string[];
}

interface Part {
  questions: Question[];
  audioPath: string;
}

interface FormData {
  [key: string]: string;
}

const questions: { part1: Part; part2: Part } = {
  part1: {
    questions: [
      { id: 1, type: 'fillin', question: "Postcode:", correctAnswer: "SW1" },
      { id: 2, type: 'fillin', question: "Date of bus journey:", correctAnswer: "15/07/2023" },
      { id: 3, type: 'fillin', question: "Reason for trip: shopping and visit to the", correctAnswer: "museum" },
      { id: 4, type: 'fillin', question: "Travelled by bus because cost of ________ too high", correctAnswer: "taxi" },
      { id: 5, type: 'fillin', question: "Got on bus at ________ Street", correctAnswer: "Oxford" },
    ],
    audioPath: "/audio/test.mp3"
  },
  part2: {
    questions: [
      { id: 11, type: 'multiplechoice', question: "Why does the speaker apologise about the seats?", correctAnswer: "A", options: ["A. They are too small.", "B. They are uncomfortable.", "C. They are dirty."] },
    ],
    audioPath: "/audio/test2.mp3"
  }
}

interface AudioPlayerProps {
  src: string;
  part: string;
  onPlay: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, onPlay }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleError = (e: ErrorEvent) => {
      console.error("Audio error:", e)
      setError("There was an error loading the audio. Please try again later.")
    }

    audio.addEventListener('error', handleError)
    audio.addEventListener('play', onPlay)

    return () => {
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('play', onPlay)
    }
  }, [onPlay])

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="mb-4">
      <audio ref={audioRef} src={src} controls className="w-full" />
    </div>
  )
}

export default function ListeningTest() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [results, setResults] = useState<{ [key: number]: boolean }>({})
  const [score, setScore] = useState<number | null>(null)
  const [showAnswers, setShowAnswers] = useState(false)

  const onSubmit = (data: FormData) => {
    const allQuestions = [...questions.part1.questions, ...questions.part2.questions]
    const newResults = allQuestions.reduce((acc, question) => {
      acc[question.id] = data[`question${question.id}`].toLowerCase() === question.correctAnswer.toLowerCase()
      return acc
    }, {} as { [key: number]: boolean })
    setResults(newResults)
    const newScore = Object.values(newResults).filter(Boolean).length
    setScore(newScore)
  }

  const handlePlay = (part: string) => {
    const allAudios = document.querySelectorAll('audio') as NodeListOf<HTMLAudioElement>;
  
    const currentAudioPath = questions[part as keyof typeof questions].audioPath;
    console.log(allAudios);
  
    allAudios.forEach(audio => {
      const audioPath = new URL(audio.src).pathname;
  
      if (audioPath !== currentAudioPath) {
        audio.pause();
      }
    });
  };

  const renderQuestions = (part: Part) => {
    return part.questions.map((question) => (
      <div key={question.id} className="mb-4">
        <Label htmlFor={`question${question.id}`} className="block mb-2">{question.question}</Label>
        {question.type === 'fillin' ? (
          <Controller
            name={`question${question.id}`}
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Input {...field} id={`question${question.id}`} className="w-full" />
            )}
          />
        ) : (
          <Controller
            name={`question${question.id}`}
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                {question.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <RadioGroupItem value={option.split('.')[0]} id={`question${question.id}-${index}`} />
                    <Label htmlFor={`question${question.id}-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
        )}
        {errors[`question${question.id}`] && (
          <p className="text-red-500 text-sm mt-1">{errors[`question${question.id}`]?.message as string}</p>
        )}
        {results[question.id] !== undefined && (
          <p className={results[question.id] ? "text-green-600 mt-1" : "text-red-600 mt-1"}>
            {results[question.id] ? "Correct" : "Incorrect"}
          </p>
        )}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showAnswers ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-blue-600 mt-1">Correct Answer: {question.correctAnswer}</p>
        </div>
      </div>
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Practice Cam 18 Listening Test 01</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>PART 1</CardTitle>
        </CardHeader>
        <CardContent>
          <AudioPlayer src={questions.part1.audioPath} part="PART 1" onPlay={() => handlePlay('part1')} />

          <h2 className="text-xl font-semibold mb-4">Questions 1-5</h2>
          <p className="mb-4">Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.</p>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Transport survey</h3>
            <div>
              <p>Name: Sadie Jones</p>
              <p>Year of birth: 1991</p>
            </div>
            {renderQuestions(questions.part1)}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>PART 2</CardTitle>
        </CardHeader>
        <CardContent>
          <AudioPlayer src={questions.part2.audioPath} part="PART 2" onPlay={() => handlePlay('part2')} />

          <h2 className="text-xl font-semibold mb-4">Question 11</h2>
          <p className="mb-4">Choose the correct letter, A, B or C.</p>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Becoming a volunteer for ACE</h3>
            {renderQuestions(questions.part2)}
          </div>
        </CardContent>
      </Card>

      {score !== null && (
        <div className="text-center text-xl font-bold mb-4">
          Your Score: {score} out of {questions.part1.questions.length + questions.part2.questions.length}
        </div>
      )}

      <Button onClick={handleSubmit(onSubmit)} className="w-full mb-4">Check Answers</Button>

      <Button 
        onClick={() => setShowAnswers(!showAnswers)} 
        variant="outline"
        className="w-full"
      >
        {showAnswers ? "Hide Answers" : "Show Answers"}
      </Button>
    </div>
  )
}