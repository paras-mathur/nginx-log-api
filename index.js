// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const LogService = require('./LogService');
const CmdUtil = require('./util/cmd-util');
const Tail = require('tail').Tail;

const logService = new LogService().getInstance();
const ApiController = require('./ApiController');

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', (req, res) => {
  res.send("Hello");
});

app.use('/api', ApiController);

const port = CmdUtil.getPort();
//var filePath = CmdUtil.getFilePath();

// starting the server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
  try {
    tail = new Tail("C:\\Users\\paras.mathur\\Downloads\\nginx-1.16.0\\logs\\access.log");
    //tail = new Tail(filePath); 
    tail.on("line", function(data) {
      console.log(data);
      logService.processLog(data);
    });
    
    tail.on("error", function(error) {
      console.log('ERROR: ', error);
    });
  } catch (error) {
    console.error("file path is incorrect");
    console.error("EXITING NOW ...");
    process.exit(1);
  }

});

