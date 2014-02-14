FileReader.readAsBlob.js
========================

* only test on Chrome 32.0.1700.107

## Usage

```javascript

var file = $("input[type=file]")[0].files[0];
var reader = new FileReader();

reader.onload = function(e) {
  console.log(e.currentTarget.result);
}

reader.readAsBlob(file);

```

