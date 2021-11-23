
$(function () {
setInterval(get_r1_data, 1000*1);
setInterval(echarts_l2, 1000*1);
setInterval(echarts_l3, 1000*1);
setInterval(echarts_c1, 1000*1);
setInterval(map, 1000*1);
setInterval(echarts_r1, 1000*1);
setInterval(echarts_r21, 1000*1);
setInterval(echarts_r22, 1000*1);
setInterval(echarts_r3, 1000*1);
function get_r1_data() {
	
	$.ajax({
		url: "/l1",
		success: function(data) {
			// data=JSON.parse(data)
			
			$("#order").html(data.order)
			$("#profit").html(data.profit)
			$("#customer").html(data.customer)
			$("#ATV").html(data.ATV)
		},
		error: function(xhr, type, errorThrown) {

		}
	})
}
function echarts_l2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart_l2'));


            $.ajax({
                url:'/l2',
                success:function (data) {
                    // data=JSON.parse(data)

				var option = {
			
						tooltip: {
							trigger: 'axis'
						},
						color: ['#03b48e', '#3893e5'],
						legend: {
						  right: '5%',
						  top: '40%',
						  orient: 'vertical',
						  textStyle: {
							  fontSize: 12,
							  color: 'rgba(255,255,255,0.7)',
						  },
						},

						radar: [{
							indicator: [{
								text: '销售额',
								max: 150000
							}, {
								text: '数量',
								max: 3000
							}, {
								text: '客单价',
								max: 100
							}, {
								text: '人均订单量',
								max: 3
							}, {
								text: '人均利润',
								max: 15
							}],

							center: ['50%', '50%'],
							radius: '70%',
							startAngle: 90,
							splitNumber: 4,
							shape: 'circle',
						
							name: {
								padding:-5,
								formatter: '{value}',
								textStyle: {
									fontSize:10,
									color: 'rgba(255,255,255,.7)'
								}
							},
							splitArea: {
								areaStyle: {
									color: 'rgba(255,255,255,.05)'
								}
							},
							axisLine: {
								lineStyle: {
									color: 'rgba(255,255,255,.05)'
								}
							},
							splitLine: {
								lineStyle: {
									color: 'rgba(255,255,255,.05)'
								}
							}
						}, ],
						series: [{
							name: '雷达图',
							type: 'radar',
							tooltip: {
								trigger: 'item'
							},
							data: [{
								name: '新客户',
								value: data['new_customer'],
								lineStyle: {
									normal: { 
										color:'#03b48e',
										width:2,
									}
								},
								areaStyle: {
									normal: {
										color: '#03b48e',
										opacity:.4
									}
								},
								symbolSize: 0,
							  
							}, {
								name: '老客户',
								value: data['old_customer'],
								symbolSize: 0,
								lineStyle: {
									normal: { 
										color:'#3893e5',
										width:2,
									}
								},
									 areaStyle: {
									normal: {
										color: 'rgba(19, 173, 255, 0.5)'
									}
								}
							}]
						}, ]
					};
		 


		         myChart.setOption(option);
		 
				window.addEventListener("resize",function(){
					myChart.resize();
				});


                }
            })




		}
function echarts_l3() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart_l3'));
        $.ajax({
                url:'/l3',
                success:function (data) {
                    // data=JSON.parse(data)
					
					var option = {
							legend: {
								icon:"circle",
								top: "0",
								width:'100%',
								right: 'center',
										itemWidth: 12,
										itemHeight: 10,
							 data: ['新客户', '老客户'],
							 textStyle: {
								 color: "rgba(255,255,255,.5)" },
						 },
							tooltip: {
								trigger: 'axis',
								axisPointer: {
									type: 'shadow',
									lineStyle: {
										 color: '#dddc6b'
									 }
								 }
							},

							 xAxis: [{
							    type: 'category',
								boundaryGap: false,
								axisLabel:  {
											rotate: -45,
											textStyle: {
												color: "rgba(255,255,255,.6)",
												fontSize:10,
										},
									},
								axisLine: {
											lineStyle: { 
												color: 'rgba(255,255,255,.1)'
											}
								},
				  
						   data: data['index']
				  
							}, {
				  
								axisPointer: {show: false},
								axisLine: {  show: false},
								position: 'bottom',
				  
							}],
					 
						  yAxis: [
						   {
									type: 'value',
									axisTick: {show: false},
								   // splitNumber: 6,
									axisLine: {
										lineStyle: {
											color: 'rgba(255,255,255,.1)'
										}
									},
								   axisLabel:  {
									formatter: "{value}",
											textStyle: {
												color: "rgba(255,255,255,.6)",
												fontSize:10,
											},
										},
					
									splitLine: {
										lineStyle: {
											 color: 'rgba(255,255,255,.1)'
										}
									}
								}],
						 series: [
							 {
							 name: '老客户',
							 type: 'line',
						   smooth: true,
							 symbol: 'circle',
							 symbolSize: 5,
							 showSymbol: false,
							 lineStyle: {
								 
								 normal: {
									 color: 'rgba(31, 174, 234, 1)',
									 width: 2
								 }
							 },
							 areaStyle: {
								 normal: {
									 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										 offset: 0,
										 color: 'rgba(31, 174, 234, 0.4)'
									 }, {
										 offset: 0.8,
										 color: 'rgba(31, 174, 234, 0.1)'
									 }], false),
									 shadowColor: 'rgba(0, 0, 0, 0.1)',
								 }
							 },
								 itemStyle: {
								 normal: {
									 color: '#1f7eea',
									 borderColor: 'rgba(31, 174, 234, .1)',
									 borderWidth: 5
								 }
							 },
							 data: data['old_customer']
					 
						 }, 
					 {
							 name: '新客户',
							 type: 'line',
						   smooth: true,
							 symbol: 'circle',
							 symbolSize: 5,
							 showSymbol: false,
							 lineStyle: {
								 
								 normal: {
									 color: '#6bdd9b',
									 width: 2
								 }
							 },
							 areaStyle: {
								 normal: {
									 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										 offset: 0,
										 color: 'rgba(107, 221, 155, 0.4)'
									 }, {
										 offset: 0.8,
										 color: 'rgba(107, 221, 155, 0.1)'
									 }], false),
									 shadowColor: 'rgba(0, 0, 0, 0.1)',
								 }
							 },
								 itemStyle: {
								 normal: {
									 color: '#6bdd9b',
									 borderColor: 'rgba(107, 221, 155, .1)',
									 borderWidth: 5
								 }
							 },
							 data: data['new_customer']
					 
						 }, 
							  ]
					 
					 };
					// 使用刚指定的配置项和数据显示图表。
					myChart.setOption(option);
					window.addEventListener("resize",function(){
						myChart.resize();
					});
		            }
		})
		
    }
