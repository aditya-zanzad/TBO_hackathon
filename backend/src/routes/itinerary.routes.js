import { Router } from "express";
import {
    create_Itinerary,
    addHotel_to_Itinerary,
    addDestination_to_Itinerary,
    updateDestinations_to_Itinerary,
    getitinerary,
    getitinerary_by_user,
    getDestinations_by_itinerary,
    delete_Itinerary,
    get_Status_of_User_Itinerary
} from "../controllers/server/itinerary.server.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const itineraryrouter = Router();

itineraryrouter.route('/create').post(verifyJWT, create_Itinerary);
itineraryrouter.route('/addHotel').post(verifyJWT, addHotel_to_Itinerary);
itineraryrouter.route('/addDestination').post(verifyJWT, addDestination_to_Itinerary);
itineraryrouter.route('/updateDestinations').patch(verifyJWT, updateDestinations_to_Itinerary);
itineraryrouter.route('/getitinerary/:itineraryId').get(verifyJWT, getitinerary)
itineraryrouter.route('/getitinerarybyuser').get(verifyJWT, getitinerary_by_user)
itineraryrouter.route('/delete').delete(verifyJWT, delete_Itinerary)
itineraryrouter.route("getDestinations_by_itinerary/:itineraryId").get(verifyJWT, getDestinations_by_itinerary)
itineraryrouter.route("getStatusofUserItinerary/:itineraryId/:userId").get(get_Status_of_User_Itinerary)



export default itineraryrouter