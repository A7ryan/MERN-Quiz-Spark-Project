'use client';
import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import QuizzesArea from './Components/QuizzesArea';
import { useGlobalContextProvider } from './context/ContextApi';

import toast, { Toaster } from 'react-hot-toast';
export default function Home() {
  const { quizToStartObject, selectedQuizObject } = useGlobalContextProvider();
  const { setSelectQuizToStart } = quizToStartObject;
  const { selectedQuiz, setSelectedQuiz } = selectedQuizObject;

  useEffect(() => {
    setSelectQuizToStart(null);
    // set the selectedQuiz back to null
    setSelectedQuiz(null);
  }, []);

  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setOpenMenu(false);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call the function once initially to set initial state

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleModeChange = (event) => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex flex-col md:flex-row w-full bg-white border border-gray-200 h-svh">
      {/* sidebar */}
      {/* <Sidebar /> */}
      <Navbar />
      {/* Dashboard */}
      {/* <Dashboard /> */}
      <QuizzesArea />

      {/* <div>
        <button
          className="px-3 bg-gray-300"
          onClick={() => setIsDarkMode(false)}
        >
          Light
        </button>
        <button
          className="px-3 bg-gray-300"
          onClick={() => setIsDarkMode(true)}
        >
          Dark
        </button>
      </div>
      <div
        className={`bg-white border border-gray-300 shadow-md w-44 h-44 
      ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
      >
        <span>This is a text</span>
        <button className=" text-white p-4">Click me</button>
        <div className="p-4 categories flex gap-2">
          <div className="bg-mainColor p-4 text-white">Icon</div>
          <span>Category 1</span>
        </div>
      </div> */}
    </div>
  );
}

function Sidebar() {
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setOpenMenu(false);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call the function once initially to set initial state

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="bg-red-200 w-full flex flex-row px-5 justify-between md:flex-col md:px-0 md:w-3/12 ">
      {/* Logo */}
      <div className="bg-white p-3 border border-gray-300">Logo</div>
      {/* Menu */}
      <ul
        className={`bg-white ${
          openMenu
            ? 'flex flex-col absolute w-full h-1/2 top-14 left-0'
            : 'hidden'
        } p-3 md:flex md:flex-col gap-2 h-full border border-gray-300`}
      >
        <span>Home</span>
        <span>Blog</span>
        <span>Contact US</span>
      </ul>
      <button
        onClick={() => setOpenMenu((current) => !current)}
        className="md:hidden"
      >
        ...
      </button>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="bg-yellow-300 h-full  md:w-9/12 p-4 flex flex-col gap-3  ">
      <div className="border border-gray-300">
        <span className="font-bold text-2xl">Hi Ali</span>
      </div>
      {/* Projects */}
      <div className="border border-gray-300 flex flex-col gap-2 md:flex-row">
        <div className="text-buttons w-full md:w-1/2">Project 1</div>
        <div className="bg-red-500 w-full md:w-1/2">Project 2</div>
      </div>
    </div>
  );
}