function echarts_c1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('echart_c11'));
		var myChart2 = echarts.init(document.getElementById('echart_c12'));
        $.ajax({
                url:'/c1',
                success:function (data) {
					$("#month_sales").html(data.sales)
					$("#year_sales").html(data.year_sales)					
					
					var option1 = {
							title: {
								text: '月达成率',
								x: 'center',
								y: 'bottom',
								textStyle: {
									fontWeight: 'bold',
									color: 'rgb(255,255,255,0.7)',
									fontSize: '16',
								},
								padding:[0,0,15,0]  // 上右下左
							},
							color: ['rgba(176, 212, 251, .1)'], 
							series: [{
								type: 'pie',
								clockWise: true,
								radius: ['35%', '45%'],
								center:['50%', '30%'],
								itemStyle: {
									normal: {
										label: {show: false},
										labelLine: {show: false},
									}
								},
								hoverAnimation: false, 
								data: [
									{
									value: data['sales'],
									itemStyle: {
										normal: {
											color: { // 完成的圆环的颜色
												colorStops: [{
													offset: 0,
													color: '#00cefc' // 0% 处的颜色
												}, {
													offset: 1,
													color: '#367bec' // 100% 处的颜色
												}]
											},
											labelLine: {show: false}
										} 
									  },
									  
									label: {
										normal: {
											show: true,
											position: 'center',
											color:'#0580f2',
											formatter: data['achieving_rate'],
											fontSize: '12',
										},
										emphasis: {//中间文字显示
											show: true,
										}
									  },						  
									}, 
									{
										value: data['target'] - data['sales'],
									}]
					
							}]
						}

					var option2 = {
							title: {
								text: '年达成率',
								x: 'center',
								y: 'bottom',
								textStyle: {
									fontWeight: 'bold',
									color: 'rgb(255,255,255,0.7)',
									fontSize: '16',
								},
								padding:[0,0,15,0]  // 上右下左
							},
							color: ['rgba(176, 212, 251, .1)'], 
							series: [{
								type: 'pie',
								clockWise: true,
								radius: ['35%', '45%'],
								center:['50%', '30%'],
								itemStyle: {
									normal: {
										label: {show: false},
										labelLine: {show: false},
									}
								},
								hoverAnimation: false, 
								data: [
									{
									value: data['year_sales'],
									itemStyle: {
										normal: {
											color: { // 完成的圆环的颜色
												colorStops: [{
													offset: 0,
													color: '#00cefc' // 0% 处的颜色
												}, {
													offset: 1,
													color: '#367bec' // 100% 处的颜色
												}]
											},
											labelLine: {show: false}
										} 
									  },
									  
									label: {
										normal: {
											show: true,
											position: 'center',
											color:'#0580f2',
											formatter: data['year_achieving_rate'],
											fontSize: '12',
										},
										emphasis: {//中间文字显示
											show: true,
										}
									  },						  
									}, 
									{
										value: data['year_target'] - data['year_sales'],
									}]
					
							}]
						}
					
					myChart1.setOption(option1);
					myChart2.setOption(option2);
					window.addEventListener("resize",function(){
						myChart1.resize();
						myChart2.resize();
					});
				    }
		})
		
		
    }
