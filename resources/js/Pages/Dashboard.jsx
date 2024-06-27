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
>   
    <Head title="Dashboard" />
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Hitung Jarak Lokasi</h3>
                <div className="flex flex-wrap mb-6 gap-6">
                    <div className="w-full md:w-5/12">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Lokasi 1
                        </label>
                        <select
                            value={selectedLocation1}
                            onChange={(e) => setSelectedLocation1(e.target.value)}
                            className="block appearance-none w-full bg-gray-50 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 transition duration-150 ease-in-out"
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
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Lokasi 2
                        </label>
                        <select
                            value={selectedLocation2}
                            onChange={(e) => setSelectedLocation2(e.target.value)}
                            className="block appearance-none w-full bg-gray-50 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 transition duration-150 ease-in-out"
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
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out"
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