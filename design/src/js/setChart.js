import echarts from 'echarts';

let count = {
    teachNum: {
        sum: 0,
        data: [],
        name: 'teachNum',
        text: '教学讨论会',
        color: '#c23531'
    },
    scientNum: {
        sum: 0,
        data: [],
        name: 'scientNum',
        text: '科研研讨会',
        color: '#03a9f4'
    },
    salonNum: {
        sum: 0,
        data: [],
        name: 'salonNum',
        text: '学术沙龙',
        color: '#8bc34a'
    },
    sumNum: {
        sum: 0,
        data: [],
        name: 'sumNum',
        text: '统计',
        color: '#8bc34a'
    }
};
let canvas = [],
    myCharts = {};  

// 横轴
let axis = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
function xAxis(range) {
    if(range == 1) {
        return axis.slice(0, 6);
    }else if(range == 2) {
        return axis.slice(6);
    }else {
        return axis;
    }
}

 // 处理数据
function getData(opt) {
    let mon = '',
        time,
        type;

    //清空数据
    for(let k in count) {
        count[k].data = [];
    }

    opt.forEach(value => {
        time = new Date(value.startTime),
        mon = time.getMonth();

        switch(value.type) {
            case '1': 
                type = 'teachNum';
                break;
            case '2':
                type = 'scientNum';
                break;
            case '3':
                type = 'salonNum';
                break;
        }
        if(opt.type == 2) {
            mon -= 6;
        }
        count[type].data[mon] = count[type].data[mon] ? count[type].data[mon] + 1 : 1;
        count.sumNum.data[mon] = count.sumNum.data[mon] ? count.sumNum.data[mon] + 1 : 1;
        count[type].sum += 1;
    })
    count.maxCount = Math.max(count.teachNum.sum, count.scientNum.sum, count.salonNum.sum)
    return count;
}

// 判断数组或对象是否为空
function isEmpty(obj) {
    if(!obj) {
        return true;
    }

    if(Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
        return true;
    }

    if(Object.prototype.isPrototypeOf(obj)) {
        if(Object.keys(obj).length === 0) {
            return true;
        }else {
            for(let k in obj) {
                return false;
            }
        }
        return true;
    }

    return false;
}

