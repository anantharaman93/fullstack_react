import React from "react";
import ReactDOM from "react-dom";

// Try 1
// const App = () => (
//   <div>
//     <p>Hello world</p>
//   </div>
// );

// Try 2
// const App = () => {
//   console.log("Hello from component");

//   const now = new Date();
//   const a = 10;
//   const b = 20;

//   return (
//     <div>
//       <p>Hello world, it is {now.toUTCString()} </p>
//       <p>
//         {a} plus {b} is {a + b}
//       </p>
//     </div>
//   );
// };

// Try 3
const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  );
};

const App = () => {
  const name = "Peter";
  const age = 10;

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Anantharaman" age={26 + 10} />
      <Hello name={name} age={age} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
