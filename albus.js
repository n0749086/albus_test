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

function format_label(date) {
	format_str = "MM/DD";
	format_str = format_str.replace(/MM/g, 1 + date.getMonth());
	format_str = format_str.replace(/DD/g, date.getDate());
	return format_str;
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
                label.push(format_label(new Date(json[i].date)));
                weight.push(json[i].weight);
            }
            drawBarChart(label, weight);
		}
	});
}

function sendData_GAS(date, weight) {
    var sendData = "date=" + date + "&weight="+weight;
        
    $.ajax({
        type: "POST",
        crossDomain: true,
        url: "https://script.google.com/macros/s/AKfycbxtd8R0qkp6rfByKkMhCOcLbNqv5A5IYuJhx7DzgRe1_mhe3cY/exec",
        data: sendData,
        success: function(msg){
            return false;               // 遷移無効化
        }
    });
}