function map() {
        // 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('map_1'));
        $.ajax({
                url:'/map',
                success:function (data) {

					var data =data['data']					
					var geoCoordMap = {
						'海门':[121.15,31.89],
						'鄂尔多斯':[109.781327,39.608266],
						'招远':[120.38,37.35],
						'舟山':[122.207216,29.985295],
						'齐齐哈尔':[123.97,47.33],
						'盐城':[120.13,33.38],
						'赤峰':[118.87,42.28],
						'青岛':[120.33,36.07],
						'乳山':[121.52,36.89],
						'金昌':[102.188043,38.520089],
						'泉州':[118.58,24.93],
						'莱西':[120.53,36.86],
						'日照':[119.46,35.42],
						'胶南':[119.97,35.88],
						'南通':[121.05,32.08],
						'拉萨':[91.11,29.97],
						'云浮':[112.02,22.93],
						'梅州':[116.1,24.55],
						'文登':[122.05,37.2],
						'上海':[121.48,31.22],
						'攀枝花':[101.718637,26.582347],
						'威海':[122.1,37.5],
						'承德':[117.93,40.97],
						'厦门':[118.1,24.46],
						'汕尾':[115.375279,22.786211],
						'潮州':[116.63,23.68],
						'丹东':[124.37,40.13],
						'太仓':[121.1,31.45],
						'曲靖':[103.79,25.51],
						'烟台':[121.39,37.52],
						'福州':[119.3,26.08],
						'瓦房店':[121.979603,39.627114],
						'即墨':[120.45,36.38],
						'抚顺':[123.97,41.97],
						'玉溪':[102.52,24.35],
						'张家口':[114.87,40.82],
						'阳泉':[113.57,37.85],
						'莱州':[119.942327,37.177017],
						'湖州':[120.1,30.86],
						'汕头':[116.69,23.39],
						'昆山':[120.95,31.39],
						'宁波':[121.56,29.86],
						'湛江':[110.359377,21.270708],
						'揭阳':[116.35,23.55],
						'荣成':[122.41,37.16],
						'连云港':[119.16,34.59],
						'葫芦岛':[120.836932,40.711052],
						'常熟':[120.74,31.64],
						'东莞':[113.75,23.04],
						'河源':[114.68,23.73],
						'淮安':[119.15,33.5],
						'泰州':[119.9,32.49],
						'南宁':[108.33,22.84],
						'营口':[122.18,40.65],
						'惠州':[114.4,23.09],
						'江阴':[120.26,31.91],
						'蓬莱':[120.75,37.8],
						'韶关':[113.62,24.84],
						'嘉峪关':[98.289152,39.77313],
						'广州':[113.23,23.16],
						'延安':[109.47,36.6],
						'太原':[112.53,37.87],
						'清远':[113.01,23.7],
						'中山':[113.38,22.52],
						'昆明':[102.73,25.04],
						'寿光':[118.73,36.86],
						'盘锦':[122.070714,41.119997],
						'长治':[113.08,36.18],
						'深圳':[114.07,22.62],
						'珠海':[113.52,22.3],
						'宿迁':[118.3,33.96],
						'咸阳':[108.72,34.36],
						'铜川':[109.11,35.09],
						'平度':[119.97,36.77],
						'佛山':[113.11,23.05],
						'海口':[110.35,20.02],
						'江门':[113.06,22.61],
						'章丘':[117.53,36.72],
						'肇庆':[112.44,23.05],
						'大连':[121.62,38.92],
						'临汾':[111.5,36.08],
						'吴江':[120.63,31.16],
						'石嘴山':[106.39,39.04],
						'沈阳':[123.38,41.8],
						'苏州':[120.62,31.32],
						'茂名':[110.88,21.68],
						'嘉兴':[120.76,30.77],
						'长春':[125.35,43.88],
						'胶州':[120.03336,36.264622],
						'银川':[106.27,38.47],
						'张家港':[120.555821,31.875428],
						'三门峡':[111.19,34.76],
						'锦州':[121.15,41.13],
						'南昌':[115.89,28.68],
						'柳州':[109.4,24.33],
						'三亚':[109.511909,18.252847],
						'自贡':[104.778442,29.33903],
						'吉林':[126.57,43.87],
						'阳江':[111.95,21.85],
						'泸州':[105.39,28.91],
						'西宁':[101.74,36.56],
						'宜宾':[104.56,29.77],
						'呼和浩特':[111.65,40.82],
						'成都':[104.06,30.67],
						'大同':[113.3,40.12],
						'镇江':[119.44,32.2],
						'桂林':[110.28,25.29],
						'张家界':[110.479191,29.117096],
						'宜兴':[119.82,31.36],
						'北海':[109.12,21.49],
						'西安':[108.95,34.27],
						'金坛':[119.56,31.74],
						'东营':[118.49,37.46],
						'牡丹江':[129.58,44.6],
						'遵义':[106.9,27.7],
						'绍兴':[120.58,30.01],
						'扬州':[119.42,32.39],
						'常州':[119.95,31.79],
						'潍坊':[119.1,36.62],
						'重庆':[106.54,29.59],
						'台州':[121.420757,28.656386],
						'南京':[118.78,32.04],
						'滨州':[118.03,37.36],
						'贵阳':[106.71,26.57],
						'无锡':[120.29,31.59],
						'本溪':[123.73,41.3],
						'克拉玛依':[84.77,45.59],
						'渭南':[109.5,34.52],
						'马鞍山':[118.48,31.56],
						'宝鸡':[107.15,34.38],
						'焦作':[113.21,35.24],
						'句容':[119.16,31.95],
						'北京':[116.46,39.92],
						'徐州':[117.2,34.26],
						'衡水':[115.72,37.72],
						'包头':[110,40.58],
						'绵阳':[104.73,31.48],
						'乌鲁木齐':[87.68,43.77],
						'枣庄':[117.57,34.86],
						'杭州':[120.19,30.26],
						'淄博':[118.05,36.78],
						'鞍山':[122.85,41.12],
						'溧阳':[119.48,31.43],
						'库尔勒':[86.06,41.68],
						'安阳':[114.35,36.1],
						'开封':[114.35,34.79],
						'济南':[117,36.65],
						'德阳':[104.37,31.13],
						'温州':[120.65,28.01],
						'九江':[115.97,29.71],
						'邯郸':[114.47,36.6],
						'临安':[119.72,30.23],
						'兰州':[103.73,36.03],
						'沧州':[116.83,38.33],
						'临沂':[118.35,35.05],
						'南充':[106.110698,30.837793],
						'天津':[117.2,39.13],
						'富阳':[119.95,30.07],
						'泰安':[117.13,36.18],
						'诸暨':[120.23,29.71],
						'郑州':[113.65,34.76],
						'哈尔滨':[126.63,45.75],
						'聊城':[115.97,36.45],
						'芜湖':[118.38,31.33],
						'唐山':[118.02,39.63],
						'平顶山':[113.29,33.75],
						'邢台':[114.48,37.05],
						'德州':[116.29,37.45],
						'济宁':[116.59,35.38],
						'荆州':[112.239741,30.335165],
						'宜昌':[111.3,30.7],
						'义乌':[120.06,29.32],
						'丽水':[119.92,28.45],
						'洛阳':[112.44,34.7],
						'秦皇岛':[119.57,39.95],
						'株洲':[113.16,27.83],
						'石家庄':[114.48,38.03],
						'莱芜':[117.67,36.19],
						'常德':[111.69,29.05],
						'保定':[115.48,38.85],
						'湘潭':[112.91,27.87],
						'金华':[119.64,29.12],
						'岳阳':[113.09,29.37],
						'长沙':[113,28.21],
						'衢州':[118.88,28.97],
						'廊坊':[116.7,39.53],
						'菏泽':[115.480656,35.23375],
						'合肥':[117.27,31.86],
						'武汉':[114.31,30.52],
						'大庆':[125.03,46.58]
					};
					var convertData = function (data) {
						var res = [];
						for (var i = 0; i < data.length; i++) {
							var geoCoord = geoCoordMap[data[i].name];
							if (geoCoord) {
								res.push({
									name: data[i].name,
									value: geoCoord.concat(data[i].value)
								});
							}
						}
						return res;
					};

					option = {
						title: {
							text: '各省市销量分布',
							subtext: '吴下阿泽制作',
							left: 'center',
							textStyle: {
								color: 'rgba(255,255,255,0.7)',
								fontSize:18
							}
						},
						tooltip : {
							trigger: 'item',
							formatter: function (params) {
								  if(typeof(params.value)[2] == "undefined"){
									return params.name + ' : ' + params.value;
								  }else{
									return params.name + ' : ' + params.value[2];
								  }
								}
						},
					  
						geo: {
							map: 'china',
							label: {
								emphasis: {
									show: false
								}
							},
							roam: false,//禁止其放大缩小
							itemStyle: {
								normal: {
									areaColor: '#4c60ff',
									borderColor: '#002097'
								},
								emphasis: {
									areaColor: '#293fff'
								}
							}
						},
						series : [
							{
								name: '消费金额',
								type: 'scatter',
								coordinateSystem: 'geo',
								data: convertData(data),
								symbolSize: function (val) {
									return val[2] / 15;
								},
								label: {
									normal: {
										formatter: '{b}',
										position: 'right',
										show: false
									},
									emphasis: {
										show: true
									}
								},
								itemStyle: {
									normal: {
										color: '#ffeb7b'
									}
								}
							}
							

							,


						]
					};
					
					myChart.setOption(option);
					window.addEventListener("resize",function(){
						myChart.resize();
					});
					

				    }
		})
		
		
}

