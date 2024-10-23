import { Mail, Phone } from "lucide-react"
import Image from "next/image"

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-2">Contact With Me</h1>
                <p className="text-center text-gray-600 mb-8">Get in touch with me</p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-white p-6 rounded-lg shadow-lg">
                    <div className="w-full md:w-1/2 space-y-6">
                        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Mail className="text-gray-600" />
                                <span>amihasan471@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="text-gray-600" />
                                <span>+8801772328966</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 relative h-[400px]">
                        <div className="absolute inset-0 rounded-lg overflow-hidden">
                            <Image
                                src="/images/teacher.jpg"
                                alt="Contact image"
                                layout="fill"
                                objectFit="cover"
                                objectPosition="top"
                               className="rounded-lg scale-x-[-1]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}