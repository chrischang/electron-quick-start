// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
  const MINUTE_IN_SECS = 60;
  const HOUR = 60 * 60;
  const HOUR_IN_MILLIS = HOUR * 1000;
  const TimePeriod = {
    OneMinute: MINUTE_IN_SECS,
    FiveMinutes: 5 * MINUTE_IN_SECS,
    OneHour: 60 * MINUTE_IN_SECS
  }
  const TimeRange = {
    OneHour: HOUR_IN_MILLIS,
    SixHours: 6 * HOUR_IN_MILLIS,
    OneDay: 24 * HOUR_IN_MILLIS
}
const AWS = require('aws-sdk');
const cloudwatch = new AWS.CloudWatch({
    region: 'us-east-1',
    accessKeyId: process.env.ACCESS,
    secretAccessKey: process.env.SECRET
});

cloudwatch.listMetrics({
    Namespace: 'AWS/Kinesis',
    Dimensions: [
        {
            Name: 'StreamName',
            Value: 'all-hand-demo'
        }
    ]
}, function(err, data) {
    console.log(err);
    console.log(data);
});

cloudwatch.getMetricStatistics({
    Namespace: 'AWS/Kinesis',
    Dimensions: [
        {
            Name: 'StreamName',
            Value: 'all-hand-demo'
        }
    ],
    MetricName: 'IncomingRecords',
    StartTime: new Date((new Date().getTime() - TimeRange.OneDay)).toISOString(),
    EndTime: new Date().getTime().toISOString(),
    Period: 60
}, function(err, data) {
    console.log(err);
    console.log(data);
});

var ctx = document.getElementById("myChart").getContext('2d');

function graph (ctx) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}

var myChart = new graph(ctx);

