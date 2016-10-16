/**
 * Created by sunkj on 8/14/2015.
 */
var mongoose = require('mongoose');

var homerSchema = mongoose.Schema({
  Id:{type:Number,default:null},
  BranchStore:{type:String,default:true},
  Mobilephone: {type:String,default:null},
  Name: {type:String,default:null},
  Age:{type:Number,default:null},
  Zodiac:{type:String,default:null},
  Picture:{type:String,default:null},
  Number:{type:String,default:null},
  Sex:{type:String,default:null},
  ServiceType:{type:String,default:null},
  JobStatus: {type:String,default:null},
  ExactAddress:{type:String,default:null},
  Hometown: {type:String,default:null},
  EducationalLevel:{type:String,default:null},
  HealthCheck:{type:String,default:null},
  Certificates:{type:String,default:null},
  Salary:{type:String,default:null},
  StatusId:{type:String,default:null},
  InterviewContent:{type:String,default:null},
  ModifyDate:{type:String,default:null},
  LoginDt:{type:String,default:null},
  isDelete:{type:Boolean,default:false},
  updateDate:{type:Date,default:Date.now()},
  createDate:{type:Date,default:Date.now()}
});

module.exports = mongoose.model('Homer',homerSchema);
