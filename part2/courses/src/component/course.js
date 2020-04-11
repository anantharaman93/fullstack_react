import React from "react";

const Total = ({ parts }) => {
  const count = parts.map((c) => c.exercises).reduce((a, b) => a + b, 0);
  return (
    <div>
      <b>Total of {count} exercises</b>
    </div>
  );
};

const Course = ({ parts }) => {
  return parts.map((c) => (
    <p key={c.id}>
      {c.name} {c.exercises}
    </p>
  ));
};

const CourseDetail = ({ course }) => {
  return (
    <>
      <h2>Half Stack Application Development</h2>
      <Course parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default CourseDetail;
