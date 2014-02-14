


;(function(){

  var dataURLToBlob = function(data_url) {
    try {
      var type = data_url.split(';')[0].split(':')[1];
      var base64 = data_url.split(',')[1];
      var raw = window.atob(base64);
      var uarr = new Uint8Array(raw.length);

      for(var i=0; i<raw.length; ++i) {
        uarr[i] = raw.charCodeAt(i);
      }

      return new Blob([uarr], {type: type});
    } catch (error) {
      return new Blob();
    }
  };

  var isFunction = function(func) {
    return func && new Object().toString.call(func)==="[object Function]"
  }

  var NativeFileReader = window.FileReader;

  if( isFunction(NativeFileReader) && 
      isFunction(new NativeFileReader().readAsDataURL) ) {

    NativeFileReader.prototype.readAsBlob = function(file) {
      var self = this;
      var file_reader = new NativeFileReader();
      var events = ["onabort", "onerror", "onload", "onloadend", "onloadstart", "onprogress"];

      self.__defineGetter__("result", function(){ return dataURLToBlob(file_reader.result)});
      self.__defineGetter__("readyState", function() { return file_reader.readyState});

      events.forEach(function(event_name){
        file_reader[event_name] = function(e) {
          if(isFunction(self[event_name])) {
            e.__defineGetter__("currentTarget", function(){ return self; });
            self[event_name].call(self, e);
          }
        }
      });

      file_reader.readAsDataURL(file);

    }

    //window.FileReader = NativeFileReader;
  }

})(window);