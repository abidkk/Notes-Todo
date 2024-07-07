const Note = require('../models/notesModel');

const { Types } = require('mongoose');
exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createNote = async (req, res) => {
    const note = new Note({
        description: req.body.description,
        refrence: req.body.refrence,
        category: req.body.category
    });
    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a note by ID
exports.updateNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        if (!Types.ObjectId.isValid(noteId)) {
            return res.status(400).json({ message: 'Invalid Note id' });
        }

        const updates = await {
            description: req.body.description,
            refrence: req.body.refrence,
            category: req.body.category
        };

        // Find note by ID and update it
        const updatedNote = await Note.findByIdAndUpdate(noteId, updates, { new: true });

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json(updatedNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// Delete a note by ID
exports.deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id; // Fetching 'id' from URL params
        
        if (!Types.ObjectId.isValid(noteId)) {
            return res.status(400).json({ message: 'Invalid Note id' });
        }

        const deletedNote = await Note.findByIdAndDelete(noteId);

        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json({ message: 'Note deleted successfully', deletedNote });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting note', error: err.message });
    }
};

