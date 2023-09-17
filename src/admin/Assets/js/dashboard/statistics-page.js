

(function($) {
    /* "use strict" */
	
 var dlabChartlist = function(){
	
	var screenWidth = $(window).width();
	
	
	var pieChart3 = function(){
		 var options = {
          series: [90, 68, 85],
          chart: {
          type: 'donut',
		  height:230
        },
		dataLabels:{
			enabled: false
		},
		stroke: {
          width: 0,
        },
		colors:['#F6AD2E', 'var(--primary)', '#412EFF'],
		legend: {
              position: 'bottom',
			  show:false
            },
        responsive: [{
          breakpoint: 768,
          options: {
           chart: {
			  height:200
			},
          }
        }]
        };

        var chart = new ApexCharts(document.querySelector("#pieChart3"), options);
        chart.render();
    
	}
	var chartBar = function(){
		
		var options = {
			  series: [
				{
					name: 'Net Profit',
					data: [15, 55, 90, 80, 25, 15, 70],
					//radius: 12,	
				}, 
				{
				  name: 'Revenue',
				  data: [60, 65, 15, 35, 30, 5, 40]
				}, 
				
			],
				chart: {
				type: 'bar',
				height: 230,
				
				toolbar: {
					show: false,
				},
				
			},
			plotOptions: {
			  bar: {
				horizontal: false,
				columnWidth: '25%',
				endingShape: 'rounded'
			  },
			},
			colors:['#01111C', 'var(--primary)'],
			dataLabels: {
			  enabled: false,
			},
			markers: {
			shape: "circle",
			},
		
		
			legend: {
				show: false,
				fontSize: '12px',
				labels: {
					colors: '#000000',
					
					},
				markers: {
				width: 18,
				height: 18,
				strokeWidth: 0,
				strokeColor: '#fff',
				fillColors: undefined,
				radius: 12,	
				}
			},
			stroke: {
			  show: true,
			  width: 1,
			  colors: ['transparent']
			},
			
			x:{
			
			  categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			  grid: {
						color: "rgba(233,236,255,0.5)",
						drawBorder: true
					},
			  labels: {
			   style: {
				  colors: '#787878',
				  fontSize: '13px',
				  fontFamily: 'poppins',
				  fontWeight: 100,
				  cssClass: 'apexcharts-xaxis-label',
				},
			  },
			  crosshairs: {
				show: false,
			  }
			},
			y:{
				
				labels: {
				   style: {
					  colors: '#787878',
					  fontSize: '13px',
					   fontFamily: 'poppins',
					  fontWeight: 100,
					  cssClass: 'apexcharts-xaxis-label',
				  },
				},
			},
			fill: {
			  opacity: 1
			},
			tooltip: {
			  y: {
				formatter: function (val) {
				  return "$ " + val + " thousands"
				}
			  }
			}
			};

			var chartBar1 = new ApexCharts(document.querySelector("#chartBar"), options);
			chartBar1.render();
	}
	var activityChart = function(){
		var activity = document.getElementById("activity");
			if (activity !== null) {
				var activityData = [{
						first: [ 30, 35, 30, 50, 30, 50, 40, 45],
						second: [ 20, 25, 20, 15, 25, 22, 24, 20],
						third: [ 20, 21, 22, 21, 22, 15, 17, 20]
					},
					{
						first: [ 35, 35, 40, 30, 38, 40, 50, 38],
						second: [ 30, 20, 35, 20, 25, 30, 25, 20],
						third: [ 35, 40, 40, 30, 38, 50, 42, 32]
					},
					{
						first: [ 35, 40, 40, 30, 38, 32, 42, 32],
						second: [ 20, 25, 35, 25, 22, 21, 21, 38],
						third: [ 30, 35, 40, 30, 38, 50, 42, 32]
					},
					{
						first: [ 35, 40, 30, 38, 32, 42, 30, 35],
						second: [ 25, 30, 35, 25, 20, 22, 25, 38],
						third: [ 35, 35, 40, 30, 38, 40, 30, 38]
					}
				];
				activity.height = 300;
				
				var config = {
					type: "line",
					data: {
						labels: [
							"Mar",
							"Apr",
							"May",
							"June",
							"Jul",
							"Aug",
							"Sep",
							"Oct",
						],
						datasets: [{
								label: "Active",
								backgroundColor: "rgba(82, 177, 65, 0)",
								borderColor: "#3FC55E",
								data: activityData[0].first,
								borderWidth: 6,
								tension: 0.5,
							},
							{
								label: "Inactive",
								backgroundColor: 'rgba(255, 142, 38, 0)',
								borderColor: "#4955FA",
								data: activityData[0].second,
								borderWidth: 6,
								tension: 0.5,
							},
							{
								label: "Inactive",
								backgroundColor: 'rgba(255, 142, 38, 0)',
								borderColor: "#F04949",
								data: activityData[0].third,
								borderWidth: 6,
								tension: 0.5,
							} 
						]
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						elements: {
								point:{
									radius: 0
								}
						},
						plugins:{
							legend: false,
						},
						
						scales: {
							y: {
								grid: {
									color: "rgba(233,236,255,0.5)",
									drawBorder: true
								},
								ticks: {
									fontSize: 14,
									fontColor: "#6E6E6E",
									fontFamily: "Poppins"
								},
							},
							x: {
								//FontSize: 40,
								grid: {
									display: false,
									zeroLineColor: "transparent"
								},
								ticks: {
									fontSize: 14,
									stepSize: 5,
									fontColor: "#6E6E6E",
									fontFamily: "Poppins"
								}
							}
						},
						tooltips: {
							enabled: false,
							mode: "index",
							intersect: false,
							titleFontColor: "#888",
							bodyFontColor: "#555",
							titleFontSize: 12,
							bodyFontSize: 15,
							backgroundColor: "rgba(256,256,256,0.95)",
							displayColors: true,
							xPadding: 10,
							yPadding: 7,
							borderColor: "rgba(220, 220, 220, 0.9)",
							borderWidth: 2,
							caretSize: 6,
							caretPadding: 10
						}
					}
				};

				var ctx = document.getElementById("activity").getContext("2d");
				var myLine = new Chart(ctx, config);

				var items = document.querySelectorAll("#user-activity .nav-tabs .nav-item");
				items.forEach(function(item, index) {
					item.addEventListener("click", function() {
						config.data.datasets[0].data = activityData[index].first;
						config.data.datasets[1].data = activityData[index].second;
						config.data.datasets[2].data = activityData[index].third;
						myLine.update();
					});
				});
			}
	
		
	}
	var activityBar1 = function(){
		var activity1 = document.getElementById("activity1");
		if (activity1 !== null) {
			var activity1Data = [{
					first: [35, 18, 15, 35, 40, 20, 30, 25, 22, 20, 45, 35, 35]
				},
				{
					first: [50, 35, 10, 45, 40, 50, 60, 35, 10, 50, 34, 35, 50]
				},
				{
					first: [20, 35, 60, 45, 40, 35, 30, 35, 10, 40, 60, 20, 20]
				},
				{
					first: [25, 88, 25, 50, 21, 42, 60, 33, 50, 60, 50, 20, 25]
				}
			];
			activity1.height = 320;
			
			var config = {
				type: "bar",
				data: {
					labels: [
						"01",
						"02",
						"03",
						"04",
						"05",
						"06",
						"07",
						"08",
						"09",
						"10",
						"11",
						"12",
						"13"
					],
					datasets: [
						{
							label: "My First dataset",
							data:  [35, 18, 15, 35, 40, 20, 30, 25, 22, 20, 45, 35, 35],
							borderColor: 'rgba(47, 76, 221, 1)',
							borderWidth: "0",
							barThickness:'18',
							backgroundColor: '#F73A0B',
							minBarLength:10,
						}
					]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					plugins:{
						legend: false,
					},
					scales: {
						y: {
							grid: {
								color: "rgba(233,236,255,0.5)",
								drawBorder: true
							},
							ticks: {
								fontColor: "#3e4954",
								 max: 60,
								min: 0,
								stepSize: 20
							},
						},
						x: {
							barPercentage: 0.3,
							
							grid: {
								display: false,
								zeroLineColor: "transparent"
							},
							ticks: {
								stepSize: 20,
								fontColor: "#3e4954",
								fontFamily: "Nunito, sans-serif"
							}
						}
					},
					tooltips: {
						mode: "index",
						intersect: false,
						titleFontColor: "#888",
						bodyFontColor: "#555",
						titleFontSize: 12,
						bodyFontSize: 15,
						backgroundColor: "rgba(255,255,255,1)",
						displayColors: true,
						xPadding: 10,
						yPadding: 7,
						borderColor: "rgba(220, 220, 220, 1)",
						borderWidth: 1,
						caretSize: 6,
						caretPadding: 10
					}
				}
			};

			var ctx = document.getElementById("activity1").getContext("2d");
			var myLine = new Chart(ctx, config);

			var items = document.querySelectorAll("#user-activity1 .nav-tabs .nav-item");
			items.forEach(function(item, index) {
				item.addEventListener("click", function() {
					config.data.datasets[0].data = activity1Data[index].first;
					myLine.update();
				});
			});
		}
	}
	var pieChart1 = function(){
		 var options = {
          series: [90, 68, 85],
          chart: {
          type: 'donut',
		  height:250
        },
		dataLabels:{
			enabled: false
		},
		stroke: {
          width: 0,
        },
		colors:['#1D92DF', '#4754CB', '#D55BC1'],
		legend: {
              position: 'bottom',
			  show:false
            },
        responsive: [{
          breakpoint: 768,
          options: {
           chart: {
			  height:200
			},
          }
        }]
        };

        var chart = new ApexCharts(document.querySelector("#pieChart1"), options);
        chart.render();
    
	}
	
	
 
	/* Function ============ */
		return {
			init:function(){
			},
			
			
			load:function(){
				pieChart3();
				chartBar();
				activityChart();
				activityBar1();
				
			},
			
			resize:function(){
			}
		}
	
	}();

	
		
	jQuery(window).on('load',function(){
		setTimeout(function(){
			dlabChartlist.load();
		}, 1000); 
		
	});

     

})(jQuery);