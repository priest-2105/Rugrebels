

(function($) {
    /* "use strict" */
	
 var dlabChartlist = function(){
	
	var screenWidth = $(window).width();
	
	
	var pieChart2 = function(){
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

        var chart = new ApexCharts(document.querySelector("#pieChart2"), options);
        chart.render();
    
	}
	
 
	/* Function ============ */
		return {
			init:function(){
			},
			
			
			load:function(){
				pieChart2();
				
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