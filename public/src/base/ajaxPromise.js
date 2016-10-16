/**
 * Created by sunkj on 9/11/2016.
 */

// 所有模块都通过 define 来定义
define(function(require, exports, module) {

  // 通过 require 引入依赖
  require('jquery');
  require('json');
  require('q');

  var setHeaders = function(request,header){
    for(var key in header){
      request.setRequestHeader(key, header[key]);
    }
  };

  module.exports = {
    post: function (url,json,header){
      return Q(
        $.ajax(
          {
            'url': url,
            'type': 'post',
            'contentType': "application/json",
            'dataType': 'json',
            'data': JSON.stringify(json),
            beforeSend: function(request) {
              setHeaders(request,header);
            }
          }
        )
      );
    },
    get: function(url,header){
      return Q(
        $.ajax(
          {
            'url': url,
            'type': 'get',
            'contentType': "application/json",
            'dataType': 'json',
            beforeSend: function(request) {
              setHeaders(request,header);
            }
          }
        )
      );
    },
    delete: function(url,header){
      return Q(
        $.ajax(
          {
            'url': url,
            'type': 'delete',
            'contentType': "application/json",
            'dataType': 'json',
            'data': JSON.stringify(json),
            beforeSend: function(request) {
              setHeaders(request,header);
            }
          }
        )
      );
    },
    put: function(url,json,header){
      return Q(
        $.ajax(
          {
            'url': url,
            'type': 'put',
            'contentType': "application/json",
            'dataType': 'json',
            'data': JSON.stringify(json),
            beforeSend: function(request) {
              setHeaders(request,header);
            }
          }
        )
      );
    }
  };

});
