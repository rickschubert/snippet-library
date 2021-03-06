(function () {
    var key = location.pathname+location.search,

        //get previously stored [d]ata array or empty obj
        d = (function () {
            try {
                return JSON.parse(localStorage.getItem(key));
            } catch (e) {
                return null;
            }
        })() || {},

        //current [t]imings
        t = window.performance.timing,

        //basic stats functions (are there builtins?)
        mean = function(theArray)
        {
            var sum = 0, length = theArray.length;
    	    for(var i=0;i<length;i++) {
    	        sum += theArray[i];
    	    }
    	    return sum/length;
    	},
        stdev = function(theArray)
        {
    	    var arithmeticMean = mean(theArray);
            var sum = 0, length = theArray.length;
    	    for(var i=0;i<length;i++) {
    	        sum += Math.pow(theArray[i]-arithmeticMean, 2);
    	    }
    	    return Math.pow(sum/length, 0.5);
    	};

    /* to avoid saving timings of a single load twice
     * (running snipped more than once after pageload)
     * save all pageload start timings to an array
     * then always check this array before saving
     * to verify that current pageload's timings have not been saved
     */
    d.savedTimingsTimestamps = d.savedTimingsTimestamps || [];

    //See if current Load timestamp is not yet in array -> this pageload's timings havn't been saved
    if(d.savedTimingsTimestamps.indexOf(t.navigationStart) == -1)
    {
        //Add current Pageload timings as "saved"
        d.savedTimingsTimestamps.push(t.navigationStart);

        /* Calculate and set Timings
         * see also: https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/NavigationTiming/Overview.html#processing-model
         */
        d.browserToServerConnection = d.browserToServerConnection || [];
        d.browserToServerConnection.push(t.requestStart - t.navigationStart);

        d.serverFinishSendingResponse = d.serverFinishSendingResponse || [];
        d.serverFinishSendingResponse.push(t.responseEnd - t.requestStart);

        d.parsingDOM = d.parsingDOM || [];
        d.parsingDOM.push(t.domContentLoadedEventEnd - t.domLoading);

        d.loadingResources = d.loadingResources || [];
        d.loadingResources.push(t.loadEventStart - t.domLoading);

        d.jsOnloadEvent = d.jsOnloadEvent || [];
        d.jsOnloadEvent.push(t.loadEventEnd - t.loadEventStart);

        d.total = d.total || [];
        d.total.push(t.loadEventEnd - t.navigationStart);

        //Save all data with new datapoint to local storrage
        localStorage.setItem(key, JSON.stringify(d));
    }

    //Output data
    console.group('Performance Timings');
    console.info('Total of '+d.savedTimingsTimestamps.length+' timing(s)');
    console.table((function(data){
        var table=[];
        for(var timing in data)
        {
            table.push({
                'what':timing,
                'mean (ms)': Math.round(mean(data[timing])),
                'stdev (ms)': Math.round(stdev(data[timing]))
            });
        }
        return table;
    })(d));

    console.groupEnd('Performance Timings');
})();
