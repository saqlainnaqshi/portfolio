'use client';
import { useEffect, useState } from 'react';

export default function RandomDots({ darkMode }: { darkMode: boolean }) {
    const [dots, setDots] = useState(
        [] as { width: string; height: string; left: string; top: string; opacity: number }[]
    );

    useEffect(() => {
        const newDots = Array.from({ length: 20 }).map(() => ({
            width: `${Math.random() * 5 + 1}px`,
            height: `${Math.random() * 5 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
        }));
        setDots(newDots);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 opacity-20">
            {dots.map((style, i) => (
                <div
                    key={i}
                    className={`absolute rounded-full ${darkMode ? 'bg-white' : 'bg-gray-900'}`}
                    style={style}
                />
            ))}
        </div>
    );
}
