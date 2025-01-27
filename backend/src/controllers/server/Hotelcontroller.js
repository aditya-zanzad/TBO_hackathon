import axios from 'axios';
import { asyncHandler } from "../../utils/asyncHandler.js"; // Assuming asyncHandler is used for async functions
import { ApiError } from "../../utils/ApiError.js"; // Custom error handler
import { ApiResponse } from "../../utils/ApiResponse.js"; // Custom API response formatter

// Base URL for the API (TBO API in your case)
const BASE_URL = 'http://api.tbotechnology.in/TBOHolidays_HotelAPI'; // For Test API, change for live

// Search hotels
const searchHotel = asyncHandler(async (req, res) => {
    const { location, checkInDate, checkOutDate, guests } = req.body;  // Sample inputs
    if (!location || !checkInDate || !checkOutDate || !guests) {
        throw new ApiError(400, "Missing required fields: location, checkInDate, checkOutDate, and guests.");
    }

    try {
        const response = await axios.post(`${BASE_URL}/Search`, {
            location,
            checkInDate,
            checkOutDate,
            guests
        }, {
            headers: {
                'Authorization': `Basic ${Buffer.from('username:password').toString('base64')}`,  // Base64 encoded API credentials
                'Content-Type': 'application/json'
            }
        });

        const { data } = response;

        if (!data || data.length === 0) {
            throw new ApiError(404, "No hotels found.");
        }

        return res.status(200).json(new ApiResponse(200, data, "Hotels fetched successfully."));
    } catch (error) {
        throw new ApiError(500, "Error while searching hotels.");
    }
});

// Pre-booking
const preBookHotel = asyncHandler(async (req, res) => {
    const { hotelId, checkInDate, checkOutDate, guests, userId } = req.body; // Sample inputs
    if (!hotelId || !checkInDate || !checkOutDate || !guests || !userId) {
        throw new ApiError(400, "Missing required fields.");
    }

    try {
        const response = await axios.post(`${BASE_URL}/PreBook`, {
            hotelId,
            checkInDate,
            checkOutDate,
            guests,
            userId
        }, {
            headers: {
                'Authorization': `Basic ${Buffer.from('username:password').toString('base64')}`,  // Base64 encoded API credentials
                'Content-Type': 'application/json'
            }
        });

        const { data } = response;

        if (!data) {
            throw new ApiError(400, "Pre-booking failed.");
        }

        return res.status(200).json(new ApiResponse(200, data, "Pre-booking successful."));
    } catch (error) {
        throw new ApiError(500, "Error during pre-booking.");
    }
});

// Booking the hotel
const bookHotel = asyncHandler(async (req, res) => {
    const { hotelId, checkInDate, checkOutDate, guests, userId, paymentDetails } = req.body; // Sample inputs
    if (!hotelId || !checkInDate || !checkOutDate || !guests || !userId || !paymentDetails) {
        throw new ApiError(400, "Missing required fields.");
    }

    try {
        const response = await axios.post(`${BASE_URL}/Book`, {
            hotelId,
            checkInDate,
            checkOutDate,
            guests,
            userId,
            paymentDetails
        }, {
            headers: {
                'Authorization': `Basic ${Buffer.from('username:password').toString('base64')}`,  // Base64 encoded API credentials
                'Content-Type': 'application/json'
            }
        });

        const { data } = response;

        if (!data) {
            throw new ApiError(400, "Booking failed.");
        }

        return res.status(200).json(new ApiResponse(200, data, "Hotel booked successfully."));
    } catch (error) {
        throw new ApiError(500, "Error during booking.");
    }
});

export {
    searchHotel,
    preBookHotel,
    bookHotel
};
