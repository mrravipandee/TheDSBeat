import { useEffect, useState } from "react";
import { Question } from "@/types";

export default function useTopicQuestions(topic: string) {
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        const data = localStorage.getItem(`questions-${topic}`);
        if (data) {
            setQuestions(JSON.parse(data));
        }
    }, [topic]);

    const addQuestion = (q: Question) => {
        const newQuestions = [q, ...questions];
        setQuestions(newQuestions);
        localStorage.setItem(`questions-${topic}`, JSON.stringify(newQuestions));
    };

    return { questions, addQuestion };
}
