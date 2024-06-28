import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function RouteFinder({ auth, nodes }) {
    const [startNode, setStartNode] = useState('');
    const [endNode, setEndNode] = useState('');
    const [path, setPath] = useState(null);
    const [totalDistance, setTotalDistance] = useState(null);

    const calculateDistance = (node1, node2) => {
        const lat1 = node1.lat;
        const lon1 = node1.lng;
        const lat2 = node2.lat;
        const lon2 = node2.lng;
        const radius = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
                Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return radius * c;
    };

    const bfs = (start, end) => {
        const queue = [[start]];
        const visited = new Set();

        while (queue.length > 0) {
            const path = queue.shift();
            const nodeName = path[path.length - 1];
            const node = nodes.find(n => n.name === nodeName);

            if (nodeName === end) {
                const distance = path.reduce((acc, name, index) => {
                    if (index > 0) {
                        const prevNode = nodes.find(n => n.name === path[index - 1]);
                        const currNode = nodes.find(n => n.name === name);
                        acc += calculateDistance(prevNode, currNode);
                    }
                    return acc;
                }, 0);
                return { path, distance };
            }

            if (!visited.has(nodeName)) {
                visited.add(nodeName);
                for (const neighbor of node.connections) {
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
            if (result) {
                setPath(result.path);
                setTotalDistance(result.distance);
            } else {
                setPath(null);
                setTotalDistance(null);
            }
        }
    };

    const filteredNodes = nodes.filter(node => 
        !node.name.includes('Persimpangan') &&
        !node.name.includes('Jalan') &&
        !node.name.includes('Jl.') &&
        !node.name.includes('Jl')
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-800 ">
                    Route Finder
                </h2>
            }
        >
            <Head title="Route Finder" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-8 space-y-6">
                        <div>
                            <label htmlFor="startNode" className="block text-xl font-medium text-gray-700 mb-2">
                                Start Node
                            </label>
                            <select 
                                id="startNode"
                                value={startNode} 
                                onChange={(e) => setStartNode(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                            >
                                <option value="">Select start node</option>
                                {filteredNodes.map(node => (
                                    <option key={node.id} value={node.name}>{node.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="endNode" className="block text-xl font-medium text-gray-700 mb-2">
                                End Node
                            </label>
                            <select 
                                id="endNode"
                                value={endNode} 
                                onChange={(e) => setEndNode(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                            >
                                <option value="">Select end node</option>
                                {filteredNodes.map(node => (
                                    <option key={node.id} value={node.name}>{node.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <button 
                                onClick={handleFindRoute}
                                className="bg-indigo-600 hover:bg-indigo-900 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out w-full"
                            >
                                Find Route
                            </button>
                        </div>
                        {path && (
                            <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                                <p className="text-4xl font-bold text-indigo-600 mb-2">
                                    Hasil Pencarian Rute
                                </p>
                                <p className="text-lg text-gray-700 mb-2"> 
                                    Rute: <span className="font-semibold">{path.join(' -> ')}</span> 
                                </p>
                                
                                <p className="text-2xl text-gray-900">
                                    Jarak Total: <span className="text-indigo-600 font-bold">{totalDistance.toFixed(2)} km</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                
            </div>
        </AuthenticatedLayout>
    );
}
