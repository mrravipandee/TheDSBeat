"use client";

import useProgressData from "@/hooks/useProgressData";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ProgressPage() {
  const data = useProgressData();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-purple-700">📈 Progress Tracker</h1>

      {data.length === 0 ? (
        <p className="text-gray-500">No progress data available yet.</p>
      ) : (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Questions Solved Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="solved" stroke="#7e22ce" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
