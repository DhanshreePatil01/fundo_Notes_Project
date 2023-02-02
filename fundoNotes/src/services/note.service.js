//import { id } from '@hapi/joi/lib/base';
import Note from '../models/note.model';


export const createNote = async (body) => {
  const note = await Note.create(body);
  return note;
}

export const updateNote = async (_id, body) => {
  const data = await Note.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

export const getAll= async (userId)=>{
  const data = await Note.find({userId : userId, archive : false , trash : false});
  //console.log("user data-----------------------",data);
  return data;
};

export const getById = async (_id,userId) => {
  const data = await Note.findById(_id,userId);
  return data;
};

//delete single note
export const deleteNote = async (id) => {
    await Note.findByIdAndDelete(id);
    return '';
  };

  //using callback
export const addToTrash = (_id, userId, callback) =>
{
 Note.findByIdAndUpdate({ _id, userId: userId }, { trash: true }, { new: true }, (err, data) => {
   if (err) return callback(err);
   return callback(null, data);
 });
};

//Using callback function
export const recoverFromTrash = (_id, userId, callback) => {
 Note.findByIdAndUpdate({ _id, userId: userId }, { trash: false }, { new: true }, (err, data) => {
     if (err) {
         return callback(err);
     }
     return callback(null, data);
 });
};