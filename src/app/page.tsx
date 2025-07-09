"use client";

import useLocalStorageStats from "@/hooks/useLocalStorageStats";
import { useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const { totalQuestions, bestTime, dsaTopics, progress } = useLocalStorageStats();

  useEffect(() => {
    const updateStats = () => {
      try {
        const totalQuestions = parseInt(localStorage.getItem("totalQuestions") || "0", 10);
        const bestTime = localStorage.getItem("bestTime") || "00:00";
        const dsaTopics = JSON.parse(localStorage.getItem("dsaTopics") || "{}");
        const progress = JSON.parse(localStorage.getItem("progress") || "[]");

        setStats({ totalQuestions, bestTime, dsaTopics, progress });
      } catch (err) {
        console.error("Error parsing localStorage data:", err);
      }
    };

    window.addEventListener("storage", updateStats);
    return () => window.removeEventListener("storage", updateStats);
  }, []);


  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">📊 DSA Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Total Questions Solved</p>
          <h2 className="text-3xl font-bold text-purple-600">{totalQuestions}</h2>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Best Time Record</p>
          <h2 className="text-3xl font-bold text-purple-600">{bestTime}</h2>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Topics Covered</p>
          <h2 className="text-3xl font-bold text-purple-600">{Object.keys(dsaTopics).length}</h2>
        </div>
      </div>

      {/* DSA Topic Distribution */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">📚 DSA Topics Breakdown</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {Object.entries(dsaTopics).map(([topic, count]) => (
            <li
              key={topic}
              className="bg-purple-100 text-purple-700 p-2 rounded text-center font-medium"
            >
              {topic}: {count}
            </li>
          ))}
        </ul>
      </div>

      {/* Progress Chart */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">📈 Progress Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progress}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="solved" stroke="#7e22ce" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
function setStats(arg0: { totalQuestions: number; bestTime: string; dsaTopics: any; progress: any; }) {
  throw new Error("Function not implemented.");
}