function echarts_r1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart_r1'));

        $.ajax({
                url:'/r1',
                success:function (data) {
                    // data=JSON.parse(data)

					var option = {
						title: {
							x: 'center',
							y: 0,
							textStyle:{
								color:'#B4B4B4',
								fontSize:16,
								fontWeight:'normal',
							},
							
						},
						tooltip: {
							trigger: 'axis',
							backgroundColor:'rgba(255,255,255,0.2)',
							axisPointer: {
								type: 'shadow',
								label: {
									show: true,
									backgroundColor: 'rgba(255,255,255,0.7)',
								}
							}
						},
						legend: {
							textStyle: {
							  fontSize: 12,
								color: 'rgba(255,255,255,0.7)'
							},
							top:'7%',
						},
						grid:{
							x:'12%',
							width:'82%',
							y:'12%',
						},
						xAxis: {
							data: data['index'],
							splitNumber:4,
							axisLine: {
								lineStyle: {
									color: 'rgba(255,255,255,0.1)'
								}
							},
							
							axisLabel:  {
										rotate: -45,
										textStyle: {
											color: "rgba(255,255,255,.6)",
											fontSize:10,
									},
								},
							
							axisTick:{
								show:false,
							},
						},
						yAxis: [{
							splitLine: {show: false},
							axisLine: {
								lineStyle: {
									color: 'rgba(255,255,255,0.1)',
									}
								},
							axisTick:{
								show:false,
								},
							axisLabel:  {
										textStyle: {
											color: "rgba(255,255,255,.6)",
											fontSize:10,
									},
								},
							},
							{
							splitLine: {show: false},
							axisLine: {
								lineStyle: {
									color: 'rgba(255,255,255,0.1)',
								}
							},
							axisTick:{
								show:false,
								},
							axisLabel:  {
										textStyle: {
											color: "rgba(255,255,255,.6)",
											fontSize:10,
									},
								},
						}],
						
						series: [
									{
									name: '销售额',
									type: 'bar',
									barGap: '-100%',
									barWidth: 10,
									itemStyle: {
										normal: {
											barBorderRadius: 5,
											color: new echarts.graphic.LinearGradient(
												0, 0, 0, 1,
												[
													{offset: 0, color: 'rgba(0,254,204,0.4)'},
													// {offset: 0.2, color: 'rgba(156,107,211,0.3)'},
													{offset: 1, color: 'rgba(38,144,207,0.1)'}
												]
											)
										}
									},
									z: -12,
									
									data: data['sales']
								},
								 {
								name: '利润',
								type: 'bar',
								barWidth: 10,
								itemStyle: {
									normal: {
										barBorderRadius: 5,
										color: new echarts.graphic.LinearGradient(
											0, 0, 0, 1,
											[
												{offset: 0, color: 'rgba(0,254,204,0.8)'},
												{offset: 1, color: 'rgba(38,144,207,0.8)'}
											]
										)
									}
								},
								data: data['profit']
							}, 
						  
						  
						  {
							name: '利润率',
							type: 'line',
							smooth: true,
							showAllSymbol: true,
							symbol: 'emptyCircle',
							symbolSize: 8,
							yAxisIndex: 1,
							itemStyle: {
									normal: {
									color:'#3893e5'},
							},
							data: data['profit_rate']
						}, 
						
			 
						
			 
					   ]
					};
						
					// 使用刚指定的配置项和数据显示图表。
					myChart.setOption(option);
					window.addEventListener("resize",function(){
						myChart.resize();
					});
				}
		})
    }	
