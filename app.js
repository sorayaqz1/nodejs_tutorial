function greet(callback) {
  console.log('Hello!');
  var data = {
    name: 'John'
  }
  callback(data);
}

greet(function(data) {
  console.log('The callback was invoked ');
  console.log(data.name);
});
