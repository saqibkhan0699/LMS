import React, { useState, useRef } from "react";
import axios from "axios";
import "./Compiler.css";

const CodeCompiler = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python3");
  const [output, setOutput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false); // State for button execution state

  const languages = [
    { label: "Python", value: "python3" },
    { label: "JavaScript", value: "nodejs" },
    { label: "Java", value: "java" },
    { label: "C#", value: "csharp" },
    { label: "C++", value: "cpp" },
    // Add more languages as needed
  ];

  const textAreaRef = useRef(null); // Create a ref for the textarea
  const lineNumbersRef = useRef(null); // Create a ref for the line numbers

  const handleCompile = async () => {
    setIsExecuting(true); // Set button state to executing

    try {
      const response = await axios.post("https://techlearnapi-caa5ekgrfzffd2ed.canadacentral-01.azurewebsites.net/api/Quizzes", {
        code,
        language,
      });
      const responseData = JSON.parse(response.data.output);
      const { output, error, statusCode } = responseData;
      if (statusCode === 200) {
        setOutput(output);
      } else {
        setOutput(`Error: ${error}`);
      }
    } catch (error) {
      console.error("Error compiling code", error);
      setOutput("Error compiling code");
    } finally {
      setIsExecuting(false);
    }
  };

  // Function to get line numbers
  const getLineNumbers = () => {
    const lines = code.split("\n").length;
    return Array.from({ length: lines }, (_, i) => i + 1).join("\n");
  };

  // Sync scroll between textarea and line numbers
  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = scrollTop;
    }
  };

  return (
    <div className="container-code">
      <div className="left-panel">
        <div className="title">Tech-Learn Code Compiler</div>
        <div className="editor-container">
          <div
            className="line-numbers"
            ref={lineNumbersRef} // Attach the ref to the line numbers
            style={{ height: "300px", overflowY: "auto" }} // Set height and overflow
          >
            <pre>{getLineNumbers()}</pre>
          </div>
          <textarea
            ref={textAreaRef} // Attach the ref to the textarea
            className="textarea"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onScroll={handleScroll} // Attach the scroll event
            placeholder="Write your code here..."
            style={{ height: "300px", overflowY: "auto" }} // Set height and overflow
          ></textarea>
        </div>
        <select
          className="select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languages.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          className={`button ${isExecuting ? "executing" : ""}`}
          onClick={handleCompile}
          disabled={isExecuting}
        >
          {isExecuting ? "Executing..." : "Compile"}
        </button>
      </div>
      <div className="right-panel">
        <div className="title">Output</div>
        <pre className="output">{output}</pre>
      </div>
    </div>
  );
};

export default CodeCompiler;