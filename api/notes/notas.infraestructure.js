const sendRes = require("../assets/send.res");
const NoteModel = require("./notas.model");
const { ObjectId } = require("mongodb");

const getAllNotes = async (req, res) => {
  try {
    const notes = await NoteModel.find();
    return sendRes(res, 200, true, "crud_mess_0", notes);
  } catch (error) {
    return sendRes(res, 500, false, "mess_0", error.message);
  }
};

const getNoteByID = async (req, res) => {
  try {
    const note = await NoteModel.findOne(
      ObjectId.isValid(req.params.id)
        ? { _id: req.params.id }
        : { title: req.params.id }
    );

    if (!note) return sendRes(res, 500, false, "crud_mess_7", "");
    return sendRes(res, 200, true, "crud_mess_0", note);
  } catch (error) {
    return sendRes(res, 500, false, "mess_0", error.message);
  }
};

const saveNote = async (req, res) => {
  try {
    const { title, description } = req.body;

    const existingNote = await NoteModel.findOne({ title });
    if (existingNote) return sendRes(res, 500, false, "crud_mess_8", "");

    const note = new NoteModel({ title, description });
    await note.save();

    return sendRes(res, 200, true, "crud_mess_1", note._id);
  } catch (error) {
    return sendRes(res, 500, false, "mess_0", error.message);
  }
};

const editNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    const existingNote = await NoteModel.findOne({ _id: req.params.id });

    if (!existingNote) return sendRes(res, 500, false, "crud_mess_7", "");

    const updateNote = {
      title: title ?? existingNote.title,
      description: description ?? existingNote.description,
    };

    await NoteModel.updateOne({ _id: req.params.id }, { $set: updateNote });
    return sendRes(res, 200, true, "crud_mess_3", "");
  } catch (error) {
    return sendRes(res, 500, false, "mess_0", error.message);
  }
};

const deleteNote = async (req, res) => {
  try {
    const existingNote = await NoteModel.findOne({ _id: req.params.id });
    if (!existingNote) return sendRes(res, 500, false, "crud_mess_7", "");

    await NoteModel.deleteOne({ _id: req.params.id });
    return sendRes(res, 200, true, "crud_mess_5", "");
  } catch (error) {
    return sendRes(res, 500, false, "mess_0", error.message);
  }
};

module.exports = {
  getAllNotes,
  getNoteByID,
  saveNote,
  editNote,
  deleteNote,
};
