import echarts from 'echarts';

export default function init(ref, id, options) {
    // 初始化 canvas 宽度
    const canvas = document.getElementById(id);
    canvas.width = ref.clientWidth * 0.9;

    // 创建 echarts 实例    
    let myChart = echarts.init(canvas);

    // 计时器
    let timer;

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
    function getDate(opt) {
        let count = {
            teachNum: {
                sum: 0,
                data: []
            },
            scientNum: {
                sum: 0,
                data: []
            },
            salonNum: {
                sum: 0,
                data: []
            }
        },
        mon = '',
        time,
        type;
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
            count[type].data[mon] = count[type].data[mon] ? count[type].data[mon] + 1 : 1;
            count[type].sum += 1;
        })
        console.log(count)
        return count;
    }
    let data = getDate(options);
    console.log(data.salonNum.data[5])


    // 配置 options
    myChart.setOption({
        title : {
            text: '我参与会议统计',
            subtext: ''
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['教学讨论会' ,'科研研讨会' ,'学术沙龙']
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
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : xAxis(options.type)
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value}'
                }
            }
        ],
        series : [
            {
                name:'教学讨论会',
                type:'line',
                data: data.teachNum.data,
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
            },
            {
                name:'科研研讨会',
                type:'line',
                data: data.scientNum.data,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                }
            },
            {
                name:'学术沙龙',
                type:'line',
                data: data.salonNum.data,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                }
            }
        ]
    });

    window.addEventListener('resize', () => {
        // resize();
        myChart.resize()
    })
    // function resize() {
    //     clearTimeout(timer);
    //     timer = setTimeout(() => {
    //         canvas.width = ref.clientWidth * 0.9;
    //     }, 500)
    // }
} 
