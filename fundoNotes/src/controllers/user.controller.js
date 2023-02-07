import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';


export const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const userRegistration = async (req, res, next) => {
  try {
    const data = await UserService.userRegistration(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      message:data,
      message: 'User Registeration Done Successfully....'
    });
  } catch (error) {
    next(error);
  }
};

export const login =async(req,res,next) => {
  try
  {
    const data = await UserService.login(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data:data,
      message:'User login Done Successfully....'
    });
  } catch (error) {
    next(error);
  }
};

//Controller for forget password
export const pwdForget = async (req, res, next) => {
  try {
    const data = await UserService.pwdForget(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Email sent.'
    });
  } catch (error) {
    res.status(HttpStatus.NOT_FOUND).json({
      code: HttpStatus.NOT_FOUND,
      message: `Email not found`

    });
  }
};

//Controller for reset password
export const pwdReset = async (req, res, next) => {
  try
  {
    const data = await UserService.pwdReset(req.params.token, req.body);
    
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Password is Updated.'
    });

  } 
  catch (error)
  {
    next(error);
  }
};
