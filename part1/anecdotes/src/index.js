import React, { useState } from "react";
import ReactDOM from "react-dom";

const Vote = ({ onVote, text }) => (
  <>
    <button onClick={onVote}>{text}</button>
  </>
);

const Stats = ({ votes, anecdotes }) => {
  const max = Math.max(...votes);
  if (max === 0) {
    return <></>;
  } else {
    const index = votes.indexOf(max);
    return (
      <>
        <p>
          anecdotes {anecdotes[index]} has max number of votes of {max}
        </p>
      </>
    );
  }
};

const App = ({ anecdotes }) => {
  const randomInteger = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const [selected, setSelected] = useState(
    randomInteger(0, anecdotes.length - 1)
  );
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const onVoteClick = () => {
    const newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);

    const index = randomInteger(0, anecdotes.length - 1);
    setSelected(index);
  };

  return (
    <>
      <div>{anecdotes[selected]}</div>
      <Vote onVote={onVoteClick} text="Vote" />
      <Stats votes={votes} anecdotes={anecdotes} />
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
