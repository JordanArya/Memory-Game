

data_keluarga_jauh =  data_keluarga_jauh.filter(check_answer)
data_keluarga_dekat =  data_keluarga_dekat.filter(check_answer)
data_teman_dekat = data_teman_dekat.filter(check_answer)
data_teman_jauh = data_teman_jauh.filter(check_answer)


function check_answer(data){
    return data != null
}

const ctx = document.getElementById('myCharts').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Keluarga Inti', 'Keluarga Jauh', 'Teman Dekat', 'Teman Kerja'],
        datasets: [{
            data: total_data,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 206, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)'
            ],
         
            borderWidth: 5,
            hoverOffset: 20,

        }]
    },
    options: {
       position: 'center',
       responsive: true,
       maintainAspectRatio: true,
       intersect: true,

       onClick: (e) => {
        const points = myChart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
        if (points.length){
        const firstPoint = points[0]
        if (firstPoint.index == 0){
            update_chart_2(data_keluarga_dekat)
        }
         else if (firstPoint.index == 1){
            update_chart_2(data_keluarga_jauh)
        }
          else if (firstPoint.index == 2){
            update_chart_2(data_teman_dekat)
        }
          else if (firstPoint.index == 3){
            update_chart_2(data_teman_jauh)
        }
      
      
    }
}}});



var data = []
var label = []

const ctxs = document.getElementById('Spesific-data').getContext('2d');
const myCharts = new Chart(ctxs, {
    type: 'line',
    data: {
        labels: label,
        datasets: [{
            data: data,
            borderWidth: 5,
            pointRadius: 8,
            pointHitRadius: 10,
            pointHoverBackgroundColor: 'rgb(255,0,0)',

           
            fill: {
                target: 'origin',
                above: set_color(data),   // Area will be red above the origin
                below: set_color(data)    // And blue below the origin
            },

        }],


    }
   }
)

function update_chart_2(datas){
    var labels = []
    data =  datas

    for (let i = 0; i < datas.length; i++) {
        text = "Percobaan_"+(i+1)
        labels.push(text)
    }
    
    myCharts.data.datasets[0].data = data
    myCharts.data.labels = labels

    if(data.length>20){
        myCharts.data.datasets[0].pointRadius = 1
    }

    myCharts.data.datasets[0].fill['above'] = set_color(data)
   
    myCharts.update()
}

function set_color(data){
    if(data[0] > data[data.length-1]){
        color = 'rgba(255, 0, 0, 0.5)'
    }

    else{
        color = 'rgba(0, 0, 255, 0.5)'
    }

    return color
}






