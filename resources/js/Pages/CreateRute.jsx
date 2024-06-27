import MapComponent from "@/Components/MapComponent";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function CreateRute({ auth }) {
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
        description: "",
        lat: "",
        lng: "",
    });

    const handleCoordinatesChange = (lat, lng) => {
        setCoordinates({ lat, lng });
        setData(prevData => ({
            ...prevData,
            lat,
            lng,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/locations', {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                // Reset form abis submit
                reset('nama', 'description');
                setCoordinates({ lat: null, lng: null });
                alert('Data berhasil disimpan!');
            },
            onError: () => {
                alert('Terjadi kesalahan saat menyimpan data.');
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-800">
                    Buat Rute Baru
                </h2>
            }
        >
            <Head title="Buat Rute Baru" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="lg:flex">
                        <form
                            onSubmit={handleSubmit}
                            className="lg:w-1/2 p-8 space-y-6"
                        >
                            <div>
                                <label htmlFor="nama" className="block text-xl font-medium text-gray-700">Nama Tempat</label>
                                <input
                                    type="text"
                                    name="nama"
                                    id="nama"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-"
                                    value={data.nama}
                                    onChange={e => setData('nama', e.target.value)}
                                />
                                {errors.nama && <div className="text-red-500 text-sm mt-1">{errors.nama}</div>}
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-xl font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    rows="3"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xl"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                ></textarea>
                                {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                            </div>
                            <div>
                                <label className="block text-xl font-medium text-gray-700">Location</label>
                                <div className="mt-1 flex gap-4">
                                    <input
                                        type="text"
                                        name="lat"
                                        placeholder="Latitude"
                                        className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xl"
                                        value={data.lat || ""}
                                        readOnly
                                    />
                                    <input
                                        type="text"
                                        name="lng"
                                        placeholder="Longitude"
                                        className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xl"
                                        value={data.lng || ""}
                                        readOnly
                                    />
                                </div>
                                {(errors.lat || errors.lng) && <div className="text-red-500 text-sm mt-1">Lokasi harus dipilih</div>}
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                                        processing ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                    disabled={processing}
                                >
                                    {processing ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </form>
                        <div className="lg:w-1/2 bg-gray-100">
                            <MapComponent onCoordinatesChange={handleCoordinatesChange} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}