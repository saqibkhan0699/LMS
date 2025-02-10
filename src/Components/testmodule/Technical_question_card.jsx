import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import "./technical_question_test.css";

const Technical_question_card = () => {
  const [preparationLevel, setpreparationLevel] = useState("");
  const [language, setLanguage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timer, setTimer] = useState(0);

  const dummyQuestions = [
    {
      preparationLevel: "beginner",
      language: "javascript",
      question: "What is JavaScript?",
    },
    {
      preparationLevel: "beginner",
      language: "javascript",
      question: "How do you declare a variable in JavaScript?",
    },
    {
      preparationLevel: "beginner",
      language: "javascript",
      question:
        "How do you write a simple Hello, World! program in JavaScript?",
    },
    {
      preparationLevel: "beginner",
      language: "javascript",
      question: "What are the different data types supported by JavaScript?",
    },
    {
      preparationLevel: "beginner",
      language: "javascript",
      question:
        "Explain the difference between let, var, and const in JavaScript.",
    },
    {
      preparationLevel: "intermediate",
      language: "javascript",
      question:
        "Explain the concept of closures in JavaScript and provide an example.",
    },
    {
      preparationLevel: "intermediate",
      language: "javascript",
      question:
        "What are the differences between synchronous and asynchronous programming in JavaScript? Provide examples of each.",
    },
    {
      preparationLevel: "intermediate",
      language: "javascript",
      question:
        "Describe what event delegation is in JavaScript and provide a use case.",
    },
    {
      preparationLevel: "intermediate",
      language: "javascript",
      question:
        "How does prototypal inheritance work in JavaScript? Provide an example.",
    },
    {
      preparationLevel: "intermediate",
      language: "javascript",
      question:
        "Explain the purpose and usage of the map, filter, and reduce functions in JavaScript, with examples for each.",
    },
    {
      preparationLevel: "advanced",
      language: "javascript",
      question:
        "Discuss the differences between function declarations, function expressions, and arrow functions in JavaScript. Provide examples and explain when each should be used.",
    },
    {
      preparationLevel: "advanced",
      language: "javascript",
      question:
        "Explain the concept of Promises and how they are used to handle asynchronous operations in JavaScript. Provide examples of Promise chaining and error handling.",
    },
    {
      preparationLevel: "advanced",
      language: "javascript",
      question:
        "Describe what generators and iterators are in JavaScript and how they can be used to manage asynchronous flows or create custom iteration patterns. Provide examples.",
    },
    {
      preparationLevel: "advanced",
      language: "javascript",
      question:
        "Discuss the various methods for asynchronous programming in JavaScript and compare their advantages and disadvantages.",
    },
    {
      preparationLevel: "advanced",
      language: "javascript",
      question:
        "Explain the concept of hoisting in JavaScript and how it affects variable and function declarations. Provide examples to illustrate your explanation.",
    },
    {
      preparationLevel: "beginner",
      language: "python",
      question: "What is Python?",
    },
    {
      preparationLevel: "beginner",
      language: "python",
      question: "How do you declare a variable in Python?",
    },
    {
      preparationLevel: "beginner",
      language: "python",
      question: "How do you write a simple 'Hello, World!' program in Python?",
    },
    {
      preparationLevel: "beginner",
      language: "python",
      question: "What are the different data types supported by Python?",
    },
    {
      preparationLevel: "beginner",
      language: "python",
      question:
        "Explain the difference between global and local variables in Python.",
    },
    {
      preparationLevel: "intermediate",
      language: "python",
      question:
        "Explain the concept of list comprehensions in Python and provide an example.",
    },
    {
      preparationLevel: "intermediate",
      language: "python",
      question: "What are the differences between tuples and lists in Python?",
    },
    {
      preparationLevel: "intermediate",
      language: "python",
      question:
        "Describe how exception handling works in Python, and provide an example.",
    },
    {
      preparationLevel: "intermediate",
      language: "python",
      question:
        "Explain the concept of dictionary in Python and provide an example of its usage.",
    },
    {
      preparationLevel: "intermediate",
      language: "python",
      question: "How does inheritance work in Python? Provide an example.",
    },
    {
      preparationLevel: "advanced",
      language: "python",
      question:
        "Discuss the differences between Python's built-in data structures: lists, tuples, sets, and dictionaries. Provide examples of when each should be used.",
    },
    {
      preparationLevel: "advanced",
      language: "python",
      question:
        "Explain the concept of decorators in Python and provide an example of how they can be used.",
    },
    {
      preparationLevel: "advanced",
      language: "python",
      question:
        "Describe how generators work in Python and provide an example.",
    },
    {
      preparationLevel: "advanced",
      language: "python",
      question: "Discuss the differences between Python 2 and Python 3.",
    },
    {
      preparationLevel: "advanced",
      language: "python",
      question:
        "Explain the purpose and usage of the map, filter, and reduce functions in Python, with examples for each.",
    },
    {
      preparationLevel: "beginner",
      language: "compiler",
      question: "What is a compiler and what is its role in programming?",
    },
    {
      preparationLevel: "beginner",
      language: "compiler",
      question: "Explain the difference between a compiler and an interpreter.",
    },
    {
      preparationLevel: "beginner",
      language: "compiler",
      question: "How does lexical analysis work in a compiler?",
    },
    {
      preparationLevel: "beginner",
      language: "compiler",
      question:
        "What is syntax analysis (parsing) in the context of compilation?",
    },
    {
      preparationLevel: "beginner",
      language: "compiler",
      question: "Explain the concept of semantic analysis in compilation.",
    },
    {
      preparationLevel: "intermediate",
      language: "compiler",
      question: "Describe the different phases of a compiler and their roles.",
    },
    {
      preparationLevel: "intermediate",
      language: "compiler",
      question:
        "What is intermediate code generation, and why is it important?",
    },
    {
      preparationLevel: "intermediate",
      language: "compiler",
      question:
        "Discuss the optimization phase in compilation and its significance.",
    },
    {
      preparationLevel: "intermediate",
      language: "compiler",
      question: "Explain the concept of symbol tables in compiler design.",
    },
    {
      preparationLevel: "intermediate",
      language: "compiler",
      question: "Describe the role of a parser in the compilation process.",
    },
    {
      preparationLevel: "advanced",
      language: "compiler",
      question:
        "Discuss various optimization techniques used in modern compilers.",
    },
    {
      preparationLevel: "advanced",
      language: "compiler",
      question: "Explain the concept of code generation in detail.",
    },
    {
      preparationLevel: "advanced",
      language: "compiler",
      question:
        "Describe the challenges and approaches in implementing a Just-In-Time (JIT) compiler.",
    },
    {
      preparationLevel: "advanced",
      language: "compiler",
      question:
        "Discuss the differences between static and dynamic linking in the context of compilation.",
    },
    {
      preparationLevel: "advanced",
      language: "compiler",
      question:
        "Explain how error handling and reporting are managed in compilers.",
    },
    {
      preparationLevel: "beginner",
      language: "cpp",
      question: "What is C++ and how does it differ from C?",
    },
    {
      preparationLevel: "beginner",
      language: "cpp",
      question: "How do you declare a variable in C++?",
    },
    {
      preparationLevel: "beginner",
      language: "cpp",
      question: "How do you write a simple 'Hello, World!' program in C++?",
    },
    {
      preparationLevel: "beginner",
      language: "cpp",
      question: "Explain the difference between cout and printf in C++.",
    },
    {
      preparationLevel: "beginner",
      language: "cpp",
      question: "What are the different data types supported by C++?",
    },
    {
      preparationLevel: "intermediate",
      language: "cpp",
      question:
        "Describe the concept of pointers in C++ and provide examples of their usage.",
    },
    {
      preparationLevel: "intermediate",
      language: "cpp",
      question:
        "Explain the difference between pass by value and pass by reference in C++.",
    },
    {
      preparationLevel: "intermediate",
      language: "cpp",
      question:
        "What is object-oriented programming (OOP) and how is it implemented in C++?",
    },
    {
      preparationLevel: "intermediate",
      language: "cpp",
      question:
        "Describe the differences between classes and structures in C++.",
    },
    {
      preparationLevel: "intermediate",
      language: "cpp",
      question: "How does exception handling work in C++? Provide examples.",
    },
    {
      preparationLevel: "advanced",
      language: "cpp",
      question:
        "Discuss the concept of templates in C++ and provide examples of their usage.",
    },
    {
      preparationLevel: "advanced",
      language: "cpp",
      question:
        "Explain the difference between function overloading and function overriding in C++.",
    },
    {
      preparationLevel: "advanced",
      language: "cpp",
      question:
        "What are smart pointers in C++? How do they differ from raw pointers?",
    },
    {
      preparationLevel: "advanced",
      language: "cpp",
      question:
        "Describe the concept of operator overloading in C++ and provide examples.",
    },
    {
      preparationLevel: "advanced",
      language: "cpp",
      question:
        "Explain the principles of RAII (Resource Acquisition Is Initialization) and its importance in C++.",
    },
  ];

  useEffect(() => {
    console.log("Timer effect triggered");
    let interval;
    if (questions.length > 0 && !submitted && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [questions, submitted, timer]);

  const handlepreparationLevelChange = (event) => {
    setpreparationLevel(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const resetDropdown = (dropdownType) => {
    if (dropdownType === preparationLevel) {
      setpreparationLevel("");
    } else if (dropdownType === language) {
      setLanguage("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!preparationLevel || !language) {
      setErrorMessage("Please fill both fields.");
      setQuestions([]);
    } else {
      console.log("Selected Level:", preparationLevel);
      console.log("Selected Language:", language);

      const filteredQuestions = dummyQuestions.filter(
        (question) =>
          question.preparationLevel === preparationLevel &&
          question.language === language
      );

      console.log("Filtered Questions:", filteredQuestions);

      setQuestions(filteredQuestions);
      setErrorMessage("");
      setSubmitted(false); // Reset submitted state
      setTimer(300); // Reset timer to 300 seconds (5 minutes)
    }
  };

  const handleAnswerChange = (event, index) => {
    const { value } = event.target;
    setAnswers({ ...answers, [index]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const allAnswersFilled = Object.keys(answers).length === questions.length;
    if (allAnswersFilled) {
      setSubmitted(true);
      setErrorMessage(""); // Reset error message
    } else {
      setErrorMessage("Please fill all answers.");
    }
  };

  return (
    <div className="technical-questions-container">
      <h1 style={{ marginTop: "5px" }}>Technical Test</h1>
      <form style={{ marginTop: "-20px" }} onSubmit={handleSubmit}>
        <div className="dropdown-container">
          <select
            className={`dropdown ${preparationLevel ? "selected" : ""}`}
            value={preparationLevel}
            onChange={handlepreparationLevelChange}
          >
            <option value="" disabled hidden>
              Select Level
            </option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          {preparationLevel && (
            <FaTimes
              className="cross-icon"
              onClick={() => resetDropdown(preparationLevel)}
            />
          )}
        </div>

        <div className="dropdown-container">
          <select
            className={`dropdown ${language ? "selected" : ""}`}
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="" disabled hidden>
              Select Language
            </option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="compiler">Compiler</option>
            <option value="cpp">C++</option>
          </select>
          {language && (
            <FaTimes
              className="cross-icon"
              onClick={() => resetDropdown(language)}
            />
          )}
        </div>

        <button type="submit" className="submit-button">
          Find Questions
        </button>
      </form>
      <div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div>
        {questions.length > 0 &&
          (submitted ? (
            <div className="answer-container">
              <h2>Result</h2>
              <p>Correct Answers: 3</p>
              <p>Incorrect Answers: 2</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => e.preventDefault()}
              className={`form-container ${
                questions.length > 0 ? "has-questions" : ""
              }`}
            >
              <div className="questions-container">
                {questions.length > 0 && (
                  <h2 style={{ marginTop: "-30px" }}>Questions</h2>
                )}
                <strong>
                  <p>
                    Timer:{" "}
                    {Math.floor(timer / 60)
                      .toString()
                      .padStart(2, "0")}
                    :{(timer % 60).toString().padStart(2, "0")}
                  </p>
                </strong>

                {questions.map((question, index) => (
                  <div key={index} className="question">
                    <p style={{ marginTop: "-10px" }}>{question.question}</p>
                    <input
                      type="text"
                      placeholder="Your Answer"
                      value={answers[index] || ""}
                      onChange={(e) => handleAnswerChange(e, index)}
                    />
                  </div>
                ))}
                {questions.length > 0 && (
                  <button
                    type="submit"
                    className="submit-button"
                    onClick={handleFormSubmit}
                  >
                    Submit
                  </button>
                )}
              </div>
              <div></div>
            </form>
          ))}
        <Link to="/Option_card" className="back-button">
          <FaArrowLeft />
        </Link>
      </div>
    </div>
  );
};

export default Technical_question_card;
