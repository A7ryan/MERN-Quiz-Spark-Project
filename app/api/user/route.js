// import User from '@/app/models/UserSchema';

// import { connectToDB } from '@/libs/mongoDB';
// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   await connectToDB();

//   try {
//     // Count the number of documents in the User collection
//     const countUsers = await User.countDocuments();

//     if (countUsers > 0) {
//       // If at least one user exists, find the first user
//       const findUser = await User.findOne();

//       // Return the first user to the client
//       return NextResponse.json({
//         message: 'User already exists',
//         user: findUser,
//       });
//     }

//     const { name, isLogged, experience } = await request.json();
//     const newUser = await User.create({ name, isLogged, experience });
//     return NextResponse.json({
//       user: newUser,
//     });
//   } catch (error) {
//     return NextResponse.json({ message: error });
//   }
// }

// export async function PUT(request) {
//   try {
//     const id = request.nextUrl.searchParams.get('id');
//     let userUpdate = await User.findById(id);

//     const { updateUser } = await request.json();
//     userUpdate.isLogged = updateUser.isLogged;
//     userUpdate.experience = updateUser.experience;

//     await userUpdate.save();
//     return NextResponse.json({ message: 'user saved' });
//   } catch (error) {
//     console.log(error);
//   }
// }



// app/api/user/route.js
// app/api/user/route.js
import User from '@/app/models/UserSchema';
import { connectToDB } from '@/libs/mongoDB';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await connectToDB();

  try {
    const countUsers = await User.countDocuments();

    if (countUsers > 0) {
      const findUser = await User.findOne();
      return NextResponse.json({
        message: 'User already exists',
        user: findUser,
      });
    }

    const { name, isLogged, experience } = await request.json();
    const newUser = await User.create({ name, isLogged, experience });
    return NextResponse.json({ user: newUser });
  } catch (error) {
    console.error('User creation error:', error);
    return NextResponse.json(
      { message: 'User creation failed', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  await connectToDB();

  try {
    const id = request.nextUrl.searchParams.get('id'); // Get id from query parameters
    const { updateUser } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $set: { experience: updateUser.experience, isLogged: updateUser.isLogged } },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated', user }, { status: 200 });
  } catch (error) {
    console.error('User update error:', error);
    return NextResponse.json(
      { message: 'Update failed', error: error.message },
      { status: 500 }
    );
  }
}