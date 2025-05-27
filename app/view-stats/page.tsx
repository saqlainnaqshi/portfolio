'use client';

import { useState } from 'react';

export default function ViewStatsPage() {
    const [token, setToken] = useState('');
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState('');

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

            const result = await res.json();
            setData(result);
            setError('');
        } catch (err: any) {
            setData(null);
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-black">📊 View Stats Dashboard</h1>

                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <label className="block font-semibold text-black mb-2">Secret Token</label>
                    <input
                        type="password"
                        placeholder="Enter secret token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        className="p-3 border border-gray-400 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-black bg-white"
                    />
                    <button
                        onClick={fetchStats}
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Fetch Stats
                    </button>
                    {error && <p className="text-red-600 mt-4">{error}</p>}
                </div>

                {data && (
                    <div className="space-y-8">
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4 text-black">📄 Views Per Page</h2>
                            <ul className="space-y-2">
                                {data.views.map((v: any) => (
                                    <li key={v.page} className="flex justify-between border-b pb-2">
                                        <span className="font-medium text-black">{v.page}</span>
                                        <span className="text-black">{v.count}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4 text-black">📜 Recent Logs</h2>
                            <div className="overflow-auto max-h-[400px]">
                                <table className="min-w-full text-sm border border-gray-300">
                                    <thead className="sticky top-0 bg-gray-100 text-black">
                                        <tr>
                                            <th className="text-left p-2 border-b">Page</th>
                                            <th className="text-left p-2 border-b">IP</th>
                                            <th className="text-left p-2 border-b">User Agent</th>
                                            <th className="text-left p-2 border-b">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.recentLogs.map((log: any, index: number) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="p-2 border-b text-black">{log.page}</td>
                                                <td className="p-2 border-b text-black truncate max-w-[150px]" title={log.ip}>
                                                    {log.ip}
                                                </td>
                                                <td className="p-2 border-b text-black truncate max-w-[200px]" title={log.userAgent}>
                                                    {log.userAgent}
                                                </td>
                                                <td className="p-2 border-b text-black">
                                                    {new Date(log.timestamp).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
}
