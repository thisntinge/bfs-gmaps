import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ auth, locations }) {
    const [selectedLocation1, setSelectedLocation1] = useState("");
    const [selectedLocation2, setSelectedLocation2] = useState("");
    const [distance, setDistance] = useState(null);

    const graph = {};
    const calculateDistance = (location1, location2) => {
        const lat1 = location1.lat;
        const lon1 = location1.lng;
        const lat2 = location2.lat;
        const lon2 = location2.lng;
        const radius = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
                Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = radius * c;
        return distance;
    };

    locations.forEach((location) => {
        graph[location.name] = {};
        locations.forEach((otherLocation) => {
            if (location.id !== otherLocation.id) {
                graph[location.name][otherLocation.name] = calculateDistance(
                    location,
                    otherLocation
                );
            }
        });
    });

    const bfs = (start, end) => {
        const queue = [[start]];
        const visited = new Set();
        while (queue.length > 0) {
            const path = queue.shift();
            const node = path[path.length - 1];
            if (!visited.has(node)) {
                visited.add(node);
                if (node === end) {
                    return path;
                }
                for (const neighbor in graph[node]) {
                    if (!visited.has(neighbor)) {
                        queue.push([...path, neighbor]);
                    }
                }
            }
        }
        return null;
    };

    const handleCalculateDistance = () => {
        if (selectedLocation1 && selectedLocation2) {
            const path = bfs(selectedLocation1, selectedLocation2);
            if (path) {
                const distance = path.reduce((acc, node, index) => {
                    if (index > 0) {
                        acc += graph[path[index - 1]][node];
                    }
                    return acc;
                }, 0);
                setDistance(distance);
            } else {
                setDistance(null);
            }
        }
    };

    return (
         <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-800">
                    Hitung Jarak Lokasi
                </h2>
            }
        >
            <Head title="Hitung Jarak Lokasi" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-8 space-y-6">
                        <div className="flex flex-wrap gap-6">
                            <div className="w-full md:w-5/12">
                                <label htmlFor="location1" className="block text-xl font-medium text-gray-700 mb-2">
                                    Lokasi 1
                                </label>
                                <select
                                    id="location1"
                                    value={selectedLocation1}
                                    onChange={(e) => setSelectedLocation1(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xl"
                                >
                                    <option value="">Pilih Lokasi</option>
                                    {locations.map((location) => (
                                        <option key={location.id} value={location.name}>
                                            {location.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full md:w-5/12">
                                <label htmlFor="location2" className="block text-xl font-medium text-gray-700 mb-2">
                                    Lokasi 2
                                </label>
                                <select
                                    id="location2"
                                    value={selectedLocation2}
                                    onChange={(e) => setSelectedLocation2(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xl`"
                                >
                                    <option value="">Pilih Lokasi</option>
                                    {locations.map((location) => (
                                        <option key={location.id} value={location.name}>
                                            {location.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={handleCalculateDistance}
                                className="w-full md:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Hitung Jarak
                            </button>
                        </div>
                        {distance !== null && (
                            <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                                    Hasil Perhitungan
                                </h3>
                                <p className="text-lg text-gray-700">
                                    Jarak antara <span className="font-semibold">{selectedLocation1}</span> dan{" "}
                                    <span className="font-semibold">{selectedLocation2}</span> adalah:{" "}
                                    <span className="text-indigo-600 font-bold">{distance.toFixed(2)} km</span>
                                </p>
                                <p className="text-sm text-gray-600 mt-2">
                                    Catatan: Ini adalah perkiraan jarak menggunakan BFS dan formula Haversine.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}