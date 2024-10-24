"use client"

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface Question {
    id: number;
    type: 'truefalse' | 'fillin';
    question: string;
    correctAnswer: string;
}

interface FormData {
    [key: string]: string;
}

const questions: Question[] = [
    { id: 1, type: 'truefalse', question: "People had expected Andy Murray to become the world's top tennis player for at least five years before 2016.", correctAnswer: "FALSE" },
    { id: 2, type: 'truefalse', question: "The change that Andy Murray made to his rackets attracted a lot of attention.", correctAnswer: "TRUE" },
    { id: 3, type: 'truefalse', question: "Most of the world's top players take a professional racket stringer on tour with them.", correctAnswer: "NOT GIVEN" },
    { id: 4, type: 'truefalse', question: "Mike and Bob Bryan use rackets that are light in comparison to the majority of rackets.", correctAnswer: "NOT GIVEN" },
    { id: 8, type: 'fillin', question: "Mike and Bob Bryan made changes to the types of ________ used on their racket frames.", correctAnswer: "materials" },
    { id: 9, type: 'fillin', question: "Players were not allowed to use the spaghetti-strung racket because of the amount of ________ it created.", correctAnswer: "spin" },
    { id: 10, type: 'fillin', question: "Changes to rackets can be regarded as being as important as players' diets or the ________ they do.", correctAnswer: "training" },
    { id: 11, type: 'fillin', question: "All rackets used to have natural strings made from the ________ of animals.", correctAnswer: "gut" },
    { id: 12, type: 'fillin', question: "Pete Sampras had metal ________ put into the frames of his rackets.", correctAnswer: "lead" },
]

export default function ReadingTest() {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        mode: 'onSubmit'
    })
    const [results, setResults] = useState<{ [key: number]: boolean }>({})
    const [score, setScore] = useState<number | null>(null)
    const [showAnswers, setShowAnswers] = useState(false)

    const onSubmit = (data: FormData) => {
        const newResults = questions.reduce((acc, question) => {
            acc[question.id] = data[`question${question.id}`].toLowerCase() === question.correctAnswer.toLowerCase()
            return acc
        }, {} as { [key: number]: boolean })
        setResults(newResults)
        const newScore = Object.values(newResults).filter(Boolean).length
        setScore(newScore)
    }

    const renderInlineInput = (question: Question, index: number) => {
        const parts = question.question.split('________')
        return (
            <p className="">
                {index + 1}. {parts[0]}
                <Controller
                    name={`question${question.id}`}
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            className="px-1 inline-block py-0 h-6 w-32 mx-1 border-b border-t-0 border-l-0 border-r-0 rounded-none focus:outline-none"
                            placeholder="Answer"
                        />
                    )}
                />
                {parts[1]}
            </p>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Practice Cam 19 Reading Test 01</h1>
            <Card>
                <CardHeader>
                    <CardTitle>READING PASSAGE 1</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">You should spend about 20 minutes on Questions 1-13, which are based on Reading Passage 1 below.</p>
                    <h2 className="text-2xl font-semibold mb-4">How tennis rackets have changed</h2>
                    <p className="mb-4">
                        In 2016, the British professional tennis player Andy Murray was ranked as the world&apos;s number
                        one. It was an incredible achievement by any standard – made even more remarkable by the
                        fact that he did this during a period considered to be one of the strongest in the sport&apos;s
                        history, competing against the likes of Rafael Nadal, Roger Federer and Novak Djokovic, to
                        name just a few. Yet five years previously, he had been regarded as a talented outsider who
                        entered but never won the major tournaments.
                    </p>
                    {/* Add more paragraphs of the reading passage here */}
                </CardContent>
            </Card>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Questions 1-7</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">Do the following statements agree with the information given in Reading Passage 1?</p>
                        {questions.filter(q => q.type === 'truefalse').map((question) => (
                            <div key={question.id} className="mb-4">
                                <Label htmlFor={`question${question.id}`} className="mb-2">{question.id}. {question.question}</Label>
                                <Controller
                                    name={`question${question.id}`}
                                    control={control}
                                    rules={{ required: "This field is required" }}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger id={`question${question.id}`}>
                                                <SelectValue placeholder="Select an answer" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="TRUE">TRUE</SelectItem>
                                                <SelectItem value="FALSE">FALSE</SelectItem>
                                                <SelectItem value="NOT GIVEN">NOT GIVEN</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors[`question${question.id}`] && (
                                    <p className="text-red-500 text-sm mt-1">{errors[`question${question.id}`]?.message as string}</p>
                                )}
                                {results[question.id] !== undefined && (
                                    <p className={results[question.id] ? "text-green-600 mt-1" : "text-red-600 mt-1"}>
                                        {results[question.id] ? "Correct" : "Incorrect"}
                                    </p>
                                )}
                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${showAnswers ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-blue-600 mt-1">Answer: {question.correctAnswer}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Questions 8-13</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">Complete the notes below. Choose ONE WORD ONLY from the passage for each answer.</p>
                        {questions.filter(q => q.type === 'fillin').map((question, index) => (
                            <div key={question.id} className="mb-4">
                                {renderInlineInput(question, index)}
                                {errors[`question${question.id}`] && (
                                    <p className="text-red-500 text-sm mt-1">{errors[`question${question.id}`]?.message as string}</p>
                                )}
                                {results[question.id] !== undefined && (
                                    <p className={results[question.id] ? "text-green-600 mt-1" : "text-red-600 mt-1"}>
                                        {results[question.id] ? "Correct" : "Incorrect"}
                                    </p>
                                )}
                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${showAnswers ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-blue-600 mt-1">Answer: {question.correctAnswer}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {score !== null && (
                    <div className="text-center text-xl font-bold mb-4">
                        Your Score: {score} out of {questions.length}
                    </div>
                )}

                <div className="flex justify-between items-center gap-6">
                    <Button type="submit" className="w-full">Check Answers</Button>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => setShowAnswers(!showAnswers)}
                    >
                        {showAnswers ? "Hide Answers" : "Show Answers"}
                    </Button>
                </div>
            </form>
        </div>
    )
}