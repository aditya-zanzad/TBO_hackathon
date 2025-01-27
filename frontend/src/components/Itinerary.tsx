import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { data as itineraryData } from "../constants/data";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ToastContainer, toast } from 'react-toastify';
import { Item, MAX_LOCATIONS_PER_DAY, MAX_RESTAURANTS_PER_DAY, sortItems, updateItemIds } from '../utils/itineraryUtils';
import ItineraryListItem from './Itinerary/ItineraryListItem';
const socket = io("http://localhost:8000");



interface ItineraryProps {
    title: string;
}

type ItineraryData = Item[][];


const Itinerary: React.FC<ItineraryProps> = ({
    title
}) => {
    const [data, setData] = useState<ItineraryData>(itineraryData);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [dayIndex, setDayIndex] = useState(0);
    const [currentItem, setCurrentItem] = useState<Item | null>(null);
    const [newDestination, setNewDestination] = useState<Item>({
        name: '',
        significance: 'Sample significance text', // Default significance
        type: '', // For the user to choose
        distance: 0,
    });
    const [placeType, setPlaceType] = useState<'destination' | 'restaurant'>('destination');

    // Handle Modal visibility
    const openAddModal = (dayIndex: number) => {
        setIsAddModalOpen(true);
        setDayIndex(dayIndex); // Default to the first day
    };
    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setDayIndex(0); // Reset to the first day
    };

    const openRemoveModal = (item: Item) => {
        setCurrentItem(item);
        setIsRemoveModalOpen(true);
    };
    const closeRemoveModal = () => setIsRemoveModalOpen(false);



    useEffect(() => {
        socket.on("initialData", (initialData) => {
            setData(initialData);
        });

        socket.on("updatedData", (updatedData) => {
            setData(updatedData);
        });

        return () => {
            socket.off("initialData");
            socket.off("updatedData");
        };
    }, []);


    const onDragEnd = (result: any) => {
        const { source, destination } = result;

        if (!destination) return;

        const sourceDayIndex = parseInt(source.droppableId);
        const destinationDayIndex = parseInt(destination.droppableId);

        let updatedData = [...data];

        if (sourceDayIndex === destinationDayIndex) {
            const dayItems = Array.from(data[sourceDayIndex]);
            const [movedItem] = dayItems.splice(source.index, 1);
            dayItems.splice(destination.index, 0, movedItem); // Move item within the same day
            updatedData[sourceDayIndex] = sortItems(dayItems).flat(); // Apply sorting logic
        } else {
            const sourceItems = Array.from(data[sourceDayIndex]);
            const destinationItems = Array.from(data[destinationDayIndex]);

            const [movedItem] = sourceItems.splice(source.index, 1);
            destinationItems.splice(destination.index, 0, movedItem);

            updatedData[sourceDayIndex] = sortItems(sourceItems).flat(); // Apply sorting logic
            updatedData[destinationDayIndex] = sortItems(destinationItems).flat(); // Apply sorting logic
        }

        setData(updatedData);
        socket.emit("updateData", updatedData);
    };


    const addNewDestination = (dayIndex: number) => {
        const day = data[dayIndex];

        // Count the existing locations and restaurants
        const locationCount = day.filter(item => item.type === 'location').length;
        const restaurantCount = day.filter(item => item.type === 'restaurant').length;

        // If the day has space for a location or restaurant
        if (placeType === 'destination' && locationCount < MAX_LOCATIONS_PER_DAY) {
            const newItem: Item = {
                ...newDestination,
                id: Date.now(), // Assign a unique id for the new item
                type: 'location',
            };

            const updatedDay = [...day, newItem];
            const updatedData = [...data];
            updatedData[dayIndex] = updateItemIds(updatedDay); // Update ids

            // Sort the day items after addition
            updatedData[dayIndex] = updatedData[dayIndex].sort((a, b) => {
                if (a.id && !b.id) return -1;
                if (!a.id && b.id) return 1;
                return 0;
            });

            setData(updatedData);
            socket.emit("updateData", updatedData);
            closeAddModal(); // Close the modal after adding the destination
        } else if (placeType === 'restaurant' && restaurantCount < MAX_RESTAURANTS_PER_DAY) {
            const newItem: Item = {
                ...newDestination,
                significance: '', // Remove significance for restaurants
                type: 'restaurant',
            };

            const updatedDay = [...day, newItem];
            const updatedData = [...data];
            updatedData[dayIndex] = updateItemIds(updatedDay); // Update ids

            // Sort the day items after addition
            updatedData[dayIndex] = updatedData[dayIndex].sort((a, b) => {
                if (a.id && !b.id) return -1;
                if (!a.id && b.id) return 1;
                return 0;
            });

            setData(updatedData);
            socket.emit("updateData", updatedData);
            closeAddModal(); // Close the modal after adding the restaurant
        }
    };

    const removeDestination = () => {
        if (currentItem?.id) {
            const updatedData = data.map(day => {
                return day.filter(item => item.id !== currentItem?.id);
            });
            setData(updatedData);
            socket.emit("updateData", updatedData);
            toast.success(`${currentItem?.name} removed successfully!`);
        } else {
            const updatedData = data.map(day => {
                return day.filter(item => item.name !== currentItem?.name);
            });
            setData(updatedData);
            socket.emit("updateData", updatedData);
            toast.success(`${currentItem?.name} removed successfully!`);
        }
        closeRemoveModal();
    };

    useEffect(() => {
        console.log(data, "data \n");
        console.log(currentItem, "currentItem");
    }, [data]);

    return (
        <div className="min-h-screen relative bg-gradient-to-b from-sky-900 p-4 text-white pt-32">
            <h1 className="text-6xl font-semibold text-center mb-6">{title} </h1>
            <ToastContainer />
            <div className='z-50  top-36 right-4 fixed' >
                <button className=' text-white py-2 px-4 rounded bg-cyan-600 transition duration-300 ease-in-out hover:bg-sky-800'
                    disabled={data.length === 0}
                    onClick={() => {
                        socket.emit("saveData", data);
                        toast.success('Itinerary saved successfully!');
                    }}
                >
                    Save Itinerary
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DragDropContext onDragEnd={onDragEnd}>
                    {data.map((day, dayIndex) => {
                        const updatedDayItems = updateItemIds(day); // Update item ids for each day
                        return (
                            <Droppable droppableId={`${dayIndex}`} key={`day-${dayIndex}`}>
                                {(provided) => (
                                    <div
                                        className="shadow-md bg- rounded-lg p-4 mb-4"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <h2 className="text-xl font-semibold mb-2">Day {dayIndex + 1}</h2>

                                        {/* Add Button */}
                                        <button
                                            className={`mb-4 bg-cyan-600 transition duration-300 ease-in-out hover:bg-sky-800 text-white py-2 px-4 rounded ${day.length >= MAX_LOCATIONS_PER_DAY + MAX_RESTAURANTS_PER_DAY ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={() => openAddModal(dayIndex)}
                                            disabled={day.length >= MAX_LOCATIONS_PER_DAY + MAX_RESTAURANTS_PER_DAY}
                                        >
                                            Add New Destination
                                        </button>

                                        {updatedDayItems.map((item, index) => (
                                            <Draggable
                                                draggableId={`${item.id || item.name}-${dayIndex}`}
                                                index={index}
                                                key={item.id || item.name}
                                            >
                                                {(provided) => (
                                                    <div
                                                        className="bg-gray-100 rounded-md p-2 mb-2 border border-gray-300 relative"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <ItineraryListItem item={item} index={index} openRemoveModal={openRemoveModal} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        );
                    })}
                </DragDropContext>
            </div>

            {/* Add Item Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h2 className="text-xl font-semibold mb-4">Add New Destination</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Select Place Type</label>
                            <select
                                value={placeType}
                                onChange={(e) => setPlaceType(e.target.value as 'destination' | 'restaurant')}
                                className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded mt-1"
                            >
                                <option value="">Select Place Type</option>
                                {data[dayIndex].filter(item => item.id !== undefined).length < MAX_LOCATIONS_PER_DAY && (
                                    <option value="destination">Destination</option>
                                )}
                                {data[dayIndex].filter(item => item.id === undefined).length < MAX_RESTAURANTS_PER_DAY && (
                                    <option value="restaurant">Restaurant</option>
                                )}
                            </select>
                        </div>





                        {/* Dynamic Fields */}
                        {placeType === 'destination' && (
                            <>
                                {placeType === 'destination' && (
                                    <>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Name</label>
                                            <input
                                                type="text"
                                                value={newDestination.name}
                                                onChange={(e) => setNewDestination({ ...newDestination, name: e.target.value })}
                                                className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded mt-1"
                                                placeholder='Enter name'
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Significance</label>
                                            <input
                                                type="text"
                                                value={newDestination.significance}
                                                onChange={(e) =>
                                                    setNewDestination({ ...newDestination, significance: e.target.value })
                                                }
                                                className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded mt-1"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Type (e.g., Temple, Fort, etc.)</label>
                                            <input
                                                type="text"
                                                value={newDestination.type}
                                                onChange={(e) =>
                                                    setNewDestination({ ...newDestination, type: e.target.value })
                                                }
                                                className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded mt-1"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Airport Within 50km Radius</label>
                                            <select
                                                value={newDestination.airportWithin50kmRadius ? 'yes' : 'no'}
                                                onChange={(e) =>
                                                    setNewDestination({
                                                        ...newDestination,
                                                        airportWithin50kmRadius: e.target.value === 'yes',
                                                    })
                                                }
                                                className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded mt-1"
                                            >
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </select>
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">City</label>
                                            <input
                                                type="text"
                                                value={newDestination.city || ''}
                                                onChange={(e) => setNewDestination({ ...newDestination, city: e.target.value })}
                                                placeholder='Enter city'
                                                className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded mt-1"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">State</label>
                                            <input
                                                type="text"
                                                value={newDestination.state || ''}
                                                onChange={(e) => setNewDestination({ ...newDestination, state: e.target.value })}
                                                className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded mt-1"
                                                placeholder='Enter state'
                                            />
                                        </div>
                                    </>
                                )}

                            </>
                        )}

                        {placeType === 'restaurant' && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        value={newDestination.name}
                                        onChange={(e) => setNewDestination({ ...newDestination, name: e.target.value })}
                                        className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded mt-1"
                                        placeholder='Enter name'
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">City</label>
                                    <input
                                        type="text"
                                        value={newDestination.city}
                                        onChange={(e) => setNewDestination({ ...newDestination, city: e.target.value })}
                                        className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded mt-1"
                                        placeholder='Enter city'
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Distance</label>
                                    <input
                                        type="number"
                                        value={newDestination.distance || 0}
                                        onChange={(e) => setNewDestination({ ...newDestination, distance: +e.target.value })}
                                        className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded mt-1"
                                    />
                                </div>
                            </>
                        )}

                        <div className="flex justify-between">
                            <button
                                className={`bg-cyan-600 transition duration-300 ease-in-out hover:bg-sky-800 text-white py-2 px-4 rounded ${newDestination.name === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => addNewDestination(dayIndex)}
                            >
                                Add
                            </button>
                            <button
                                className="bg-gray-500 text-white py-2 px-4 rounded"
                                onClick={closeAddModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Remove Item Modal */}
            {isRemoveModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Are you sure you want to remove {currentItem?.name}?</h3>
                        <div className="flex justify-between gap-4">
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded"
                                onClick={removeDestination}
                            >
                                Remove
                            </button>
                            <button
                                className="bg-gray-500 text-white py-2 px-4 rounded"
                                onClick={closeRemoveModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Itinerary;
