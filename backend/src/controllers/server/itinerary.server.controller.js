import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { Itinerary } from "../../models/itinerary.model.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const create_Itinerary = asyncHandler(async (req, res) => {
    const { title, location, days, budget } = req.body;

    if (!title || !location || !days || !budget) {
        throw new ApiError(400, 'Missing required fields');
    }
    const newItinerary = await Itinerary.create({
        userId: req.user._id,
        title,
        location: location.toLowerCase(),
        days,
        permissions: [
            {
                userId: req.user._id,
                access: "owner"
            }
        ],
        budget
    });


    if (!newItinerary) {
        throw new ApiError(500, "Something went wrong while creating Itinerary!")
    }

    return res.status(201).json(
        new ApiResponse(
            200,
            newItinerary,
            "User registered Successfully"
        )
    )
});

const addHotel_to_Itinerary = asyncHandler(async (req, res) => {
    const { itineraryId, hotel } = req.body;
    const bannerLocalpath = req.file?.path;

    if (!bannerLocalpath) {
        throw new ApiError(400, 'Missing required fields');
    }

    const banner_hotel = await uploadOnCloudinary(bannerLocalpath);

    if (!banner_hotel.url) {
        throw new ApiError(400, "Error while uploading on avatar")

    }

    if (!itineraryId || !hotel) {
        throw new ApiError(400, 'Missing required fields');
    }
    const { name, description, startDate, endDate, costPerDay } = hotel;

    const newHotel = await Itinerary.findByIdAndUpdate(
        itineraryId,
        {
            $push: {
                hotels: {
                    name,
                    description,
                    startDate,
                    endDate,
                    costPerDay,
                    banner: banner_hotel.url
                }
            }
        }
    );
    if (!newHotel) {
        throw new ApiError(500, "Something went wrong while adding hotel!")
    }

    return res.status(201).json(
        new ApiResponse(
            200,
            {},
            "Hotel added Successfully"
        )
    )

});

const addDestination_to_Itinerary = asyncHandler(async (req, res) => {
    const { itineraryId, itinerary } = req.body;
    if (!itineraryId || !itinerary || !Array.isArray(itinerary)) {
        throw new ApiError(400, "Itinerary ID and an array of destinations are required.");
    }

    // Flatten the nested array (if itinerary is a 2D array)
    const destinations = itinerary.flat();


    const formattedDestinations = destinations.map(dest => {
        const {
            id,
            name,
            significance,
            city,
            state,
            type,
            Date,
            airportWithin50kmRadius,
            startTime,
            endTime,
            costPerDay,
            image_url
        } = dest;

        return {
            id,
            name,
            significance,
            city,
            state,
            type,
            Date,
            airportWithin50kmRadius,
            startTime,
            endTime,
            costPerDay,
            banner: image_url
        };
    });

    // Perform a bulk update
    const updatedItinerary = await Itinerary.findByIdAndUpdate(
        itineraryId,
        { $push: { destinations: formattedDestinations } }, // Set the entire destinations array
        { new: true, upsert: true } // Return the updated document and create if not exists
    );

    if (!updatedItinerary) {
        throw new ApiError(500, "Something went wrong while updating the itinerary!");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Destinations added successfully."
            )
        );

});

const updateDestinations_to_Itinerary = asyncHandler(async (req, res) => {
    const { itineraryId, itinerary } = req.body;
    if (!itineraryId || !itinerary || !Array.isArray(itinerary)) {
        throw new ApiError(400, "Itinerary ID and an array of destinations are required.");
    }

    // Flatten the nested array (if itinerary is a 2D array)
    const destinations = itinerary.flat();
    const formattedDestinations = destinations.map(dest => {
        const {
            id,
            name,
            significance,
            city,
            state,
            type,
            Date,
            airportWithin50kmRadius,
            startTime,
            endTime,
            costPerDay,
            image_url
        } = dest;

        return {
            id,
            name,
            significance,
            city,
            state,
            type,
            Date,
            airportWithin50kmRadius,
            startTime,
            endTime,
            costPerDay,
            banner: image_url
        };
    });

    // Perform a bulk update
    const updatedItinerary = await Itinerary.findByIdAndUpdate(
        itineraryId,
        { $set: { destinations: formattedDestinations } }, // Set the entire destinations array
        { new: true, upsert: true } // Return the updated document and create if not exists
    );

    if (!updatedItinerary) {
        throw new ApiError(500, "Something went wrong while updating the itinerary!");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Destinations updated successfully."
            )
        );
});

const getitinerary = asyncHandler(async (req, res) => {
    const { itineraryId } = req.params;

    if (!itineraryId) {
        throw new ApiError(400, "Itinerary ID is required.");
    }

    const itinerary = await Itinerary.findById(itineraryId)
        .select("-hotels -destinations");


    if (!itinerary) {
        throw new ApiError(404, "Itinerary not found.");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                itinerary,
                "Itinerary fetched successfully."
            )
        )
});

const getDestinations_by_itinerary = asyncHandler(async (req, res) => {
    const { itineraryId } = req.params;

    const itinerary = await Itinerary.findById(itineraryId).populate("destinations");
    if (!itinerary) {
        throw new ApiError(404, "Itinerary not found.");
    }

    const destinations = itinerary.destinations;
    const days = itinerary.Days;

    let formulate_destination = [];
    let idx = 0;


    for (let i = 0; i < days; i++) {
        let collections = [];

        for (let j = 0; j < 5 && idx < destinations.length; j++) {
            collections.push(destinations[idx]);
            idx++;
        }


        while (collections.length < 5) {
            collections.push({});
        }


        formulate_destination.push(collections);
    }


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                formulate_destination,
                "Destinations fetched successfully."
            )
        );

});

const getitinerary_by_user = asyncHandler(async (req, res) => {

    const itinerary = await Itinerary.find({ "userId": req?.user_id }).populate("destinations");
    if (!itinerary) {
        throw new ApiError(404, "Itinerary not found.");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                itinerary,
                "Itinerary fetched successfully."
            )
        )
});

const delete_Itinerary = asyncHandler(async (req, res) => {
    const { itineraryId } = req.params;

    if (!itineraryId) {
        throw new ApiError(400, "Itinerary ID is required.");
    }
    const itinerary = await Itinerary.findById(itineraryId);

    if (!itinerary) {
        throw new ApiError(404, "Itinerary not found.");
    }

    await Itinerary.findByIdAndDelete(itineraryId);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Itinerary deleted successfully."
            )
        )
});

const get_Status_of_User_Itinerary = asyncHandler(async (req, res) => {
    const { itineraryId, userId } = req.params;

    if (!itineraryId) {
        throw new ApiError(400, "Itinerary ID is required.");
    }

    const itinerary = await Itinerary.findById(itineraryId);

    if (!itinerary) {
        throw new ApiError(404, "Itinerary not found.");
    }

    const userAccess = itinerary.permissions?.find(
        (permission) => permission.userId.toString() === userId.toString()
    )?.access;

    if (!userAccess) {
        throw new ApiError(403, "User does not have permissions.");
    }


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                userAccess,
                "User status fetched successfully."
            )
        )

});

export {
    create_Itinerary,
    addHotel_to_Itinerary,
    addDestination_to_Itinerary,
    updateDestinations_to_Itinerary,
    getitinerary,
    getitinerary_by_user,
    getDestinations_by_itinerary,
    delete_Itinerary,
    get_Status_of_User_Itinerary
}
