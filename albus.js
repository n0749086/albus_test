function drawBarChart(labels, data) {
    // 4)chart.jsで描画
    var ctx = document.getElementById("albus_weight").getContext("2d");
    var myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
		labels: labels,
		datasets: [ {
			label: "体重(kg)", 
			data: data, 
			backgroundColor: 'rgba(60, 160, 220, 0.3)',
			borderColor: 'rgba(60, 160, 220, 0.8)',
			fill: true
		    },
		],
	    },
	    options: {
		scales: {
		    yAxes: [{
			    type: 'linear',
			    ticks: {
				beginAtZero: true,
				max: 6.0
			    }
			}]
		},
	    }
    });
}

// 【main-script】 スプレッドシート内の記述をjsonデータとして読み込み html 内へ入れ込む
function getJsonp_GAS() {
	$.ajax({
		type: 'GET',
		url: 'https://script.google.com/macros/s/AKfycbxtd8R0qkp6rfByKkMhCOcLbNqv5A5IYuJhx7DzgRe1_mhe3cY/exec',
		dataType: 'jsonp',
		jsonpCallback: 'jsondata',
		success: function(json){
            var len = json.length;
            var label = [];
            var weight = [];
			for(var i=0; i < len; i++){
                format_str = "MM/DD";
                var date = new Date(json[i].date);
                format_str = format_str.replace(/MM/g, 1 + date.getMonth());
                format_str = format_str.replace(/DD/g, date.getDate());
                label.push(format_str);
                weight.push(json[i].weight);
            }
            drawBarChart(label, weight);
		}
	});
}

// thx! > https://www.koreyome.com/web/make-spreadsheet-to-json-at-google-apps-script/