function echarts_r21() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart_r21'));

        $.ajax({
                url:'/r21',
                success:function (data) {
                    // data=JSON.parse(data)

				var option = {
				 grid: {
				   top: '0%',
				   bottom: '10%',
				   left:'15%',
				 },

				 yAxis: {
				   data: data['product'],
				   axisLine: {
					 show: false,
					 lineStyle: {
					   color: "rgba(255,255,255,0.7)",
					 }
				   },
				   axisTick: {
					 show: false
				   },
				   axisLabel: {
					 interval: 0,
					 fontSize: 12
				   }
				 },
				 xAxis: [
					   {show: false}
				 ],
				 series: [
				   {
					 type: "bar",
					 barWidth: "40%",
					 barGap: 5,
					 itemStyle: {
					   normal: {
						 color: new echarts.graphic.LinearGradient(1, 0, 0, 0,
						   [
							 {
							   offset: 0,
							   color: "#00fecc"
							 },
							 {
							   offset: 0.8,
							   color: "#2690cf"
							 }
						   ],
						   false
						 ),
					   },
					 },
					label: {
					  normal: {
						  show: true,
						  fontSize: 10,
						  fontWeight: 'normal',
						  color: '#ffffff',
						  position: 'right',
					  }
					},
					 data:data['sales']
				   },

				 ]
			   };
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
				window.addEventListener("resize",function(){
					myChart.resize();
				});
			}
		})	
    }
