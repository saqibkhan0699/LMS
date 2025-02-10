import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Loader from './Components/Loader/Loader';
import axios from 'axios'; // Import Axios for making HTTP requests

// Import your other components
import Login from './Components/Login/login';
import Signup from './Components/Signup/signup';
import Home from './Components/Home/home';
import Profile from './Components/Profile/profile';
import FrontScreen from './Components/HomePage/frontscreen';
import Navbar from './Components/navbar/navbar';
import Option_card from './Components/testmodule/Option_card';
import JobRecommendation from './Components/jobRecommendation/jobRecommendation';
import Compiler from './Components/Compiler/Compiler';
import NotesComponent from './Components/LearningNotes/notes';
import ForgotPassword from './Components/ForgotPassword/forgotPassword';
import ResetPassword from './Components/ForgotPassword/resetPassword';
import CodeCompiler from './Components/Compiler/Compiler';
import Quiz from './Components/testmodule/Verbal_question_test'
function NavbarWrapper() {
  const location = useLocation();
  const hideNavbarPaths = ['/', '/signup'];

  const isNavbarVisible = !hideNavbarPaths.includes(location.pathname);

  return isNavbarVisible ? <Navbar /> : null;
}

function App() {
  const [isLoading, setIsLoading] = useState(false); // Start with false for initial load
  const [requestCount, setRequestCount] = useState(0); // Track number of active requests

  useEffect(() => {
    // Axios interceptors for requests
    const requestInterceptor = axios.interceptors.request.use((config) => {
      setRequestCount((prevCount) => prevCount + 1);
      setIsLoading(true);
      return config;
    });

    // Axios interceptors for responses
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        setRequestCount((prevCount) => prevCount - 1);
        return response;
      },
      (error) => {
        setRequestCount((prevCount) => prevCount - 1);
        return Promise.reject(error);
      }
    );

    // Clean up interceptors on component unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // Watch for changes in requestCount to toggle isLoading state
  useEffect(() => {
    setIsLoading(requestCount > 0);
  }, [requestCount]);

  return (
    <BrowserRouter>
      <div id="root">
        <NavbarWrapper />
        {isLoading && <Loader />} {/* Show loader when isLoading state is true */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/front" element={<FrontScreen />} />
          <Route path="/Option_card" element={<Option_card />} />
          <Route path="/Compiler" element={<CodeCompiler />} />
          <Route path="/notes" element={<NotesComponent />} />
          <Route path="/jobRecommendation" element={<JobRecommendation />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/quiz-attempt" element={<Quiz />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
