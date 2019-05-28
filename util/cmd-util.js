module.exports = {

    getFilePath : function() {
        // checks for --log and if we have a value
        const logIndex = process.argv.indexOf('--log');
        let logValue;

        if (logIndex > -1) {
            // Grabs the value after --log
            logValue = process.argv[logIndex + 1];
        } else {
            console.error('Expected nginx log path argument --log');
            process.exit(1);
        }

        return logValue;
    
    },

    getPort : function() {
        // checks for --port and if we have a value
        const portIndex = process.argv.indexOf('--port');
        let portValue = 3001;

        if (portIndex > -1) {
            // Grabs the value after --port
            portValue = process.argv[portIndex + 1];
        }

        return portValue;
    }

}