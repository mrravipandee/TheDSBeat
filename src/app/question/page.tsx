"use client";

import { useState, useEffect } from "react";
import { DSA_TOPICS } from "@/constants/dsaTopics"; // Array of topics
import { Question } from "@/types"; // { title, description, code, createdAt }

export default function QuestionPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", code: "" });
  const [questions, setQuestions] = useState<Question[]>([]);

  // Load questions for selected topic
  useEffect(() => {
    if (selectedTopic) {
      const data = localStorage.getItem(`questions-${selectedTopic}`);
      setQuestions(data ? JSON.parse(data) : []);
    }
  }, [selectedTopic]);

  const handleAdd = () => {
    if (!selectedTopic) return;

    const newQuestion: Question = {
      ...formData,
      createdAt: new Date().toLocaleString(),
    };

    const updated = [newQuestion, ...questions];
    setQuestions(updated);
    localStorage.setItem(`questions-${selectedTopic}`, JSON.stringify(updated));

    // 🔄 Update totalQuestions
    const total = parseInt(localStorage.getItem("totalQuestions") || "0", 10);
    localStorage.setItem("totalQuestions", (total + 1).toString());

    // 🔄 Update dsaTopics count
    const dsaStats = JSON.parse(localStorage.getItem("dsaTopics") || "{}");
    dsaStats[selectedTopic] = (dsaStats[selectedTopic] || 0) + 1;
    localStorage.setItem("dsaTopics", JSON.stringify(dsaStats));

    // 🔄 Update progress (date-wise)
    const today = new Date().toISOString().split("T")[0];
    const progress = JSON.parse(localStorage.getItem("progress") || "[]");
    const todayEntry = progress.find((p: any) => p.date === today);
    if (todayEntry) {
      todayEntry.solved += 1;
    } else {
      progress.push({ date: today, solved: 1 });
    }
    localStorage.setItem("progress", JSON.stringify(progress));

    // Reset form
    setFormData({ title: "", description: "", code: "" });
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-purple-700">🧠 DSA Questions</h1>

      {/* Topics */}
      <div className="flex flex-wrap gap-3 mb-6">
        {DSA_TOPICS.map((topic) => (
          <button
            key={topic}
            onClick={() => {
              setSelectedTopic(topic);
              setShowForm(false);
            }}
            className={`px-4 py-2 rounded-full border ${
              selectedTopic === topic ? "bg-purple-600 text-white" : "bg-white"
            } hover:bg-purple-100`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Add Form */}
      {selectedTopic && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-purple-600">{selectedTopic}</h2>
            <button
              onClick={() => setShowForm((prev) => !prev)}
              className="text-sm text-blue-600 underline"
            >
              {showForm ? "Cancel" : "Add Question"}
            </button>
          </div>

          {showForm && (
            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="p-2 border rounded"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="p-2 border rounded"
              />
              <textarea
                placeholder="Code (optional)"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="p-2 border rounded font-mono text-sm"
              />
              <button
                onClick={handleAdd}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Add
              </button>
            </div>
          )}
        </div>
      )}

      {/* Questions */}
      {questions.length > 0 && (
        <div className="space-y-4">
          {questions.map((q, idx) => (
            <ExpandableCard key={idx} question={q} />
          ))}
        </div>
      )}
    </div>
  );
}

// 👇 Expandable Card
function ExpandableCard({ question }: { question: Question }) {
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded shadow p-4">
      <div
        className="cursor-pointer font-semibold text-lg text-purple-700 flex justify-between"
        onClick={() => setOpen(!open)}
      >
        {question.title}
        <span className="text-sm text-gray-500">{question.createdAt}</span>
      </div>
      {open && (
        <div className="mt-2">
          <button
            className="text-blue-600 text-sm underline mb-2"
            onClick={() => setShowDetails((prev) => !prev)}
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
          {showDetails && (
            <div>
              <p className="text-gray-700 whitespace-pre-line mb-2">{question.description}</p>
              {question.code && (
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                  <code>{question.code}</code>
                </pre>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
