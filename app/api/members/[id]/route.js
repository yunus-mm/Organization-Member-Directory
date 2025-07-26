import { connectDB } from '../../../../lib/mongodb';
import Member from '../../../../models/Member';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../auth/config';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const member = await Member.findById(params.id).lean();
    if (!member) {
      return Response.json({ error: 'Member not found' }, { status: 404 });
    }
    return Response.json(member);
  } catch (error) {
    console.error('Error fetching member:', error);
    return Response.json({ error: 'Failed to fetch member' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();
    const member = await Member.findByIdAndUpdate(
      params.id,
      data,
      { new: true }
    ).lean();

    if (!member) {
      return Response.json({ error: 'Member not found' }, { status: 404 });
    }

    return Response.json(member);
  } catch (error) {
    console.error('Error updating member:', error);
    return Response.json({ error: 'Failed to update member' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
    }

    await connectDB();
    const member = await Member.findByIdAndDelete(params.id);
    if (!member) {
      return Response.json({ error: 'Member not found' }, { status: 404 });
    }

    return Response.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Error deleting member:', error);
    return Response.json({ error: 'Failed to delete member' }, { status: 500 });
  }
}
