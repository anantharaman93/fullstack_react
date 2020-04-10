import React, { useState } from "react";
import ReactDOM from "react-dom";

// const Hello = ({ name, age }) => {
//   const bornYear = () => new Date().getFullYear() - age;

//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   );
// };

// const App = () => {
//   const name = "Peter";
//   const age = 10;

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name={name} age={age} />
//     </div>
//   );
// };

// ReactDOM.render(<App />, document.getElementById("root"));

// Try 2 - Re-rendering
// const App = (props) => {
//   const { counter } = props;
//   return <div>{counter}</div>;
// };

// let counter = 1;

// const refresh = () => {
//   ReactDOM.render(<App counter={counter} />, document.getElementById("root"));
// };

// setInterval(() => {
//   refresh();
//   counter += 1;
// }, 1000);

// Try 3 - State-full re-rendering
// const App = (props) => {
//   const [counter, setCounter] = useState(0);

//   setTimeout(() => setCounter(counter + 1), 1000);

//   //console.log("Rendering ... ", counter);

//   return <div>{counter}</div>;
// };

// ReactDOM.render(<App />, document.getElementById("root"));

// Try 4 - OnClick - Rendering
// const App = (props) => {
//   const [counter, setCounter] = useState(0);

//   const increaseByOne = () => setCounter(counter + 1);

//   const setToZero = () => setCounter(0);

//   return (
//     <div>
//       <div>{counter}</div>
//       <button onClick={increaseByOne}>plus</button>
//       <button onClick={setToZero}>zero</button>
//     </div>
//   );
// };

// Try 5 - Further enhancement
const Display = ({ counter }) => {
  return <div>{counter}</div>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = (props) => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);

  return (
    <div>
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={setToZero} text="zero" />
      <Button handleClick={decreaseByOne} text="minus" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
