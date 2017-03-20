import echarts from 'echarts';
import liquidfill from './echarts-liquidfill.min.js';

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
        color: '#8bc34a',
        sum: 0
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
        count[k].sum = 0;
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
        ++count.sumNum.sum;
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

// 'sumNum'图表
function sumOption(data, type, xAxis) {
    let series = [];
    for(let key in data) {
        if(key === type) {
            continue;
        }
        let value = data[key];
        series.push({
            name: value.text,
            text: value.name,
            type: 'bar',
            stack: 'sum',
            areaStyle: {
                normal: {}
            },
            data: value.data
        })
    }
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
            trigger: 'axis'
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
                type : 'value'
            }
        ],
        series : series
    }
}
// 'itemNum'水球图
function liquid(opt) {
    let series = [],
        i = 1;
    for(let key in opt) {
        let value = opt[key];

        series.push({
            name: value.name,
            text: value.text,
            type: 'liquidFill',
            // data: [(value.data / sum).toFixed(2)],
            data: [value.data],
            center: [`${i++*30 - 10}%`, '50%'],
            radius: '65%',
            outline: {
                show: false
            },
            label: {
                normal: {
                    formatter: param => `${param.seriesName }\n\n${(param.value*100).toFixed(0)}%`,
                    textStyle: {
                        fontSize: 20
                    }
                }
            }
        })
    }
    return {
        series: series
    }
}
// 获取各项百分比
function getPercent(data) {
    let percent = {};

    for(let key in data) {
        if(key === 'sumNum') {
            continue;
        }

        let itemData = 0;
        // 确保除数 > 0
        if(data.sumNum.sum > 0) {
            itemData = (data[key].sum / data.sumNum.sum).toFixed(2);
        }
        percent[key] = {
            text: data[key].name,
            name: data[key].text,
            data: itemData
        }
    }

    return percent;
}

export function init(ids, options) {
    instance(ids);

    let data = getData(options);

    let axis = xAxis(options.type);

    // 配置 options
    for(let value in myCharts) {
        let option = {};
        // 处理数据
         let percent = getPercent(data);

        if(value === 'sumNum'){
            option = sumOption(data, 'sumNum', axis);
        }else if(value === 'itemNum'){
            option = liquid(percent)
        }
        myCharts[value].setOption(option);
    }
} 

export function refresh(options) {
    if(isEmpty(myCharts)) {
        return;
    }
    let data = getData(options);
    let axis = xAxis(options.type);
    let percent = getPercent(data);

    for(let key in myCharts) {
        let opt = myCharts[key].getOption();

        if(key === 'sumNum') {
            opt.series.forEach(value => {
                value.data = data[value.text].data;
            })
            opt.xAxis[0].data = axis;
        }else {
            opt.series.forEach(value => {
                let fixData = percent[value.text].data;
                value.data = [fixData];
            })
        }
        myCharts[key].setOption(opt);
    }
}

