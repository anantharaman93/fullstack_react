import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClickFunc, text }) => (
  <button onClick={onClickFunc}>{text}</button>
);

const Display = ({ count, text }) => (
  <tr>
    <td>{text}</td>
    <td>{count}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  if (total === 0) {
    return <div>Nothing to display</div>;
  }

  const avg = total / 3;
  const positive = good / total;

  return (
    <>
      <h3>statistics</h3>
      <table>
        <tbody>
          <Display count={good} text="Good" />
          <Display count={neutral} text="Neutral" />
          <Display count={bad} text="Bad" />

          <Display count={avg} text="Average" />
          <Display count={positive} text="Positive" />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Button onClickFunc={() => setGood(good + 1)} text="Good" />
      <Button onClickFunc={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClickFunc={() => setBad(bad + 1)} text="Bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
