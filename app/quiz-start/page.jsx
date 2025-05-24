// app/quiz-start/page.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { useGlobalContextProvider } from '@/app/context/ContextApi';
import QuizStartHeader from '../Components/QuizStartPage/QuizStartHeader';
import QuizStartQuestions from '../Components/QuizStartPage/QuizStartQuestions';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function Page() {
  const { quizToStartObject, userObject } = useGlobalContextProvider();
  const { user, setUser } = userObject;
  const { selectQuizToStart } = quizToStartObject;

  const [quizStarted, setQuizStarted] = useState(false);
  const [violationCount, setViolationCount] = useState(0);
  const [warningMessage, setWarningMessage] = useState(null);
  const [needsFullscreen, setNeedsFullscreen] = useState(false);
  const [parentTimer, setParentTimer] = useState(30); // Match initial timer in QuizStartQuestions
  const router = useRouter();

  useEffect(() => {
    if (selectQuizToStart === null) {
      router.push('/');
      return;
    }

    let lastViolationTime = 0;

    const showWarning = (msg) => {
      const now = Date.now();
      if (now - lastViolationTime > 3000) {
        setWarningMessage(msg);
        setTimeout(() => setWarningMessage(null), 3000);
        lastViolationTime = now;
        setViolationCount((count) => count + 1);
      }
    };

    const onFullscreenChange = () => {
      if (
        !document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.mozFullScreenElement &&
        !document.msFullscreenElement
      ) {
        setNeedsFullscreen(true);
        showWarning('You exited fullscreen. Click to continue.');
      }
    };

    const blockKeys = (e) => {
      const forbiddenKeys = ['F11', 'F12', 'Escape'];
      if (
        forbiddenKeys.includes(e.key) ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
        (e.ctrlKey && ['U'].includes(e.key))
      ) {
        e.preventDefault();
        showWarning('This key combination is not allowed during the quiz.');
      }
    };

    const preventContextMenu = (e) => e.preventDefault();
    const onBlur = () => showWarning('Stay focused! Don’t switch tabs.');

    if (quizStarted) {
      document.addEventListener('fullscreenchange', onFullscreenChange);
      document.addEventListener('webkitfullscreenchange', onFullscreenChange);
      document.addEventListener('mozfullscreenchange', onFullscreenChange);
      document.addEventListener('msfullscreenchange', onFullscreenChange);
      document.addEventListener('keydown', blockKeys);
      document.addEventListener('contextmenu', preventContextMenu);
      window.addEventListener('blur', onBlur);
    }

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
      document.removeEventListener('mozfullscreenchange', onFullscreenChange);
      document.removeEventListener('msfullscreenchange', onFullscreenChange);
      document.removeEventListener('keydown', blockKeys);
      document.removeEventListener('contextmenu', preventContextMenu);
      window.removeEventListener('blur', onBlur);

      if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      ) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    };
  }, [quizStarted, router, selectQuizToStart]);

  useEffect(() => {
    if (violationCount >= 3) {
      setWarningMessage('Too many violations. Submitting your quiz...');
      setTimeout(() => {
        setQuizStarted(false);
        setViolationCount(0);
        setNeedsFullscreen(false);
        router.push('/');
      }, 2000);
    }
  }, [violationCount, router]);

  const handleStartQuiz = async () => {
    try {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        await element.webkitRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        await element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        await element.msRequestFullscreen();
      }
      setQuizStarted(true);
    } catch (err) {
      console.error('Fullscreen failed:', err);
      alert('Please allow fullscreen to proceed with the quiz.');
    }
  };

  const handleReEnterFullscreen = async () => {
    try {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        await element.webkitRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        await element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        await element.msRequestFullscreen();
      }
      setNeedsFullscreen(false);
    } catch (err) {
      console.error('Failed to re-enter fullscreen:', err);
      alert('Please click allow on the fullscreen prompt.');
    }
  };

  function onUpdateTime(currentTime) {
    setParentTimer(currentTime);
  }

  if (selectQuizToStart === null) {
    return (
      <div className="h-screen flex flex-col gap-2 items-center justify-center">
        <Image src="/errorIcon.png" alt="Error" width={180} height={180} />
        <h2 className="text-xl font-bold">Please select your quiz first...</h2>
        <span className="font-light">You will be redirected to the home page</span>
      </div>
    );
  }

  return (
    <div className="relative poppins flex flex-col px-4 sm:px-24 mt-8">
      {warningMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
          {warningMessage}
        </div>
      )}

      {needsFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col items-center justify-center text-white">
          <h2 className="text-xl font-bold mb-4">Fullscreen Required</h2>
          <p className="mb-4">You exited fullscreen. Click to continue your quiz.</p>
          <button
            className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            onClick={handleReEnterFullscreen}
          >
            Re-enter Fullscreen
          </button>
        </div>
      )}

      {!quizStarted ? (
        <div className="h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Ready to Begin Your Quiz?</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Click the button below to start in fullscreen mode.
          </p>
          <p className="text-red-700 font-bold underline text-sm sm:text-base">
            Note: After 3 warnings, the quiz will submit automatically!
          </p>
          <button
            onClick={handleStartQuiz}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <>
          <QuizStartHeader timer={parentTimer} />
          <div className="mt-10 flex items-center justify-center">
            <QuizStartQuestions onUpdateTime={onUpdateTime} />
          </div>
        </>
      )}
    </div>
  );
}

export default Page;