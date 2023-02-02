import express from 'express';
import * as noteController from '../controllers/note.controller';
import { NoteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new note
router.post('', NoteValidator, userAuth, noteController.createNote);

//route to update a note by its id
router.put('/:_id', userAuth, noteController.updateNote);

//route to get all notes
router.get('/', userAuth, noteController.getAll)

//routes to get a note by id
router.get('/:_id', userAuth, noteController.getById)

//route to delete a note
router.delete('/:_id', userAuth, noteController.deleteNote)

// send note to trash by id
router.put('/:_id/trash', userAuth, noteController.addToTrash);

// recover from trash put
router.put('/:_id/trash/recover', userAuth, noteController.trashrecovery);

// Send to archive by id
router.put('/:_id/archive', userAuth, noteController.addToarchive);

// recover from trash put
router.put('/:_id/archive/recover', userAuth, noteController.recoverarchive);

export default router;