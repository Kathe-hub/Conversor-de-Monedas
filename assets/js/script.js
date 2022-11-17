let valor_pesos_chilenos = document.querySelector('#valor_pesos_chilenos');
let moneda_a_convertir = document.querySelector('#moneda_a_convertir');
let btn = document.querySelector('#buscar');
let resultado = document.querySelector('#resultado')
let grapharea = document.querySelector('#grafico').getContext('2d');
let myChart;

btn.addEventListener('click', async() => {
    let valor_moneda = await obtenerValorMoneda(moneda_a_convertir.value);
    let resultado_conversion = parseFloat(valor_pesos_chilenos.value/valor_moneda);
    resultado_conversion = resultado_conversion.toFixed(2);
    resultado.innerHTML = `Resultado: ${resultado_conversion}`;
    if (myChart != undefined){
    myChart.destroy();
    }
    graficar(moneda_a_convertir.value);
});

async function obtenerValorMoneda(tipo_moneda){
    try{
        const respuesta = await fetch('https://mindicador.cl/api/');
        const data = await respuesta.json();
        return data[tipo_moneda].valor;
        
    } catch (error) {
        alert(error.message);
    }
}

async function obtenerSerieMoneda(tipo_moneda, num_elementos = 10) {
    try{
        const respuesta = await fetch('https://mindicador.cl/api/'+tipo_moneda);
        const data = await respuesta.json();
        return (data.serie).slice(0, num_elementos);
    } catch(error) {
        alert(error.message);
    }
}

async function graficar(tipo_moneda) {
    let serie = await obtenerSerieMoneda(tipo_moneda);
    serie = serie.reverse();
    let etiquetas = serie.map((e) => {
        return e.fecha;
    });
    let datos = serie.map((e) => {
        return e.valor;
    });


const data = {
    labels: etiquetas,
    datasets: [{
      label: 'Valor',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: datos,
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };



  myChart = new Chart(
    grapharea,
    config
  );

}

  
  





