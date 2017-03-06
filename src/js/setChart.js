import echarts from 'echarts';

export default function init(ref) {
    // 初始化 canvas 宽度
    const canvas = document.getElementById('individual');
    canvas.width = ref.clientWidth * 0.9;

    // 创建 echarts 实例
    let myChart = echarts.init(canvas);

    // 计时器
    let timer;

    // 配置 options
    myChart.setOption({
        title: { text: 'ECharts 入门示例' },
        tooltip: {},
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
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