export function init(ref, ids, options) {

    let width = ref.clientWidth * 0.45;
    ids.forEach((value, i) => {
        // 初始化 canvas 宽度
        canvas.push(document.getElementById(value));
        canvas[i].width = width;

        // 创建 echarts 实例    
        myCharts[value] = echarts.init(canvas[i]);
    })

    // 计时器
    let timer;

    let data = getData(options);

    // 配置 options
    let series = []
    for(let value in myCharts) {
        // let option = {};
        // if(value === 'sumPie') {
        //     let dataPie = [];
        //     for(let k in count) {
        //         if(k !== 'sumNum') {
        //             dataPie.push({value: count[k].sum, name: count[k].text});
        //         }
        //     }

        //     option = {
        //         title: {
        //             text: data.sumNum.text
        //         },
        //         tooltip: {
        //             trigger: 'item',
        //             formatter: "{a}<br/>{b}：{c} ({d}%)}"
        //         },
        //         visualMap: {
        //             show: false,
        //             min: 1,
        //             max: count.maxCount + 5,
        //             inRange: {
        //                 colorLightness: [0, 1],
        //                 color: 'red'
        //             }
        //         },
        //         series: [{
        //             naem: data.sumNum.data,
        //             type: 'pie',
        //             radius: '55%',
        //             center: ['50%', '50%'],
        //             data: dataPie.sort((a, b) => (a.value - b.value)),
        //             roseType: 'angle',
        //             label: {
        //                 normal: {
        //                     textStyle: {
        //                         color: 'rgba(0, 0, 0, .5)',
        //                         smooth: 0.2,
        //                         length: 10,
        //                         length2: 20
        //                     },
        //                     itemStyle: {
        //                         normal: {
        //                             color: '#c23531',
        //                             shadowBlur: 200,
        //                             shadowColor: 'rgba(0, 0, 0, .5)'
        //                         }
        //                     },
        //                     animationType: 'scale',
        //                     animationEasing: 'elasticOut',
        //                     animationDelay: idx => Math.random() * 200
        //                 }
        //             }
        //         }]
        //     };
        // }else {
        //     option = {
        //         title : {
        //             text: data[value].text,
        //             subtext: '',
        //             padding: [0]
        //         },
        //         tooltip : {
        //             trigger: 'axis'
        //         },
        //         toolbox: {
        //             show : true,
        //             feature : {
        //                 mark : {show: true},
        //                 dataView : {show: true, readOnly: true},
        //                 magicType : {show: true, type: ['line', 'bar']},
        //                 restore : {show: true},
        //                 saveAsImage : {show: true}
        //             }
        //         },
        //         // calculable : true,
        //         xAxis : [
        //             {
        //                 type : 'category',
        //                 boundaryGap : false,
        //                 data : xAxis(options.type)
        //             }
        //         ],
        //         yAxis : [
        //             {
        //                 type : 'value',
        //                 axisLabel : {
        //                     formatter: '{value}'
        //                 },
        //                 min: 0,
        //                 interval: 1
        //             }
        //         ],
        //         series : [
        //             {
        //                 name: data[value].text,
        //                 type:'line',
        //                 data: data[value].data,
        //                 lineStyle: {
        //                     normal: {
        //                         color: data[value].color
        //                     }
        //                 },
        //                 itemStyle: {
        //                     normal: {
        //                         color: data[value].color
        //                     }
        //                 },
        //                 markPoint : {
        //                     data : [
        //                         {type : 'max', name: '最大值'}
        //                     ]
        //                 },
        //                 markLine : {
        //                     data : [
        //                         {type : 'average', name: '平均值'}
        //                     ]
        //                 }
        //             }
        //         ]
        //     }
        // }
        if(value != 'sumPie' && value != 'sumNum') {
            series.push({
                name: data[value].text,
                type: 'bar',
                itemStyle: {
                    emphasis: {
                        barBorderWidth: 1,
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowColor: data[value].color
                    }
                },
                data: data[value].data
            })

        }
    }
    let option = {
            legend: {
                data: ['teachNum', 'scientNum', 'salonNum'],
                align: 'center'
            },
            brush: {
                toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
                xAxisIndex: 0
            }, 
            toolbox: {
                feature: {
                    magicType: {
                        type: ['stack', 'tiled']
                    },
                    dataView: {show: true, readOnly: true},
                    resotre: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            visualMap: {
                show: false,
                min: 0,
                max:  10,
                inRange: {
                    colorLightness: [0.5, .8]
                },
                calculable: true
            },
            xAxis: {
                data: xAxis(options.type),
                boundaryGap: false,
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                axisLabel : {
                    formatter: '{value}'
                },
                interval: 1
            },
            series: series,
            tooltip : {
                trigger: 'axis',
                backgroundColor: '#333',
                formatter: "{a}<br/>{b}：{c} ({d}%)}",
                bottom: 0,
                right: 0,
                width: 100,
                textStyle: {
                    fontSize: 12,
                    color: '#fff'
                }
            }
        }
        console.log(series)
        myCharts.sumNum.setOption(option);

    // window.addEventListener('resize', () => {
    //     for(let k in myCharts) {
    //         myCharts[k].resize()
    //     }
    // })
} 

export function refresh(options) {
    // console.log(myCharts)
    if(isEmpty(myCharts)) {
        return;
    }
    let data = getData(options);
    let axis = xAxis(options.type);

    for(let key in myCharts) {
        let options = myCharts[key].getOption();
        options.series[0].data = data[key].data;
        options.xAxis[0].data = axis;
        myCharts[key].setOption(options);
    }
}

