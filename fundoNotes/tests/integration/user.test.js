import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

let token='';

describe('------Testing For User API-----', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('User Registration ', () => {

    it('ValidUserDetailsAreGivenItShouldBeSaveInDatabase', (done) => {
      const inputBody = {
        "firstname": "Dhanshree",
        "lastname": "Patil",
        "email": "dhanss@gmail.com",
        "password": "dhanshree"
      }
      request(app)
        .post('/api/v1/users/')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });


    it('InvalidFirstnameIsGivenItShouldThrowAnError', (done) => {
      const inputBody = {
        "firstname": "ddd",
        "lastname": "maneg",
        "email": "dhanu@gmail.com",
        "password": "dhanshree2000"
      }
      request(app)
        .post('/api/v1/users/')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });


    it('InvalidLastnameIsGivenItShouldThrowAnError', (done) => {
      const inputBody = {
        "firstname": "Dhanshree",
        "lastname": "pat",
        "email": "dhanshree@gmail.com",
        "password": "dhanshree123"
      }
      request(app)
        .post('/api/v1/users/')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });

    it('InvalidEmailIsGivenItShouldThrowAnError', (done) => {
      const inputBody = {
        "firstname": "dhanshree",
        "lastname": "patil",
        "email": "dhanshree@.com",
        "password": "dhanshree"
      }
      request(app)
        .post('/api/v1/users/')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });


    it('InvalidPasswordIsGivenItShouldThrowAnError', (done) => {
      const inputBody = {
        "firstname": "dhanshree",
        "lastname": "patil",
        "email": "dhanshree@gmail.com",
        "password": 1234
      }
      request(app)
        .post('/api/v1/users/')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  describe('User Login', async () => {

    it('ValidUserLoginDetailsAreGivenItShouldLogInSuccessfully.', (done) => {
      const inputBody = {
        "email": "dhanss@gmail.com",
        "password": "dhanshree"
      }
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          token = res.body.data
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });

    it('InvalidEmailIsGivenItShouldThrowAnError', (done) => {
      const inputBody = {
        "email": "dhanshree@.com",
        "password": "dhanshree"
      }
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });

    it('InvalidPasswordIsGivenItShouldThrowAnError', (done) => {
      const inputBody = {
        "email": "dhanshree@gmail.com",
        "password": 123456
      }
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  
  var id;
describe('Create Note', () => {
  const inputBody={
    "title":"First Note",
    "description":"Hello Dhanshree",
  }
  it('NoteCreatedSucessfully', (done) => {
    request(app)
      .post('/api/v1/notes')
      .set('Authorization', `Bearer ${token}`)
      .send(inputBody)
      .end((err, res) => {
        id = res.body.data._id;
       expect(res.statusCode).to.be.equal(201);
        done();
      });
    });
  });
		
  describe('creating new note without Description',()=>{
    const inputBody={
      "title":"Second Note"
    }
    it('DescriptionShouldBeRequired',(done)=>{
      request(app)
      .post('/api/v1/notes')
      .set('Authorization',`Bearer ${token}`)
      .send(inputBody)
      .end((err,res)=>{
        expect(res.statusCode).to.be.equal(500);
        done();
      });
    });
  });

  describe('creating new note without Title',()=>{
    const inputBody={
      "description":"Final Note"
    }
    it('TitleShouldBeRequired',(done)=>{
      request(app)
      .post('/api/v1/notes')
      .set('Authorization',`Bearer ${token}`)
      .send(inputBody)
      .end((err,res)=>{
        expect(res.statusCode).to.be.equal(500);
        done();
      });
    });
  });

  describe('Get All notes of the user',()=>{
    it('AllNotesFetchedSuccessfully',(done)=>{
      request(app)
      .get('/api/v1/notes/')
      .set('Authorization',`Bearer ${token}`)
      .end((err,res)=>{
        //console.log(res.body);
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
  });

  describe('Get note by id',()=>{
    it('NoteWithParticularIdIsFetchedSuccessfully',(done)=>{
      request(app)
      .get(`/api/v1/notes/${id}`)
      .set('Authorization',`Bearer ${token}`)
      .end((err,res)=>{
        expect(res.statusCode).to.be.equal(202);
        done();
      });
    });
  });

  describe('Update The Note',()=>{
    const inputBody={
      "title":"Welcome all",
      "description" : "Good Day"
    }
    it('NoteUpdatedSuccessfully',(done)=>{
      request(app)
      .put(`/api/v1/notes/${id}`)
      .set('Authorization',`Bearer ${token}`)
      .send(inputBody)
      .end((err,res)=>{
       expect(res.statusCode).to.be.equal(202);
        done();
      });
    });
  });
     
  describe('Delete note by id', () => {
    it('GivenNoteShouldBeDeletedFromDatabaseById', (done) => {
       request(app)
        .delete(`/api/v1/notes/${id}`)
        .set('authorization',`Bearer ${token}`)
       .end((err, res) => {
        console.log(res.body);
        expect(res.statusCode).to.be.equal(202);
        done();
      });
    });
  });

});


