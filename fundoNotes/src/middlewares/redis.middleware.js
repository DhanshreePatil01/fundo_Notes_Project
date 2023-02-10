import HttpStatus from 'http-status-codes';
import { client } from '../config/redis';

export const redisForGetall = async (req, res, next) => {

    const data = await client.get('AllNotes')
   const notes = JSON.parse(data);
  //  console.log('notes--------',notes)
    if (notes != null)
    {
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: notes,
            message: 'All the notes fetched from redis successfully...!!!'
        });
    } 
    else
    {
        next();
    }
}   

export const redisForGetOne = async (req, res, next) => {

    const data = await client.get('SingleNotes')
   const notes = JSON.parse(data);
  //  console.log('notes--------',notes)
    if (notes != null)
    {
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: notes,
            message: 'Single Note is fetched from redis successfully...!!!'
        });
    } 
    else
    {
        next();
    }
}   

