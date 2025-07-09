import { useEffect, useState } from "react";
import { DSA_TOPICS } from "@/constants/dsaTopics";
import { Question } from "@/types";

type QuestionWithTopic = Question & { topic: string };

export default function useSolvedQuestions() {
    const [questions, setQuestions] = useState<QuestionWithTopic[]>([]);
    useEffect(() => {
        const all: QuestionWithTopic[] = [];

        DSA_TOPICS.forEach((topic) => {
            const data = localStorage.getItem(`questions-${topic}`);
            if (data) {
                try {
                    const parsed: Question[] = JSON.parse(data);
                    parsed.forEach((q) => all.push({ ...q, topic }));
                } catch (err) {
                    console.error("Invalid question data for topic:", topic);
                }
            }
        });

        setQuestions(all);
    }, []);

    return questions;
}
