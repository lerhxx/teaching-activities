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
let myCharts = {};  

function instance(ids) {
    ids.forEach((value, i) => {
        // 创建 echarts 实例    
        myCharts[value] = echarts.init(document.getElementById(value));
    })
}

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
    count.sumNum.minCount = Math.min(count.teachNum.sum, count.scientNum.sum, count.salonNum.sum)
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

function pieSeries(sum) {
    return {
        name: '细分',
        type: 'pie',
        center: ['70%', '25%'],
        radius: [0, 50],
        itemStyle: {
            normal: {
                labelLine: {
                    length: 20
                }
            }
        },
        label: {
            normal: {
                textStyle: {
                    color: '#000',
                }
            }
        },
        data: sum
    }
}

function barSeries(value) {
    console.log(value)
    return {
        name: value.text,
        type: 'bar',
        data: value.data,
        tooltip: {trigger: 'item'},
        stack: 'sum',
        barWidth: 25,
    }
}

function getSum(data) {
    let sum = [];
    for(let value in data) {
        if(value !== 'sumNum') {
            sum.push({
                value: data[value].sum,
                name: data[value].text,
            });
        }
    }
    return sum;
}

function getSeries(data) {
    let series = [];
    for(let value in data) {
        if(value == 'sumNum') {
            // 饼图
            series.push(pieSeries(getSum(data)))
        }else{
            series.push(barSeries(data[value]))
        }
    }
    return series;
}

function sumOption(data, type, xAxis) {
    return {
        title : {
            text: data[type].text,
            subtext: '',
            padding: [0]
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: true},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : false,
        tooltip: {
            formatter: '{a} <br/>{b}: {c}次'
        },
        legend: {
            data: ['教学讨论会', '科研研讨会', '学术沙龙']
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : true,
                data : xAxis
            }
        ],
        yAxis : [
            {
                type : 'value',
                max: count.sumNum.minCount,
            }
        ],
        series : getSeries(data)
    }
}

function lineOption(value, xAxis) {
    return {
        title : {
            text: value.text,
            subtext: '',
            padding: [0]
        },
        tooltip : {
            trigger: 'axis',
            formatter: '{a} <br/>{b}: {c} 次'
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: true},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : false,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : xAxis
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value}'
                },
                min: 0,
                interval: 1
            }
        ],
        series : [
            {
                name: value.text,
                type:'line',
                data: value.data,
                lineStyle: {
                    normal: {
                        color: value.color
                    }
                },
                itemStyle: {
                    normal: {
                        color: value.color
                    }
                },
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            }
        ]
    }
}

export function init(ids, options) {
    instance(ids);

    let data = getData(options);

    let axis = xAxis(options.type);

    // 配置 options
    for(let value in myCharts) {
        let option = {};
       
        if(value === 'sumNum'){
            option = sumOption(data, 'sumNum', axis);
        }else {
            option = lineOption(data[value], axis)
        }
        myCharts[value].setOption(option);
        // console.log(option)
    }
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
        let sumOptions =  myCharts.sumNum.getOption();
        if(key !== 'sumNum') {
            options.series[0].data = data[key].data;
            // sumOptions.series
        }else {
            // let len = options.series.length;
            // for(let i = 0; i < len; ++i) {
            //     if(options.series[i].type === 'pie') {
            //         options.series[i].data = getSum(data);
            //     }
            // }
            // options.series[0].data = data;
            // console.log(data)
        }
        options.xAxis[0].data = axis;
        myCharts[key].setOption(options);
    }
}

