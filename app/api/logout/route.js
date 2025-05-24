// app/api/logout/route.js
import User from '@/app/models/UserSchema';
import { connectToDB } from '@/libs/mongoDB';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await connectToDB();

  try {
    const { id } = await request.json();
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    user.isLogged = false;
    await user.save();

    return NextResponse.json({ message: 'Logout successful' }, { status: 200 });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ message: 'Logout failed', error: error.message }, { status: 500 });
  }
}