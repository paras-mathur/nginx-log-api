const source = '$http_client_ip $remote_addr - [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent" "$upstream_response_time" $request_time $host $upstream_status $upstream_addr $http_deviceType $http_productId $http_appVersion $http_market';
const parser = require("nginx-log-parser")(source);

// Log Service 
class LogService {

	constructor() {
		this.hostCountMap = [];
		this.statusCountMap = {};
		this.hourReqCountMap = [];
		this.hourByteCountMap = [];
	}

	processLog(log) {
		var logJSON = parser(log);
		
		// Host Count Map goes here --
		if( this.hostCountMap[logJSON.http_client_ip] == undefined ) {
			this.hostCountMap[logJSON.http_client_ip] = 1;
		} else{
			this.hostCountMap[logJSON.http_client_ip] = this.hostCountMap[logJSON.http_client_ip] + 1;
		}

		// Status Map goes here -- 
		console.log('Status - ' + logJSON.status);
		if( this.statusCountMap[logJSON.status] == undefined ) {
			this.statusCountMap[logJSON.status] = 1;
			console.log("HERE-1");
		} else {
			this.statusCountMap[logJSON.status] = this.statusCountMap[logJSON.status] + 1;
			console.log("HERE-2");
		}

		// Hour and traffic served --
		console.log(logJSON);
		console.log('1 - ' + logJSON.time_local);
		console.log('1 - ' + logJSON.time_local.split(":"));
		console.log('1 - ' + logJSON.time_local.split(":")[1]);
		var hour = parseInt(logJSON.time_local.split(":")[1]); // parseInt to convert 03 to 3
		console.log('hr * ' + hour);
		if( this.hourReqCountMap[hour] == undefined ) {
			this.hourReqCountMap[hour] = 1;
			console.log('hr - 1');
		} else {
			this.hourReqCountMap[hour] = this.hourReqCountMap[hour] + 1;
			console.log('hr - 2');
		}

		// Hour and Bytes served --
		var bytes = logJSON.body_bytes_sent;
		if( this.hourByteCountMap[hour] == undefined ) {
			this.hourByteCountMap[hour] = parseInt(bytes);
		} else {
			this.hourByteCountMap[hour] = this.hourByteCountMap[hour] + parseInt(bytes);
		}

	}

	freqList() {
		var hostArray = Object.keys(this.hostCountMap);
		var sortedArray = hostArray.sort(this.compareReqFrequency).slice(0,10); // Triming the size to 10;
		var result = {};

		for (var i = 0; i < sortedArray.length; i++) {
			result[sortedArray[i]] = this.hostCountMap[sortedArray[i]];
		}
		
		return result;
	}

	statusFreqList() {
		return this.statusCountMap;
	}

	compareReqFrequency(a, b) {
		return this.hostCountMap[b] - this.hostCountMap[a];
	}

	getMaxTrafficHour() {
		var array = this.hourReqCountMap;
		var max = -1;
		var result = [];
		var resultJSON = {};
		console.log(array);

		for(var i=0; i<array.length; i++){
			if (array[i] != undefined){
				if(array[i] == max){
					result.push(i);
				}	else if(array[i] > max){
					max = array[i];
					result = [];
					result.push(i);
				}
			} 
		}

		resultJSON.count = max;
		resultJSON.hour  = JSON.stringify(result);

		return resultJSON;

	}

	getMaxBytesHour() {
		var array = this.hourByteCountMap;
		var max = -1;
		var result = [];
		var resultJSON = {};

		for(var i=0; i<array.length; i++){
			if (array[i] != undefined){
				if(array[i] == max){
					result.push(i);
				}	else if(array[i] > max){
					max = array[i];
					result = [];
					result.push(i);
				}
			} 
		}

		resultJSON.bytes = max;
		resultJSON.hour  = JSON.stringify(result);

		return resultJSON;

	}

}

class Singleton {

	constructor() {
		if (!Singleton.instance) {
			Singleton.instance = new LogService();
		}
	}
  
	getInstance() {
		return Singleton.instance;
	}
  
  }
  
module.exports = Singleton;