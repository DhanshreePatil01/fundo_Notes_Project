//import { id } from '@hapi/joi/lib/base';
import Note from '../models/note.model';
import { client } from '../config/redis';

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
  await client.set('AllNotes',JSON.stringify(data));
  return data;
};

export const getById = async (_id,userId) => {
  const data = await Note.findById(_id,userId);
  await client.set('SingleNotes',JSON.stringify(data));
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

//using callback function
export const addToArchive = (_id, userId, callback) =>
{
  Note.findByIdAndUpdate({ _id, userId: userId }, { archive: true }, { new: true }, (error, data) => {
    if (error)
    {
      callback(error,null);
    } 
    else
    {
      callback(null,data);
    }
  });
};

//Using Callback function
export const recoverFromArchive = (_id, userId, callback) =>
 {
  Note.findByIdAndUpdate({ _id, userId: userId }, { archive: false }, { new: true }, (error, data) => {
    if (error)
    {
      callback(error,null);
    } else
    {
      callback(null, data);
    }
  });
};
