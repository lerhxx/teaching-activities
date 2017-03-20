import echarts from 'echarts';
import liquidfill from './echarts-liquidfill.min.js';
import {isEmpty} from './common.js';

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

let shapes = {
    'teachNum': 'path://M225.958294 3.489165c13.258825 0 26.587434 0 39.846259 0 11.44446 2.233065 22.819136 5.72223 34.333379 6.489846 123.027941 8.164645 235.448821 48.080687 341.170506 110.257598C665.034755 134.123484 673.269184 149.894507 673.1994 177.179774c-0.976966 269.503067-0.558266 539.075917-0.697833 808.578983 0 12.212076-1.535232 24.424152-2.442415 38.241243-45.847622-20.237154-85.90323-40.893008-127.982554-55.896415-149.406024-53.384217-303.417746-58.617964-459.453182-41.032575-64.89846 7.327245-78.924901-6.071146-78.924901-70.341556-0.069783-249.614829-0.069783-499.229658 0-748.844487 0-55.477716 9.071828-68.596974 62.316478-78.924901C118.98051 18.632138 172.64386 11.793376 225.958294 3.489165z M1126.65122 3.489165c13.258825 0 26.587434 0 39.846259 0 50.872019 7.745945 102.092954 13.607742 152.476489 23.586752 69.155241 13.747308 72.993322 19.958021 72.993322 89.671528 0.069783 236.356004 0.069783 472.642224 0 708.998228 0 106.349734-5.861796 108.303666-111.513698 98.254873-185.274635-17.655172-365.734224-0.279133-532.725637 91.695243-6.280496 3.489165-13.817091 4.67548-21.63282 7.187679-1.605016-6.629413-3.279815-10.327927-3.279815-14.026441-0.20935-281.505793-0.558266-562.941802 0.558266-844.447594 0.069783-12.560992 11.23511-30.913998 22.330653-36.706011 57.501431-29.657898 114.653946-62.456045 175.853891-81.995366C987.782472 24.703285 1058.124029 17.027123 1126.65122 3.489165z',
    'scientNum': 'path://M666.917873 517.739524c0-5.911956-0.985326-11.57758-1.675054-17.243204L665.242819 317.521289c23.204426-5.123695 40.546163-25.717007 40.546163-50.448689 0-28.623719-23.15516-51.729613-51.680346-51.729613L509.413519 215.342988C503.797161 186.029541 479.262545 163.465576 448.274044 163.465576c-30.939235 0-55.523118 22.563964-61.139476 51.877412L369.842098 215.342988c-28.574453 0-51.729613 23.105894-51.729613 51.729613 0 24.731682 17.440269 45.324994 40.595429 50.448689l0 182.97503c-0.738994 5.616358-1.773587 11.281982-1.773587 17.243204L127.993842 893.148713c0 72.273659 58.528362 130.851287 130.851287 130.851287l506.260476 0c72.273659 0 130.851287-58.577628 130.851287-130.851287L666.917873 517.739524zM350.923839 820.037527c-30.052442 0-54.439259-24.386817-54.439259-54.389993 0-30.052442 24.386817-54.439259 54.439259-54.439259 30.003175 0 54.389993 24.386817 54.389993 54.439259C405.363098 795.65071 380.976281 820.037527 350.923839 820.037527zM507.886264 918.914987c-26.554535 0-48.03464-21.529372-48.03464-48.083907 0-26.505268 21.529372-48.03464 48.03464-48.03464s48.03464 21.529372 48.03464 48.03464C555.920904 897.385615 534.440799 918.914987 507.886264 918.914987zM537.741641 712.3414c-44.290402 0-80.205533-35.915131-80.205533-80.156267s35.915131-80.205533 80.205533-80.205533c44.241135 0 80.156267 35.915131 80.156267 80.205533S582.032042 712.3414 537.741641 712.3414zM596.122204 78.234881c23.795622 0 43.108011 19.312389 43.108011 43.108011S619.917825 164.450902 596.122204 164.450902 553.014193 145.138513 553.014193 121.342892 572.326582 78.234881 596.122204 78.234881zM471.8726 0c20.987443 0 37.984316 16.996873 37.984316 37.984316S492.860043 75.968631 471.8726 75.968631 433.888285 58.971758 433.888285 37.984316 450.885158 0 471.8726 0z',
    'salonNum': 'path://M443.479417 72.680323c-243.652276 0-441.168792 162.921603-441.168792 363.895871 0 65.902966 23.000853 125.83187 56.242955 177.585581 21.274536 33.124422 63.044872 106.293885-37.978986 253.043157 65.376986-61.391209 167.093623-106.285698 303.905568-81.003895C651.512451 846.63443 884.649232 650.626267 884.649232 436.576193 884.649232 235.601926 687.131693 72.680323 443.479417 72.680323z'
}

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
            center: [`${i++*30 - 10}%`, '35%'],
            radius: '65%',
            outline: {
                show: false
            },
            // shape: shapes[value.text],
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

