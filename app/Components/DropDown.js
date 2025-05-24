// 'use client';

// import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React, { useEffect, useRef, useState } from 'react';
// import toast from 'react-hot-toast';
// import useGlobalContextProvider from '../ContextApi';
// import { useRouter } from 'next/navigation';

// function DropDown(props) {
//   const {
//     dropDownToggleObject,
//     threeDotsPositionsObject,
//     selectedQuizObject,
//     allQuizzes,
//     setAllQuizzes,
//   } = useGlobalContextProvider();
//   const { dropDownToggle, setDropDownToggle } = dropDownToggleObject;
//   const { threeDotsPositions } = threeDotsPositionsObject;
//   const { selectedQuiz, setSelectedQuiz } = selectedQuizObject;
//   const [isDialogOpened, setIsDialogOpened] = useState(false);
//   const dropDownRef = useRef(null);
//   const router = useRouter();

//   const menuItems = [
//     { name: 'Modify', icon: faPencil },
//     { name: 'Delete', icon: faTrash },
//   ];

//   useEffect(() => {
//     function handleOutiseClick(event) {
//       if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
//         if (!isDialogOpened) {
//           setSelectedQuiz(null);
//         }
//         setDropDownToggle(false);
//       }
//     }
//     document.addEventListener('click', handleOutiseClick);

//     return () => {
//       document.removeEventListener('click', handleOutiseClick);
//     };
//   }, [dropDownToggle]);

//   async function deleteTheQuiz() {
//     const updatedAllQuizzes = allQuizzes.filter((quiz) => {
//       if (quiz._id !== selectedQuiz._id) {
//         return quiz;
//       }
//     });

//     console.log(selectedQuiz._id);

//     const res = await fetch(
//       `http://localhost:3000/api/quizzes?id=${selectedQuiz._id}`,
//       {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       },
//     );

//     if (!res.ok) {
//       toast.error('Error while deleting the quiz');
//       return;
//     }

//     setAllQuizzes(updatedAllQuizzes);
//     toast.success('The Quiz has been deleted successfully.');
//     setIsDialogOpened(false);
//     setSelectedQuiz(null);
//   }

//   function handleClickedItem(menuItem) {
//     if (menuItem.name === 'Modify') {
//       router.push('/quiz-build');
//     }

//     if (menuItem.name === 'Delete') {
//       setIsDialogOpened(true);
//       toast(
//         (t) => (
//           <div className="flex flex-col gap-4">
//             <div>
//               Do you really want to delete ({selectedQuiz.quizTitle}) Quiz?
//             </div>
//             <div className="w-full flex gap-3 justify-center">
//               <button
//                 onClick={() => {
//                   deleteTheQuiz();

//                   toast.dismiss(t.id);
//                 }}
//                 className="bg-green-700 text-white  p-1 w-[100px] rounded-md
//               "
//               >
//                 Yes
//               </button>
//               <button
//                 className="bg-white text-green-700 p-1 w-[100px] border  border-green-700
//                 rounded-md hover:text-white hover:bg-green-700"
//                 onClick={() => {
//                   toast.dismiss(t.id);
//                 }}
//               >
//                 No
//               </button>
//             </div>
//           </div>
//         ),
//         {
//           duration: '10000',
//           id: 'deleteQuiz',
//         },
//       );
//     }

//     setDropDownToggle(false);
//   }

//   return (
//     <div
//       style={{ left: threeDotsPositions.x, top: threeDotsPositions.y }}
//       ref={dropDownRef}
//       className={`p-4 w-32 fixed z-50 shadow-md flex rounded-lg flex-col gap-3 bg-white 
// poppins poppins-light text-[13px] ${
//         dropDownToggle ? 'visible' : 'invisible'
//       }   `}
//     >
//       {menuItems.map((menuItem, index) => (
//         <div
//           onClick={() => handleClickedItem(menuItem)}
//           key={index}
//           className="flex gap-2 items-center border text-green-700 border-gray-200 rounded-md p-3 
//   select-none cursor-pointer hover:text-white hover:bg-green-700"
//         >
//           <FontAwesomeIcon className="size-4" icon={menuItem.icon} />
//           <div className=" ">{menuItem.name}</div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default DropDown;



'use client';

import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// import { Toaster } from 'react-hot-toast';
import { useGlobalContextProvider } from '../context/ContextApi';
import { useRouter } from 'next/navigation';

function DropDown() {
  const {
    dropDownToggleObject,
    threeDotsPositionsObject,
    selectedQuizObject,
    allQuizzes,
    setAllQuizzes,
  } = useGlobalContextProvider();
  const { dropDownToggle, setDropDownToggle } = dropDownToggleObject;
  const { threeDotsPositions } = threeDotsPositionsObject;
  const { selectedQuiz, setSelectedQuiz } = selectedQuizObject;
  // const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [isDialogOpened, setIsDialogOpened] = useState(true);
  const dropDownRef = useRef(null);
  const router = useRouter();

  const menuItems = [
    { name: 'Modify', icon: faPencil },
    { name: 'Delete', icon: faTrash },
  ];

  useEffect(() => {
    function handleOutsideClick(event) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        if (!isDialogOpened) {
          setSelectedQuiz(null);
        }
        setDropDownToggle(false);
        
      }
    }
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [dropDownToggle, isDialogOpened]);

  async function deleteTheQuiz() {
    try {
      const updatedAllQuizzes = allQuizzes.filter(
        (quiz) => quiz._id !== selectedQuiz._id,
      );

      const response = await fetch(
        `http://localhost:3000/api/quizzes?id=${selectedQuiz._id}`,
        { method: 'DELETE', headers: { 'Content-Type': 'application/json' } },
      );

      if (!response.ok) {
        toast.error('Error while deleting the quiz.');
        return;
      }

      setAllQuizzes(updatedAllQuizzes);
      toast.success('Quiz deleted successfully!');
      setSelectedQuiz(null);
    } catch (error) {
      toast.error('Failed to delete quiz.');
      console.error(error);
    } finally {
      setIsDialogOpened(false);
    }
  }

  function handleClickedItem(menuItem) {
    if (menuItem.name === 'Modify') {
      setSelectedQuiz(null);
      router.push('/quiz-build'); 
    } 
      
    if (menuItem.name === 'Delete') {      
      setIsDialogOpened(true);
      toast.custom(
          
        <div className="flex flex-col gap-4 show">
          <span>Do you really want to delete ({selectedQuiz.quizTitle})?</span>
          <div className="flex justify-center gap-2">
            <button
              onClick={deleteTheQuiz}
              className="bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss()}
              className="bg-white text-green-700 border border-green-700 px-4 py-2 rounded-md"
            >
              No
            </button>
          </div>
        </div>,
      );
    }
    setDropDownToggle(false);
  }

  return (
    <div
      ref={dropDownRef}
      style={{ left: threeDotsPositions.x, top: threeDotsPositions.y }}
      className={`absolute z-50 flex flex-col gap-2 bg-white shadow-md p-4 rounded-lg transition-transform ${
        dropDownToggle ? 'scale-100 visible' : 'scale-90 invisible'
      }`}
    >
      {menuItems.map((item, idx) => (
        <button
          key={idx}
          onClick={() => handleClickedItem(item)}
          className="flex items-center gap-2 p-2 border rounded-md hover:bg-green-700 hover:text-white"
        >
          <FontAwesomeIcon icon={item.icon} />
          <span>{item.name}</span>
        </button>
      ))}
    </div>
  );
}

export default DropDown;
