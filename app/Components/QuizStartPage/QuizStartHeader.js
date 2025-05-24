// app/components/QuizStartPage/QuizStartHeader.js
'use client';

import React from 'react';
import { useGlobalContextProvider } from '@/app/context/ContextApi';

function QuizStartHeader({ timer }) {
  const { quizToStartObject } = useGlobalContextProvider();
  const { selectQuizToStart } = quizToStartObject;

  return (
    <div className="w-9/12 flex justify-between items-center mb-5">
      <div className="flex items-center gap-3">
        <div className="bg-green-700 text-white rounded-full p-3">
          {selectQuizToStart?.icon || '📝'}
        </div>
        <div>
          <h1 className="text-xl font-bold">{selectQuizToStart?.quizTitle || 'Quiz'}</h1>
          <p className="text-sm text-gray-600">
            {selectQuizToStart?.quizQuestions?.length || 0} Questions
          </p>
        </div>
      </div>
      <div className="bg-gray-200 rounded-full px-4 py-2">
        <span className="text-lg font-semibold">Time Left: {timer}s</span>
      </div>
    </div>
  );
}

export default QuizStartHeader;