function echarts_r22() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart_r22'));
        $.ajax({
                url:'/r22',
                success:function (data) {
                    // data=JSON.parse(data)

				var option = {	    
					 color: [
						'rgb(255,235,0)', 'rgb(37,214,245)', 'rgb(255,0,255)'
					],
					legend: {
						y: 'top',
						top: '0%',
						data: data['type'],
						itemHeight:10,
						textStyle: {
							color: 'rgba(255,255,255,0.7)',
							fontSize: 10
						}
					},
					tooltip: {
						trigger: 'axis',
						formatter: "{a} <br/>{c} ",
						    },
					
					grid: {
					   top: '15%',
					   right:'10%',
					   bottom: '10%',
					 },
					
					xAxis: {
						  splitLine: { show: false },				
								axisTick: { show: false },
								axisLine:{show: false },
								axisLabel: { show: false },
							  },
					yAxis: {
								splitLine: { show: false },				
								axisTick: { show: false },
								axisLine:{show: false },
								axisLabel: { show: false },
							  },
					series: [
								{ name: data['type'][0],
								  symbolSize: 10,
								  data: data['data'][0],
								  type: 'scatter',
								},
								{ name: data['type'][1],
								  symbolSize: 10,
								  data: data['data'][1],
								  type: 'scatter'
								},
								{ name: data['type'][2],
								  symbolSize: 10,
								  data: data['data'][2],
								  type: 'scatter',
								　markLine: {
											symbol: 'none',
											data: [
								　　　　　　　　{
												yAxis: data['profit_avg'],
												lineStyle: {
													color: 'rgba(255,255,255,0.7)',
													type:"solid",
												},
												label:{
													formatter:'利润平均线',
													fontSize:10,
													padding: [-13, -20, 15, -45]
												}},
												{
												xAxis: data['sales_avg'],
												lineStyle: {
													color: 'rgba(255,255,255,0.7)',
													type:"solid",
												},
												label:{
													formatter:'销售额平均线',
													fontSize:10,
													
													}
											}
										  ]
									 }, 								  
								}
							  ]
							};
				 
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
				window.addEventListener("resize",function(){
					myChart.resize();
				});
		
			}
		})	
		
    }
