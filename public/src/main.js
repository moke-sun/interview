/**
 * Created by sunkj on 10/14/2016.
 */

var Q     = require("q");
var JSON  = require('json');
var _     = require("underscore");
require("jquery");


$(function(){

  $('.skill-list li a').on('mouseover',function(){
    $(this).addClass('stop');
  });
  $('.skill-list li a').on('mouseout',function(){
    $(this).removeClass('stop');
  });

  var rang = function(start, end){
    var f = end - start;
    var num = Math.random()*f + start;
    num = parseInt(num, 10);
    return num;
  };

  var moveBage = function(){
    $('.skill-list li a').not('.stop').each(function(i){
      $(this).animate({"top":rang(0,80),"left":rang(0,100)},3000);
    });
    setTimeout(function(){
      moveBage();
    }, 3000);
  };

  moveBage();

});