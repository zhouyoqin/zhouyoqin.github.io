/*
*生成模型图
*容器id：chartid 
*图的数据 包括{xAxis/real/forecast/band_high/band_low/score}
*/
function makeChart(chartid,chartdata) {
    // 基于准备好的dom，初始化echarts实例
    var container = echarts.init(document.getElementById(chartid));
    var data = chartdata;
    
    var score = data.score.seq;
    var scoreGreen = [];
    var scoreRed = [];
    var temp = 0;
    for(var i=0;i<score.length;i++){
        if (score[i] >= 0){
            scoreGreen.push(score[i]);
            scoreRed.push(temp);
        }else{
            scoreRed.push(-score[i]);
            scoreGreen.push(temp);
        }
    }
    // 指定图表的配置项和数据
    option = {
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            show:false   
        },
        legend: {
            bottom:0,
            data:['实际值','预测值','报警上限','报警下限','上移分数','下移分数']
        },
        xAxis: [
            {
                type: 'category',
                name:'时间',
                data:data.xAxis,
                // axisLabel:{
                //     rotate : 30
                // }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '报警数',
                min: 0,
            },
            {
                type: 'value',
                name: '分数',
                min: 0
            }
        ],
        series: [
            {
                name:'实际值',
                type:'line',
                symbol:'none',
                smooth:true,
                data:data.real.seq,
                lineStyle:{
                    normal:{
                        width:.5,
                        type:'solid'
                    }
                }
            },
            {
                name:'预测值',
                type:'line',
                symbol:'none',
                smooth:true,
                data:data.forecast.seq,
                lineStyle:{
                    normal:{
                        type:'dotted'
                    }
                }
            },
            {
                name:'报警上限',
                type:'line',
                symbol:'none',
                smooth:true,
                data:data.band_high.seq,
                lineStyle:{
                    normal:{
                        type:'dashed'
                    }
                }
            },
            {
                name:'报警下限',
                type:'line',
                symbol:'none',
                smooth:true,
                data:data.band_low.seq,
                lineStyle:{
                    normal:{
                        type:'dashed'
                    }
                }
            },
            {
                name:'上移分数',
                type:'bar',
                barWidth : 0.3,
                symbol:'none',
                smooth:true,
                yAxisIndex:1,
                data:scoreGreen,
                itemStyle:{
                    normal:{
                        color:'#127511'
                    }
                }
            },
            {
                name:'下移分数',
                type:'bar',
                barWidth : 0.3,
                symbol:'none',
                smooth:true,
                yAxisIndex:1,
                data:scoreRed,
                itemStyle:{
                    normal:{
                        color:'#FC333F'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    container.setOption(option);
}
function makeChart2(chartid,chartdata) {
    // 基于准备好的dom，初始化echarts实例
    var container = echarts.init(document.getElementById(chartid));
    var data = chartdata;
    
    var score = data.score.seq;
    var scoreGreen = [];
    var scoreRed = [];
    var temp = 0;
    for(var i=0;i<score.length;i++){
        if (score[i] >= 0){
            scoreGreen.push(score[i]);
            scoreRed.push(temp);
        }else{
            scoreRed.push(-score[i]);
            scoreGreen.push(temp);
        }
    }
    // 指定图表的配置项和数据
    option = {
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            show:false   
        },
        legend: {
            bottom:0,
            data:['实际值','预测值','报警上限','报警下限','平滑后上移分数','平滑后下移分数']
        },
        xAxis: [
            {
                type: 'category',
                name:'时间',
                data:data.xAxis
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '报警数',
                min: 0,
            },
            {
                type: 'value',
                name: '分数',
                min: 0
            }
        ],
        series: [
            {
                name:'实际值',
                type:'line',
                symbol:'none',
                smooth:true,
                data:data.real.seq,
                lineStyle:{
                    normal:{
                        width:.5,
                        type:'solid'
                    }
                }
            },
            {
                name:'预测值',
                type:'line',
                symbol:'none',
                smooth:true,
                data:data.forecast.seq,
                lineStyle:{
                    normal:{
                        type:'dotted'
                    }
                }
            },
            {
                name:'报警上限',
                type:'line',
                symbol:'none',
                smooth:true,
                data:data.band_high.seq,
                lineStyle:{
                    normal:{
                        type:'dashed'
                    }
                }
            },
            {
                name:'报警下限',
                type:'line',
                symbol:'none',
                smooth:true,
                data:data.band_low.seq,
                lineStyle:{
                    normal:{
                        type:'dashed'
                    }
                }
            },
            {
                name:'平滑后上移分数',
                type:'bar',
                barWidth : 0.3,
                symbol:'none',
                smooth:true,
                yAxisIndex:1,
                data:scoreGreen,
                itemStyle:{
                    normal:{
                        color:'#127511'
                    }
                }
            },
            {
                name:'平滑后下移分数',
                type:'bar',
                barWidth : 0.3,
                symbol:'none',
                smooth:true,
                yAxisIndex:1,
                data:scoreRed,
                itemStyle:{
                    normal:{
                        color:'#FC333F'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    container.setOption(option);
}
/*
*加载动画
*/
function loadChart(chartid) {
    // 基于准备好的dom，初始化echarts实例
    var container = echarts.init(document.getElementById(chartid));
    container.showLoading('default',{text: 'loading'});
    return container;
}
/*
*加载动画
*使用时要引用LoadAwsome.css
*/
function makeLoading(warningStr) {
    var alertDiv=document.createElement("div");
    alertDiv.setAttribute('id','loading-msg');
    alertDiv.innerHTML = "<div class='la-ball-spin-clockwise-fade'>" + 
                            "<div></div>" + 
                            "<div></div>" + 
                            "<div></div>" + 
                            "<div></div>" + 
                            "<div></div>" + 
                            "<div></div>" + 
                            "<div></div>" + 
                            "<div></div>" + 
                        "</div>"+
                        "<p>" + warningStr + "</p>";
    var first=document.body.firstChild;//得到页面的第一个元素
    document.body.insertBefore(alertDiv,first);//在得到的第一个元素之前插入
}
function closeLoading(){
    if(document.getElementById("loading-msg") != null){
        document.body.removeChild(document.getElementById("loading-msg"));
    }
}
/*
*传入Date()对象获取yyyy-mm-dd
*/ 
function getFormatDate(date){
    var month,day;
    if((date.getMonth() + 1) < 10){
        month = "0" + (date.getMonth() + 1);
    }else{
        month = date.getMonth() + 1;
    }
    if(date.getDate() < 10){
        day = "0" + date.getDate();
    }else{
        day = date.getDate();
    }
    return date.getFullYear() + "-" + month + "-" + day;
}
/*
*获取两个时间yyyy-mm-dd之间的间隔
*/ 
function getInters(begin,end){
    var inters = Date.parse(begin) - Date.parse(end)
    return inters/(24*60*60*1000);
}

/*
*判断city集合中是否有thiscity
*存在返回>=0，不存在-1
*/
function inCity(thiscity,city) {
    var cities = city.data;
    for(var i = 0; i < cities.length; i++){
        if(JSON.stringify(cities[i]).indexOf("\"" + thiscity + "\"") !== -1){
            return true;
        }
    }
    return false;
}

/*
*创建一个弹窗
*
*/
function makeAlert(mes) {
    var alertDiv=document.createElement("div");
    alertDiv.setAttribute('id','error-msg');
    alertDiv.innerHTML = "<div class='content'>" +
                        "<p>" + mes + "</p>" + 
                    "</div>" +
                    "<div class='btns'>"+
                        "<button onclick='removeAlert()' type='button' class='didi-btn didi-btn-ok'>我知道了</button>"+
                    "</div>";
    var first=document.body.firstChild;//得到页面的第一个元素
    document.body.insertBefore(alertDiv,first);//在得到的第一个元素之前插入
}
function removeAlert() {
    document.body.removeChild(document.getElementById("error-msg"));
}





