import React from "react";
import ReactDOM from "react-dom";

const Course = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Part = (props) => {
  const { name, exercises } = props;
  return (
    <>
      {name} {exercises}
    </>
  );
};

const Content = (props) => {
  return props.parts.map((part) => (
    // Here, key should be provided to uniquely identify elements
    // https://reactjs.org/docs/lists-and-keys.html#keys-must-only-be-unique-among-siblings
    <p key={part.name}>
      <Part name={part.name} exercises={part.exercises} />
    </p>
  ));
};

const Total = (props) => {
  const sum = props.parts.map((e) => e.exercises).reduce((a, b) => a + b, 0);
  return (
    <>
      <p>Number of exercises {sum}</p>
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Course course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
