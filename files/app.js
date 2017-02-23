var fs = require('fs');
var zlib = require('zlib');

//__dirname path of the current file location
var greet = fs.readFileSync(__dirname + '/greet.txt', 'utf8');
// console.log('---' +__dirname + '/greet.txt');
console.log(greet);

var greet1 = fs.readFile(__dirname + '/greet.txt', 'utf8',
function(err, data) {
  console.log(data);
});

console.log(greet1);
console.log('Done!');

// if buffer is smaller than the file stream, will give in chunk, as param passed in function
var readable = fs.createReadStream(__dirname + '/greet.txt',
        {encoding: 'utf8', highWaterMark: 32 * 1024}); // read 32kb each chunk

var writable = fs.createWriteStream(__dirname + '/greetcopy.txt');

readable.on('data', function(chunk) { // data reading in chunk if file is larger than buffer
  console.log(chunk.length);
  writable.write(chunk);
});

readable.pipe(writable);

var compressed = fs.createWriteStream(__dirname + '/greetq.txt.gz');
var gzip = zlib.createGzip(); // create zip file as stream
readable.pipe(gzip).pipe(compressed); // write file to zip
