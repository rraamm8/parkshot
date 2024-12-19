import React, { useState, useEffect } from 'react';

function Score() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.125.121.226:8080/golfcourses');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-4xl px-4">
      <h1 className="text-xl font-bold mb-4">Golf Courses</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul className="list-disc pl-5">
        {courses.map((course, index) => (
          <li key={index}>
            <strong>Name:</strong> {course.name} <br />
            <strong>Location:</strong> {course.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Score;
