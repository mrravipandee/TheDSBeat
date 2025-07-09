"use client";

import { useState } from "react";
import useSolvedQuestions from "@/hooks/useSolvedQuestions";
import useTestHistory from "@/hooks/useTestHistory";

export default function TestPage() {
  const questions = useSolvedQuestions();
  const { saveResult } = useTestHistory();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [startTime] = useState(Date.now());

  const handleNext = () => {
    if (userCode.trim()) setScore(score + 1);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserCode("");
    } else {
      const endTime = Date.now();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(1);
      saveResult({
        score,
        timeTaken: `${timeTaken} sec`,
        date: new Date().toLocaleString(),
      });
      setFinished(true);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl text-gray-600">No solved questions found.</h2>
        <p className="text-sm text-gray-500">Please solve some questions first on the Question page.</p>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-2">✅ Test Completed!</h2>
        <p className="text-lg text-gray-700">Score: {score} / {questions.length}</p>
        <button
          onClick={() => {
            setCurrentIndex(0);
            setUserCode("");
            setScore(0);
            setFinished(false);
          }}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Retry Test
        </button>
      </div>
    );
  }

  const current = questions[currentIndex];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-purple-700">🧪 DSA Test</h1>

      <div className="bg-white p-4 rounded shadow space-y-4">
        <div>
          <h2 className="text-lg font-semibold">{current.title}</h2>
          <p className="text-gray-700">{current.description}</p>
          <p className="text-sm text-gray-500 italic mt-1">Topic: {current.topic}</p>
        </div>

        <textarea
          rows={6}
          placeholder="Write your code here..."
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          className="w-full border p-2 rounded font-mono"
        />

        <div className="flex justify-between">
          <p className="text-sm text-gray-500">
            Question {currentIndex + 1} of {questions.length}
          </p>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            {currentIndex === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
