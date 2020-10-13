d3.csv('wealth-health-2014.csv', d=> {
	return {
	  ...d, // spread operator
      Income: +d.Income,
      Population: +d.Population,
      LifeExpectancy: +d.LifeExpectancy
	}
  }).then(data=>{
	  Data = data
	  console.log('wealth', data);
      //console.log(Data.length)
      var incomeList = []
      for (i = 0; i < Data.length; i++) {
        incomeList.push(Data[i].Income);
      }
      var lifeExpectancyList = []
      for (i = 0; i < Data.length; i++) {
        lifeExpectancyList.push(Data[i].LifeExpectancy);
      }

      var populationList = []
      for (i = 0; i < Data.length; i++) {
        populationList.push(Data[i].Population);
      }

      var regionList = [0,]
      
      for (i = 0; i < Data.length; i++) {
        var flag = 0
          for (x=0; x<regionList.length; x++){
            if (Data[i].Region == regionList[x].Region){
                flag = 1
            }
          }
          if (flag == 0){
              regionList.push(Data[i])
          }
        
    }
      
      const margin = ({top: 25, right: 25, bottom: 25, left: 25})
      const width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
      const svg = d3.select(".chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const color = d3.scaleOrdinal(d3.schemeTableau10)
      const Income = d3
        .scaleLinear()
        .domain(d3.extent(incomeList))
        //.domain([1,10])
        .range([0,width])

      const LifeExpectancy = d3
        .scaleLinear()
        .domain(d3.extent(lifeExpectancyList))
        .range([height,0])
      const Population = d3
        .scaleLinear()
        .domain(d3.extent(populationList))
        .range([5,25])
    

      

      svg.selectAll('.chart')
		.data(Data)
		.enter()
		.append('circle')
		.attr('cx', (d,i)=>Income(d.Income))
		.attr('cy', (d,i)=>LifeExpectancy(d.LifeExpectancy))
        .attr('fill', d=>color(d.Region)) 
        .attr('r',d=>Population(d.Population))
        .attr('opacity', .5)
        .on("mouseenter", (event, d) => {
            const pos = d3.pointer(event, window)
            d3.selectAll('.tooltip')
                .style('display','inline-block')
                .style('position','fixed')
                .style('top', pos[1]+'px')
                .style('left', pos[0]+'px')
                .html(
                    'Country: ' + d.Country + '<br>Region: ' + d.Region +'<br>Population: ' + d3.format(",d")(d.Population) + '<br>Income: ' + d3.format(",d")(d.Income) + '<br>LifeExpentancy: ' + d.LifeExpectancy
                )
        })
        .on("mouseleave", (event, d) => {
            d3.selectAll('.tooltip')
                .style('display','none')
            //console.log("HERE")
        });

      
        const xAxis = d3.axisBottom()
        .scale(Income)
        .ticks(5, "s")
      
      // Draw the axis
      svg.append("g")
        .attr("class", "axis x-axis")
        .call(xAxis)   
        .attr("transform", `translate(0, ${height})`)
    
        const yAxis = d3.axisLeft()
            .scale(LifeExpectancy)
            .ticks(8, "s")
      
      // Draw the axis
      svg.append("g")
        .attr("class", "axis y-axis")
        .call(yAxis)   
        .attr("transform", `0, translate(${width})`)
        
      svg.append("text")
		.attr('x', 400)
		.attr('y', 450)
        .text("Income")
        .attr('font-size',13)
      svg.append("text")
		.attr('x', 10)
        .attr('y', 5)
        .attr('font-size',13)
        .text("Life Expectancy")
        .attr('writing-mode','vertical-lr')

      svg.append("svg")
        .append('g')
        .attr("class", "legend")
        .attr('x', '300px')
        .attr('y','400px')
        .attr('height', '300px')
        .attr('width', '300px')
        
    svg.selectAll('.legend')
        .data(regionList)
        .enter()
        .append('rect')
        .attr('fill', d=>color(d.Region)) 
        .attr('x', 210)
        .attr('y', (d,i)=>(i+1)*25+220)
        .attr('height', '20px')
        .attr('width','20px')
        
        svg.selectAll('.legend')
        .data(regionList)
        .enter()
        .append('text')
        .attr('x', 240)
        .attr('y', (d,i)=>(i+1)*25+235)
        .text(d=>d.Region)

        

    
    }
    )