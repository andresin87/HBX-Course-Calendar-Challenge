/**
 * Created by KeyserSoze on 27/02/2016.
 */

function updateBadge(position){
    if(position >-1 && position < 3){
        d3.json('json/badge.json',function(data){
            d3.selectAll('#badge')
                .style('margin-top','-50px')
                .style('margin-right','20px')
                .append('svg')
                .attr('height',65)
                .attr('width',65)
                .style('position','absolute')
                .style('right','40px')
                .style('z-index','2')
                .attr('class','svgBadge');
            d3.selectAll('#badge .svgBadge').append('g').attr('class','svgBadgeG').attr('transform','translate(2,2)scale(.75)');
            d3.selectAll('#badge .svgBadge .svgBadgeG')
                .append('path')
                .attr('class','svgBadgeMedal')
                .attr('d',data.medal)
                .attr('fill',data.colors[position])
                .attr('stroke','#FFFFFF')
                .attr('stroke-width','6');
            d3.selectAll('#badge .svgBadge .svgBadgeG')
                .append('path')
                .attr('class','svgBadgeRibbon')
                .attr('d',data.ribbon)
                .attr('fill','#a41034')
                .attr('stroke','#FFFFFF')
                .attr('stroke-width','6');
        });
    }

}