import { Item, TIME_SLOTS } from "../../utils/itineraryUtils"

interface IItineraryListItemProps {
    item: Item;
    index: number;
    openRemoveModal: (item: Item) => void
}

const ItineraryListItem = ({
    item,
    index,
    openRemoveModal
}: IItineraryListItemProps) => {
    return (
        <>
            <p className=' bg-yellow-500 p-2 rounded-full w-fit text-white my-1 ' >
                {TIME_SLOTS[index]}
            </p>
            <div className="flex justify-between items-center w-full gap-5">
                <div className='flex flex-col gap-2 w-full' >
                    <div className='flex gap-2 justify-between items-center w-full' >
                        <p className="font-medium text-gray-800 w-3/5">{item.name}</p>
                        <p className='  w-2/5 flex justify-end' >
                            <span className='bg-green-500 p-2 rounded-full w-fit text-white my-1 px-5 py-1' >
                                {item.type === 'restaurant' || item.type === undefined ? '🍔' : item.type}

                            </span>

                        </p>


                    </div>
                    {item.significance && (
                        <p className="text-sm text-gray-500">{item.significance}</p>
                    )}
                </div>
                <button
                    className="text-red-500 p-1 rounded-full bg-red-100 w-1/7"
                    onClick={() => openRemoveModal(item)}
                >
                    X
                </button>
            </div>
        </>
    )
}

export default ItineraryListItem