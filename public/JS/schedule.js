// var d3 = require('d3');


// var weeks = cal.monthdDays(2021, 12);
// var table = d3.select('#calendar');
// var header = table.append('thead');
// var body = table.append('tbody');

// header
//     .append('tr')
//     .selectAll('td')
//     .data(consts.dayNames)
//     .appedn('td')
//     .attr('colspan', 7)
//     .style('text-align', 'center')
//     .text(consts.monthNames[month]);

// weeks.forEach(function(week) {
//     body
//         .append('tr')
//         .selectAll('td')
//         .data(week)
//         .enter()
//         .append('td')
//         .attr('class', function(d) {
//             return d > 0 ? '' : 'empty';
//         })
//         .text(function(d) {
//             return d > 0 ? d : '';
//         })

// })