import { connectDB } from '../../../lib/mongodb';
import Member from '../../../models/Member';
import { authOptions } from '../../../auth/config';
import { getServerSession } from 'next-auth';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const query = {};

    if (searchParams.get('name')) {
      query.name = { $regex: searchParams.get('name'), $options: 'i' };
    }
    if (searchParams.get('role')) {
      query.role = { $regex: searchParams.get('role'), $options: 'i' };
    }
    if (searchParams.get('department')) {
      query.department = { $regex: searchParams.get('department'), $options: 'i' };
    }

    const members = await Member.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return Response.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    return Response.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();
    const member = new Member(data);
    await member.save();

    return Response.json(member);
  } catch (error) {
    console.error('Error creating member:', error);
    return Response.json({ error: 'Failed to create member' }, { status: 500 });
  }
}
