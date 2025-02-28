import express from 'express';
const router = express.Router();

import {allEvents, createEvent, deleteEvent, singleEvent, updateEvent, userEvents, registerForEvent, registrations} from '../controllers/eventControllers.js'
import upload from '../middlewares/upload.js';

router.get('/event/allevents', allEvents);

router.post('/event/find/:id', singleEvent);
router.post('/event/registrations/:id', registrations);
router.post('/event/register/:id', registerForEvent);
router.post('/event/user/events', userEvents);
router.post('/event/create', upload.single("image"), createEvent);

router.patch('/event/update/:id', upload.single("image"), updateEvent);

router.delete('/event/delete/:id', deleteEvent);

export default router;