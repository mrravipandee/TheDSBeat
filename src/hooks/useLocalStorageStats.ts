import { useEffect, useState } from "react";

type Stats = {
  totalQuestions: number;
  bestTime: string;
  dsaTopics: { [topic: string]: number };
  progress: { date: string; solved: number }[];
};

export default function useLocalStorageStats(): Stats {
  const [stats, setStats] = useState<Stats>({
    totalQuestions: 0,
    bestTime: "00:00",
    dsaTopics: {},
    progress: [],
  });

  useEffect(() => {
    try {
      const totalQuestions = parseInt(localStorage.getItem("totalQuestions") || "0", 10);
      const bestTime = localStorage.getItem("bestTime") || "00:00";

      const dsaTopicsRaw = localStorage.getItem("dsaTopics");
      const dsaTopics = dsaTopicsRaw ? JSON.parse(dsaTopicsRaw) : {};

      const progressRaw = localStorage.getItem("progress");
      const progress = progressRaw ? JSON.parse(progressRaw) : [];

      setStats({
        totalQuestions,
        bestTime,
        dsaTopics,
        progress,
      });
    } catch (err) {
      console.error("Error reading from localStorage:", err);
    }
  }, []);

  return stats;
}