function echarts_r3() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart_r3'));
        $.ajax({
                url:'/r3',
                success:function (data) {
                    // data=JSON.parse(data)
					
					var option = {
					  tooltip: {
						trigger: 'axis',
						axisPointer: {
						  type: 'shadow' 
						}
					  },
					  legend: { padding:[20, 0, 0 ,0],				
						textStyle: {
									color: 'rgba(255,255,255,0.7)',
									fontSize: 10
					  }},
					  grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					  },
					  xAxis: {
							show: false
						},
					  yAxis: {
						type: 'category',
						data: ['利润', '销量', '销售额'],
						axisTick: {show: false},
						axisLine:{show: false},
						axisLabel: {
								textStyle: {
									color: 'rgba(255,255,255,0.7)',
								}},
					  },
					  series: [
						{
						  name: '消费者',
						  type: 'bar',
						  stack: 'total',
						  label: {
							show: true
						  },
						  emphasis: {
							focus: 'series'
						  },
						  itemStyle:{color:'rgb(37,214,245)'},
						  data: data['data'][0]
						},
						{
						  name: '公司',
						  type: 'bar',
						  stack: 'total',
						  label: {
							show: true
						  },
						  emphasis: {
							focus: 'series'
						  },
						  itemStyle:{color:'rgb(30,178,204)'},
						  data: data['data'][1]
						},
						{
						  name: '小微企业',
						  type: 'bar',
						  stack: 'total',
						  label: {
							show: true
						  },
						  emphasis: {
							focus: 'series'
						  },
						  itemStyle:{color:'rgb(7,152,179)'},
						  data: data['data'][2]
						},
					  ]
					};
					// 使用刚指定的配置项和数据显示图表。
					myChart.setOption(option);
					window.addEventListener("resize",function(){
						myChart.resize();
					});
				}
				})
			

			}
	
})



		
		
		


		









