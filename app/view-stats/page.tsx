'use client';

import { useState } from 'react';

type ViewCount = {
    page: string;
    count: number;
};

type ViewLog = {
    page: string;
    ip: string;
    userAgent: string;
    timestamp: string;
};

type StatsResponse = {
    views: ViewCount[];
    recentLogs: ViewLog[];
};

export default function ViewStatsPage() {
    const [token, setToken] = useState('');
    const [data, setData] = useState<StatsResponse | null>(null);
    const [error, setError] = useState<string>('');

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/views-monitor', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const result: StatsResponse = await res.json();
            setData(result);
            setError('');
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setData(null);
            setError(message);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto text-black">
            <h1 className="text-2xl font-bold mb-4">View Stats</h1>

            <input
                type="password"
                placeholder="Enter secret token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="p-2 border rounded w-full mb-4"
            />

            <button
                onClick={fetchStats}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Fetch Stats
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {data && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Views Per Page</h2>
                    <ul className="mb-6">
                        {data.views.map((v) => (
                            <li key={v.page} className="mb-1">
                                <strong>{v.page}</strong>: {v.count}
                            </li>
                        ))}
                    </ul>

                    <h2 className="text-xl font-semibold mb-2">Recent Logs</h2>
                    <table className="w-full border border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">Page</th>
                                <th className="border p-2">IP</th>
                                <th className="border p-2">User Agent</th>
                                <th className="border p-2">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.recentLogs.map((log, index) => (
                                <tr key={index}>
                                    <td className="border p-2">{log.page}</td>
                                    <td className="border p-2">{log.ip}</td>
                                    <td className="border p-2">{log.userAgent}</td>
                                    <td className="border p-2">
                                        {new Date(log.timestamp).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
