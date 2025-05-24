// app/context/ContextApi.js
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';

const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [selectQuizToStart, setSelectQuizToStart] = useState(null);
  const [user, setUser] = useState(null); // Fixed: Initialize as null
  const [openIconBox, setOpenIconBox] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState({ faIcon: faQuestion });
  const [dropDownToggle, setDropDownToggle] = useState(false);
  const [threeDotsPositions, setThreeDotsPositions] = useState({ x: 0, y: 0 });
  const [isLoading, setLoading] = useState(true);
  const [userXP, setUserXP] = useState(0);

  // Fetch quizzes on mount
  useEffect(() => {
    const fetchAllQuizzes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/quizzes', {
          cache: 'no-cache',
        });

        if (!response.ok) {
          toast.error('Failed to fetch quizzes');
          throw new Error('Fetching quizzes failed');
        }

        const quizzesData = await response.json();
        setAllQuizzes(quizzesData.quizzes);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllQuizzes();
  }, []);

  // Load user from localStorage on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setUserXP(parsedUser.experience || 0);
        } else {
          setUser(null); // Ensure user is null if no stored user
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        setUser(null); // Fallback to null on error
      }
    };
    fetchUser();
  }, []);

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Sync user.experience with userXP
  useEffect(() => {
    if (user) {
      setUser((prevUser) => {
        const updatedUser = { ...prevUser, experience: userXP };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
      });
    }
  }, [userXP]);

  // Update selected icon when selectedQuiz changes
  useEffect(() => {
    if (selectedQuiz) {
      setSelectedIcon({ faIcon: selectedQuiz.icon });
    } else {
      setSelectedIcon({ faIcon: faQuestion });
    }
  }, [selectedQuiz]);

  return (
    <GlobalContext.Provider
      value={{
        allQuizzes,
        setAllQuizzes,
        quizToStartObject: { selectQuizToStart, setSelectQuizToStart },
        userObject: { user, setUser },
        openBoxToggle: { openIconBox, setOpenIconBox },
        selectedIconObject: { selectedIcon, setSelectedIcon },
        dropDownToggleObject: { dropDownToggle, setDropDownToggle },
        threeDotsPositionsObject: { threeDotsPositions, setThreeDotsPositions },
        selectedQuizObject: { selectedQuiz, setSelectedQuiz },
        userXpObject: { userXP, setUserXP },
        isLoadingObject: { isLoading, setLoading },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContextProvider() {
  return useContext(GlobalContext);
}