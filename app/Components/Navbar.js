// 'use client';
// import React, { useState } from 'react';
// import Image from 'next/image';
// import useGlobalContextProvider from '../ContextApi';

// function Navbar(props) {
//   const { userObject, userXpObject } = useGlobalContextProvider();
//   const { user, setUser } = userObject;
//   const [isLoading, setIsLoading] = useState(false);

//   async function changeTheLoginState() {
//     console.log(isLoading);
//     const userCopy = { ...user };
//     userCopy.isLogged = !userCopy.isLogged;

//     try {
//       setIsLoading(true);
//       const response = await fetch(
//         `http://localhost:3000/api/user?id=${userCopy._id}`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-type': 'application/json',
//           },
//           body: JSON.stringify({ updateUser: userCopy }),
//         },
//       );

//       if (!response.ok) {
//         toast.error('Something went wrong...');
//         throw new Error('fetching failed...');
//       }

//       setUser(userCopy);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <nav className=" poppins  mx-auto max-w-screen-xl p-4 sm:px-8 sm:py-5 lg:px-10">
//       <div className="sm:flex sm:items-center sm:justify-between">
//         <div className="text-center sm:text-left">
//           <a className="flex gap-1 items-center">
//             <Image
//               src="/quizSpark_icon.png"
//               alt=""
//               width={60} // Width of the image
//               height={60}
//             />
//             <h2 className="text-2xl font-bold flex gap-2">
//               Quiz <span className="text-green-700">Spark</span>
//             </h2>
//           </a>
//         </div>

//         <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
//           {user.isLogged && (
//             <div className="flex gap-2">
//               <span>Welcome: {user.name}</span>
//               <span className="font-bold text-green-700">
//                 {user.experience} XP
//               </span>
//             </div>
//           )}

//           <button
//             className="block rounded-lg bg-green-700 px-7 py-3 text-sm font-medium text-white transition hover:bg-green-800 focus:outline-none"
//             type="button"
//             onClick={() => {
//               changeTheLoginState();
//             }}
//           >
//             {isLoading ? 'Loading...' : user.isLogged ? 'Logout' : 'Login'}
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import useGlobalContextProvider from '../ContextApi';

function Navbar() {
  const { userObject } = useGlobalContextProvider();
  const { user, setUser } = userObject;
  const [isLoading, setIsLoading] = useState(false);

  // Toggle login state
  async function changeTheLoginState() {
    const userCopy = { ...user };
    userCopy.isLogged = !userCopy.isLogged;

    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/user?id=${userCopy._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ updateUser: userCopy }),
        },
      );

      if (!response.ok) {
        console.error('Error updating user:', response.statusText);
        throw new Error('Failed to update user.');
      }

      setUser(userCopy);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 mb-6">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto p-4 sm:px-8 sm:py-3">
        <a href="/" className="flex items-center gap-2">
          <Image
            src="/quizSpark_icon.png"
            alt="Quiz Spark Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h2 className="text-xl font-bold">
            Quiz <span className="text-green-700">Spark</span>
          </h2>
        </a>
        <div className="flex items-center gap-4">
          {user.isLogged && (
            <div className="text-sm text-gray-700">
              <span>Welcome, <span className="font-semibold">{user.name}</span></span>
              <span className="ml-2 font-bold text-green-700">{user.experience} XP</span>
            </div>
          )}
          <button
            className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition ${
              isLoading
                ? 'bg-gray-500'
                : 'bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-400'
            }`}
            type="button"
            disabled={isLoading}
            onClick={changeTheLoginState}
          >
            {isLoading ? 'Loading...' : user.isLogged ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
