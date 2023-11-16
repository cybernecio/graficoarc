// Datos ficticios (en lugar de datos reales de Arctic Monkeys)
const albumSalesData = [
  { album: "Whatever People Say I Am...", sales: 5000000 },
  { album: "Favourite Worst Nightmare", sales: 4000000 },
  { album: "Humbug", sales: 3000000 },
  { album: "Suck It and See", sales: 3500000 },
  { album: "AM", sales: 6000000 }
  // Agrega más datos según lo que desees mostrar
];

// Ancho y altura del gráfico
const width = 800;
const height = 400;

// Crear el elemento SVG
const svg = d3.select("#chart")
              .attr("width", width)
              .attr("height", height);

// Escala X para los nombres de los álbumes
const xScale = d3.scaleBand()
                 .domain(albumSalesData.map(d => d.album))
                 .range([0, width])
                 .padding(0.1);

// Escala Y para las ventas de álbumes
const yScale = d3.scaleLinear()
                 .domain([0, d3.max(albumSalesData, d => d.sales)])
                 .range([height, 0]);

// Crear las barras del gráfico
svg.selectAll(".bar")
   .data(albumSalesData)
   .enter()
   .append("rect")
   .attr("class", "bar")
   .attr("x", d => xScale(d.album))
   .attr("y", d => yScale(d.sales))
   .attr("width", xScale.bandwidth())
   .attr("height", d => height - yScale(d.sales))
   .on("mouseover", (event, d) => {
     const tooltip = document.getElementById("tooltip");
     tooltip.style.display = "block";
     tooltip.style.left = event.pageX + "px";
     tooltip.style.top = event.pageY + "px";
     tooltip.innerHTML = `${d.album}: ${d.sales} sales`;
   })
   .on("mouseout", () => {
     const tooltip = document.getElementById("tooltip");
     tooltip.style.display = "none";
   });
