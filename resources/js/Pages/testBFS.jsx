import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function RouteFinder({ auth, nodes }) {
    const [startNode, setStartNode] = useState('');
    const [endNode, setEndNode] = useState('');
    const [path, setPath] = useState(null);

    const bfs = (start, end) => {
        const queue = [[start]];
        const visited = new Set();

        while (queue.length > 0) {
            const path = queue.shift();
            const node = path[path.length - 1];

            if (node === end) {
                return path;
            }

            if (!visited.has(node)) {
                visited.add(node);
                const currentNode = nodes.find(n => n.name === node);
                for (const neighbor of currentNode.connections) {
                    if (!visited.has(neighbor)) {
                        queue.push([...path, neighbor]);
                    }
                }
            }
        }

        return null;
    };

    const handleFindRoute = () => {
        if (startNode && endNode) {
            const result = bfs(startNode, endNode);
            setPath(result);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Route Finder" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-2xl font-bold mb-4">Route Finder</h1>
                            <div className="mb-4">
                                <label className="block mb-2">Start Node:</label>
                                <select 
                                    value={startNode} 
                                    onChange={(e) => setStartNode(e.target.value)}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">Select start node</option>
                                    {nodes.map(node => (
                                        <option key={node.id} value={node.name}>{node.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">End Node:</label>
                                <select 
                                    value={endNode} 
                                    onChange={(e) => setEndNode(e.target.value)}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">Select end node</option>
                                    {nodes.map(node => (
                                        <option key={node.id} value={node.name}>{node.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button 
                                onClick={handleFindRoute}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Find Route
                            </button>
                            {path && (
                                <div className="mt-4">
                                    <h2 className="text-xl font-bold">Result:</h2>
                                    <p>Path: {path.join(' -> ')}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}