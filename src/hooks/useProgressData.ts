import { useEffect, useState } from "react";

export type ProgressPoint = {
    date: string;
    solved: number;
};

export default function useProgressData(): ProgressPoint[] {
    const [data, setData] = useState<ProgressPoint[]>([]);

    useEffect(() => {
        const raw = localStorage.getItem("progress");
        if (raw) {
            try {
                const parsed: ProgressPoint[] = JSON.parse(raw);
                setData(parsed);
            } catch (err) {
                console.error("Invalid progress data", err);
            }
        }
    }, []);

    return data;
}
