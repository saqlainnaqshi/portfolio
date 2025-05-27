import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';

const SECRET_TOKEN = process.env.VIEW_STATS_SECRET;

export async function GET(request: Request) {
    const token = request.headers.get('authorization')?.replace('Bearer ', '') || '';

    if (token !== SECRET_TOKEN) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const db = await connectToDB();

        const views = await db.collection('views').find({}).toArray();

        const recentLogs = await db
            .collection('views_log')
            .find({})
            .sort({ timestamp: -1 })
            .limit(50)
            .toArray();

        return NextResponse.json({ views, recentLogs });
    } catch (err) {
        console.error('Error fetching stats:', err);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
