# NGINX Log Analytics API
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Notes:
> Developed and Tested on Windows machine
> Nginx takes some time to flush logs to log file, hit refresh or open access.log for immediate result

# Installation
 - git clone [repo_name_here]
 - npm install
 - Install NGINX server 
 - start nginx ( To start nginx server )
 
#### Start Services 
- With port : node index.js --port [port_num_here] --log C:\\\Users\\\paras.mathur\\\Downloads\\\nginx-1.16.0\\\logs\\\access.log
    Ex: node index.js --port 3002
- Without port :  node index.js --log C:\\\Users\\\paras.mathur\\\Downloads\\\nginx-1.16.0\\\logs\\\access.log
(Default Port - 3001)

API endpoint ( all with GET ) - 
  - /api/host-freq  - Endpoint to get top 10 frequenct vistor IPs and their count
  - /api/status-freq - Endpoint to frequency of different HTTPs values
  - /api/peak-hour - Endpoint to get the peak hour of traffic and corresponding count value
  - /api/byte-max - Endpoint to maximum bytes served in an hour and value of that hour