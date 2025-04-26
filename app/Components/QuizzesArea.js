// 'use client';
// import React from 'react';
// import QuizCard from './QuizCard';
// import PlaceHolder from './PlaceHolder';
// import useGlobalContextProvider from '../ContextApi';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import DropDown from './DropDown';

// function QuizzesArea({ props }) {
//   const { allQuizzes, userObject, isLoadingObject } =
//     useGlobalContextProvider();
//   const router = useRouter();
//   const { user, setUser } = userObject;
//   const { isLoading } = isLoadingObject;
//   console.log(isLoading);
//   return (
//     <div className="poppins mx-12 mt-10">
//       <div>
//         {isLoading ? (
//           <div></div>
//         ) : user.isLogged ? (
//           <>
//             {allQuizzes.length === 0 ? (
//               <PlaceHolder />
//             ) : (
//               <div>
//                 <DropDown />
//                 <h2 className="text-xl font-bold">My Quizzes</h2>
//                 <div className="mt-6 flex gap-2 flex-wrap">
//                   <div className="flex gap-2 flex-wrap">
//                     {allQuizzes.map((singleQuiz, quizIndex) => (
//                       <div key={quizIndex}>
//                         <QuizCard singleQuiz={singleQuiz} />
//                       </div>
//                     ))}
//                   </div>
//                   <div
//                     onClick={() => router.push('/quiz-build')}
//                     className=" cursor-pointer justify-center items-center rounded-[10px]
//                    w-[230px] flex flex-col gap-2 border border-gray-100 bg-white p-4"
//                   >
//                     <Image
//                       src={'/add-quiz.png'}
//                       width={160}
//                       height={160}
//                       alt=""
//                     />
//                     <span className="select-none opacity-40">
//                       Add a new Quiz
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="  h-96 flex flex-col gap-4 justify-center items-center">
//             <h2 className="font-bold text-5xl">
//               Learn 10x <span className="text-green-700">Faster!</span>
//             </h2>
//             <span className="text-xl font-light">
//               Unlock Your Potential with Personalized Quizzes
//             </span>
//             <button
//               onClick={() => {
//                 setUser((prevUser) => ({ ...prevUser, isLogged: true }));
//               }}
//               className="p-4 bg-green-700 text-white rounded-md"
//             >
//               Get Started Now!
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default QuizzesArea;



'use client';
import React from 'react';
import QuizCard from './QuizCard';
import PlaceHolder from './PlaceHolder';
import useGlobalContextProvider from '../ContextApi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DropDown from './DropDown';

function QuizzesArea() {
  const { allQuizzes, userObject, isLoadingObject } = useGlobalContextProvider();
  const router = useRouter();
  const { user } = userObject;
  const { isLoading } = isLoadingObject;

  return (
    <div className="poppins mx-4 sm:mx-12 mt-8">
      {isLoading ? (
        <div>Loading...</div>
      ) : user.isLogged ? (
        <>
          {allQuizzes.length === 0 ? (
            <PlaceHolder />
          ) : (
            <div>
              <DropDown />
              <h2 className="text-xl font-bold">My Quizzes</h2>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allQuizzes.map((singleQuiz, quizIndex) => (
                  <QuizCard key={quizIndex} singleQuiz={singleQuiz} />
                ))}
                <div
                  onClick={() => router.push('/quiz-build')}
                  className="flex flex-col items-center justify-center border rounded-md cursor-pointer p-4"
                >
                  <Image
                    src="/add-quiz.png"
                    width={160}
                    height={160}
                    alt="Add Quiz"
                  />
                  <span>Add a new Quiz</span>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold">
            Learn 10x <span className="text-green-700">Faster!</span>
          </h2>
          <p className="text-lg mt-2">Unlock Your Potential with Personalized Quizzes</p>
          <button
            onClick={() => router.push('/login')}
            className="mt-4 px-6 py-2 bg-green-700 text-white rounded-lg"
          >
            Get Started Now!
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizzesArea;
