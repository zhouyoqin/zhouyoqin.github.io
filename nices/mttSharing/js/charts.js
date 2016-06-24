    var speeds = [];
    var times = [];
    for(var i=0,l=chart1.length;i<l;i++){
      speeds[i]=chart1[i].speed;
      times[i]=5*(i+1);
    }

        // 基于准备好的dom，初始化echarts实例
        var speedChart = echarts.init(document.getElementById('speedChart'));
        var heightChart = echarts.init(document.getElementById('heightChart'));

        // 指定图表的配置项和数据
        option = {
        title: {
            text: '折线图堆叠'
        },
        backgroundColor : '#F0F0F0',
        grid: {
            left: '10%',
            right: '9%',
            top: '15%',
            height : '80%',
            containLabel: true
        },
        xAxis : [{
              name : '速度曲线（km/h）',
              nameLocation : 'end',
              nameTextStyle :[{
                fontSize:14
              }],
              type : 'category',
              boundaryGap : false,
              data : times,
              axisLine : [{
                show : false
              }],
              axisTick : [{
                show : false
              }]
        }],
        yAxis : [{
            name : '速度曲线（km/h）',
            nameLocation : 'end',
            type : 'value',
            axisLine : [{
              show : false
            }],
            axisTick : [{
              show : false
            }],
        }],
        series : [{
            name:'邮件营销',
            type:'line',
              smooth: true,
              stack: '总量',
              data:speeds,
              symbol : 'none',
              lineStyle: {
                normal:{
                  color : '#EAC47B'
                }
              }
        }]
    };


        // 使用刚指定的配置项和数据显示图表。
        speedChart.setOption(option);
        heightChart.setOption(option);