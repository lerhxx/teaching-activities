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

/*
 * @method instance: 创建图表
 * @param {Array} ids: 需创建的图表 id
 * @return {void}
 */
function instance(ids) {
    ids.forEach((value, i) => {
        // 实例化 echarts     
        myCharts[value] = echarts.init(document.getElementById(value));
    })
}

// 横轴
let axis = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
/*
 * @method xAxis: 设置横轴
 * @param {Number} range: 横轴范围，1：上半年，2：下半年，其它：全年
 * @return {Array}
 */
function xAxis(range) {
    if(range == 1) {
        return axis.slice(0, 6);
    }else if(range == 2) {
        return axis.slice(6);
    }else {
        return axis;
    }
}

 /*
 * @method getData: 处理数据
 * @param {Object} opt: [{
 * 						startTime: String,   活动开始时间
 * 						type: String    活动信息类型
 * 				   }]
 * @return {Object} count
 */
function getData(opt) {
    // console.log(opt)
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

 /*
 * @method sumOption: 'sumNum' 柱状图
 * @param {Object} data: count
 * @param {String} type: 图表类型 'sumNum'
 * @param {Array} xAxis: 横坐标
 * @return {Object} 图表配置项
 */
function sumOption(data, type, xAxis) {
    let series = [];
    for(let key in data) {
        if(key === type) {
            continue;
        }
        // console.log(data)
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
                dataView : {
                    show: true, 
                    readOnly: true,
                    optionToContent: (opt) => {
                        let axisData = opt.xAxis[0].data;
                        let series = opt.series;
                        let table = `<table>
                                        <theader>
                                            <th>
                                            </th>
                                            <th>
                                                ${series[0].text}
                                            </th>
                                            <th>
                                                ${series[1].text}
                                            </th>
                                            <th>
                                                ${series[2].text}
                                            </th>
                                        </theader>
                                        <tbody>`;
                        for(let i = 0, len = axisData.length; i < len; ++i) {
                            table += `<tr>
                                        <td>
                                            ${axisData[i]}
                                        </td>
                                        <td>
                                            ${series[0].data[i] || 0}
                                        </td>
                                        <td>
                                            ${series[1].data[i] || 0}
                                        </td>
                                        <td>
                                            ${series[2].data[i] || 0}
                                        </td>
                                      </tr>`;
                        }
                        table += '</tbody></table>';
                        return table;
                    }
                },
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

 /*
 * @method liquid: 'itemNum' 水球图
 * @param {Object} opt: [{
 *                      salonNum: {
 *                          data: String,
 *                          name: String,
 *                          text: String
 *                      },
 *                      scientNum: {...},
 *                      teachNum: {...}
 *                 }]
 * @return {Object} 图表配置项
 */
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

 /*
 * @method getPercent: 获取各项百分比
 * @param {Object} data: count
 * @return {Object} 图表配置项
 */
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

 /*
 * @method init: 初始化
 * @param {Array} ids: 需要创建的图表id
 * @param {Array} options: [{
 * 						startTime: String,   活动开始时间
 * 						type: String    活动信息类型
 * 				  }]
 * @return {void}
 */
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

 /*
 * @method refresh: 更新图表
 * @param {Object} options: [{
 * 						startTime: String,   活动开始时间
 * 						type: String    活动信息类型
 * 				   }]
 * @return {void}
 */
export function refresh(options) {
    if(isEmpty(myCharts)) {
        return;
    }
    console.log(myCharts + ' myCharts')

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

