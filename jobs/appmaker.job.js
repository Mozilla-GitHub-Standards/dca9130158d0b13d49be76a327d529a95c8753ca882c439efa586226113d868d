var request = require('request');
var app_count = 0;

function updateAppCount() {
	var last_app_count = app_count;
	var counturl = "http://162.243.75.232/render?format=json&target=summarize(appmaker_counts.app_published,'10year')"
	request.get({url:counturl, json:true}, function (e, r, data) {
		// console.log("got appcount of", data[0]['datapoints'][0][0]);
		send_event('app_count', {current: data[0]['datapoints'][0][0],
			last: last_app_count});
	})
}

updateAppCount();
setInterval(function() {
	updateAppCount();
}, 5 * 60 * 1000); // 5 minutes
