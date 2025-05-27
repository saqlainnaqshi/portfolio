import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';

export async function POST(request: Request) {
    const { page } = await request.json();

    if (!page || typeof page !== 'string') {
        return NextResponse.json({ error: 'Invalid page parameter' }, { status: 400 });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        request.headers.get('x-real-ip') ||
        'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    try {
        const db = await connectToDB();

        await db.collection('views').updateOne(
            { page },
            { $inc: { count: 1 } },
            { upsert: true }
        );

        await db.collection('views_log').insertOne({
            page,
            ip,
            userAgent,
            timestamp: new Date(),
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Error updating views:', err);
        return NextResponse.json({ error: 'Failed to update views' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const token = request.headers.get('authorization')?.replace('Bearer ', '') || '';

    if (token !== process.env.VIEW_STATS_SECRET) {
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
