const mongoose = require("mongoose");
const user = require("../models/user");
const attendance = require('../models/attendance');
const { successResponse, errorResponse } = require("../utils");
const {Types} = require('mongoose')

let subject = "cn";

const oswPageView = async (req, res) => {
    try{
		let userId = req.user._id;
		subject = "osw";
    const data = await attendance.find({
      userId: userId,
      subject: subject,
    });
    if (Object.keys(data).length === 0) {
      const newRecord = new attendance({
        userId: userId,
        subject: subject,
        absent: [],
        present: [],
        holiday: [],
      });
      newRecord.save();
    }
		res.render("osw", { datas : data });
  }
  catch(error){
    	console.log(error.message);
  }
};

const dosPageView = async (req, res) => {
  try {
    let userId = req.user._id;
    subject = "dos";
    const data = await attendance.find({
      userId: userId,
      subject: subject,
    });
    if (Object.keys(data).length === 0) {
      const newRecord = new attendance({
        userId: userId,
        subject: subject,
        absent: [],
        present: [],
        holiday: [],
      });
      newRecord.save();
    }
    res.render("dos", { datas: data });
  } catch (error) {
    console.log(error.message);
  }
};

const tocPageView = async (req, res) => {
  try {
    let userId = req.user._id;
    subject = "toc";
    const data = await attendance.find({
      userId: userId,
      subject: subject,
    });
    if (Object.keys(data).length === 0) {
      const newRecord = new attendance({
        userId: userId,
        subject: subject,
        absent: [],
        present: [],
        holiday: [],
      });
      newRecord.save();
    }
    res.render("toc", { datas: data });
  } catch (error) {
    console.log(error.message);
  }
};

const cnPageView = async (req, res) => {
  try{
    subject = "cn";
    let userId = req.user._id;
        const data = await attendance.find({
          userId: Types.ObjectId(userId),
          subject: subject,
        });
        if (Object.keys(data).length === 0) {
          const newRecord = new attendance({
            userId: userId,
            subject: subject,
            absent: [],
            present: [],
            holiday: [],
          });
          newRecord.save();
        }
      res.render("cn", { datas: data });
  }
  catch(error){
    console.log(error.message);
  }
};

const ppPageView = async (req, res) => {
	try {
		subject = "pp";
		let userId = req.user._id;
        const data = await attendance.find({
          userId: Types.ObjectId(userId),
          subject: subject,
        });
        if (Object.keys(data).length === 0) {
          const newRecord = new attendance({
            userId: userId,
            subject: subject,
            absent: [],
            present: [],
            holiday: [],
          });
          newRecord.save();
        }
      res.render("pp", { datas: data });
  } catch (error) {
    console.log(error.message);
  }
};

const admPageView = async (req, res) => {
try {
  subject = "adm";
  let userId = req.user._id;
        const data = await attendance.find({
          userId: Types.ObjectId(userId),
          subject: subject,
        });
        if (Object.keys(data).length === 0) {
          const newRecord = new attendance({
            userId: userId,
            subject: subject,
            absent: [],
            present: [],
            holiday: [],
          });
          newRecord.save();
        }
      res.render("adm", { datas: data });
} catch (error){
  console.log(error.message);
}
};

const statusChange = async (req, res) => {
  try{
    let userId = req.user._id;
    let dateId = req.params.id;
	let absent = [];
	let present = [];
	let holiday= [];

	const info = await attendance.findOne({ userId: userId, subject: subject });
	let id = info._id;
	absent = info.absent;
	present = info.present;
	holiday = info.holiday;

	if (present.includes(dateId)===false && absent.includes(dateId)===false && holiday.includes(dateId)===false) {
  	  	present.push(dateId);
  	} else if (present.includes(dateId)) {
		let index = present.indexOf(dateId);
    	present.splice(index, 1);
 		absent.push(dateId);
	} else if (absent.includes(dateId)) {
		let index = absent.indexOf(dateId);
    	absent.splice(index, 1);
 		holiday.push(dateId);
	} else if (holiday.includes(dateId)) {
		let index = holiday.indexOf(dateId);
        holiday.splice(index, 1);
	}

	const statusInfo = await attendance.findByIdAndUpdate(
    { _id: id },
    {
      present: present,
      absent: absent,
      holiday: holiday,
    }
  );
  const data = await attendance.find({
    userId: userId,
    subject: subject,
  });
    res.render(subject, { datas: data });
  } catch (error){
    console.log(error.message);
  }
};

module.exports = {
  cnPageView,
  admPageView,
  oswPageView,
  dosPageView,
  tocPageView,
  ppPageView,
  statusChange,
};