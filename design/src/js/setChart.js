import echarts from 'echarts';

export default function init(ref, options) {
    // 初始化 canvas 宽度
    const canvas = document.getElementById('individual');
    canvas.width = ref.clientWidth * 0.9;

    // 创建 echarts 实例
    let myChart = echarts.init(canvas);

    // 计时器
    let timer;
console.log(options)
    let text = options.id;

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
                data : ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
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
                data:[11, 11, 15, 13, 12, 13, 10, 11, 11, 15, 13, 12],
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
                data:[1, 2, 2, 5, 3, 2, 0,1, 2, 2, 5, 3],
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
                data:[5, 4, 3, 5, 6, 9, 6, 5, 4, 3, 5, 6],
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
    function resize() {
        clearTimeout(timer);
        timer = setTimeout(() => {
            canvas.width = ref.clientWidth * 0.9;
        }, 500)
    }
} 
