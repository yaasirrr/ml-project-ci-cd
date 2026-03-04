import React, { useState } from "react";

function PredictionForm() {

  const [formData, setFormData] = useState({
    gender: "",
    ethnicity: "",
    parental_level_of_education: "",
    lunch: "",
    test_preparation_course: "",
    reading_score: "",
    writing_score: ""
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/predictdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    setResult(data.prediction);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Performance Prediction</h2>

      <form onSubmit={handleSubmit}>

        {/* Gender Dropdown */}
        <label>Gender:</label>
        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <br /><br />

        {/* Ethnicity Dropdown */}
        <label>Ethnicity:</label>
        <select name="ethnicity" onChange={handleChange} required>
          <option value="">Select Group</option>
          <option value="group A">Group A</option>
          <option value="group B">Group B</option>
          <option value="group C">Group C</option>
          <option value="group D">Group D</option>
          <option value="group E">Group E</option>
        </select>

        <br /><br />

        {/* Parental Education */}
        <label>Parental Education:</label>
        <select name="parental_level_of_education" onChange={handleChange} required>
          <option value="">Select Education</option>
          <option value="some high school">Some High School</option>
          <option value="high school">High School</option>
          <option value="some college">Some College</option>
          <option value="associate's degree">Associate's Degree</option>
          <option value="bachelor's degree">Bachelor's Degree</option>
          <option value="master's degree">Master's Degree</option>
        </select>

        <br /><br />

        {/* Lunch */}
        <label>Lunch:</label>
        <select name="lunch" onChange={handleChange} required>
          <option value="">Select Lunch Type</option>
          <option value="standard">Standard</option>
          <option value="free/reduced">Free/Reduced</option>
        </select>

        <br /><br />

        {/* Test Preparation */}
        <label>Test Preparation Course:</label>
        <select name="test_preparation_course" onChange={handleChange} required>
          <option value="">Select Option</option>
          <option value="none">None</option>
          <option value="completed">Completed</option>
        </select>

        <br /><br />

        {/* Reading Score */}
        <label>Reading Score:</label>
        <input
          type="number"
          name="reading_score"
          min="0"
          max="100"
          onChange={handleChange}
          required
        />

        <br /><br />

        {/* Writing Score */}
        <label>Writing Score:</label>
        <input
          type="number"
          name="writing_score"
          min="0"
          max="100"
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">Predict</button>
      </form>

      {result !== null && (
        <h3>Predicted Math Score: {result}</h3>
      )}
    </div>
  );
}

export default PredictionForm;