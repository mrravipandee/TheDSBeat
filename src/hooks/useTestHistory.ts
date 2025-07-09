import { useEffect, useState } from "react";

export type TestResult = {
    date: string;
    score: number;
    timeTaken: string;
};

export default function useTestHistory() {
    const [history, setHistory] = useState<TestResult[]>([]);

    useEffect(() => {
        const raw = localStorage.getItem("testHistory");
        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                setHistory(parsed);
            } catch (error) {
                console.error("Failed to parse testHistory from localStorage", error);
            }
        }
    }, []);

    const saveResult = (result: TestResult) => {
        const updated = [result, ...history];
        setHistory(updated);
        localStorage.setItem("testHistory", JSON.stringify(updated));
    };

    return { history, saveResult };
}
