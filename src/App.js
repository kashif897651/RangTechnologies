import React, { useState, useEffect } from "react";

const questions = [
  { id: 1, text: "Do you like coding?" },
  { id: 2, text: "Is TypeScript your favorite language?" },
  { id: 3, text: "Do you enjoy solving problems?" },
  { id: 4, text: "Have you used React before?" },
];

const App = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [averageScore, setAverageScore] = useState(null);
  const [totalRuns, setTotalRuns] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem("scores") || "[]");
    if (savedScores.length > 0) {
      const total = savedScores.reduce((sum, score) => sum + score, 0);
      setTotalRuns(savedScores.length);
      setAverageScore(total / savedScores.length);
    }
  }, []);

  const handleAnswer = (id, answer) => {
    setAnswers((prev) => ({ ...prev, [id]: answer }));
    if (questionIndex < questions.length - 1)
      setQuestionIndex(questionIndex + 1);
  };

  const calculateScore = () => {
    const yesAnswers = Object.values(answers).filter((answer) => answer).length;
    const totalQuestions = questions.length;
    const calculatedScore = (100 * yesAnswers) / totalQuestions;
    setScore(calculatedScore);

    // Save score to localStorage
    const savedScores = JSON.parse(localStorage.getItem("scores") || "[]");
    savedScores.push(calculatedScore);
    localStorage.setItem("scores", JSON.stringify(savedScores));

    // Update average score
    const total = savedScores.reduce((sum, score) => sum + score, 0);
    setTotalRuns(savedScores.length);
    setAverageScore(total / savedScores.length);
  };

  return (
    <>
      <h1 className="heading">Questionnaire</h1>
      <div className="wraper">
        <div>
          <p className="question">
            <span>{questions[questionIndex]["id"]}.&nbsp;</span>
            <span>{questions[questionIndex]["text"]}</span>
          </p>
          <button
            className="btn btn_ok"
            onClick={() => handleAnswer(questions[questionIndex]["id"], true)}
          >
            Yes
          </button>
          <button
            className="btn btn_error"
            onClick={() => handleAnswer(questions[questionIndex]["id"], false)}
          >
            No
          </button>
          {questionIndex === questions.length - 1 && (
            <button className="btn submit-btn" onClick={calculateScore}>
              Submit
            </button>
          )}
        </div>
        <div>
          {score !== null && (
            <div>
              <h2>Your Score: {score.toFixed(2)}</h2>
            </div>
          )}

          {averageScore !== null && (
            <div>
              <h2>Average Score: {averageScore.toFixed(2)}</h2>
              <p>Total Runs: {totalRuns}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
