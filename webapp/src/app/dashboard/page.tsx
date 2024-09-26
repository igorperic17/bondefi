'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

const ComingSoonPage = () => {
    return (
        <div className="container mx-auto px-4 py-8  flex flex-col items-center justify-center">
            <Card className="w-full max-w-2xl">
                <CardContent className="p-8">
                    <motion.h1
                        className="text-4xl font-bold mb-8 text-center"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Dashboard Coming Soon
                    </motion.h1>
                    <motion.p
                        className="text-xl text-center mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        We're working hard to bring you an amazing dashboard experience. Stay tuned!
                    </motion.p>
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.5 }}
                    >
                        <Button
                            onClick={() => window.history.back()}
                        >
                            Go Back
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </motion.div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ComingSoonPage
