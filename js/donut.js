/**
 * Created by andreslucas.me on 27/02/2016.
 */

;(function( $, win, doc, undefined ) {
    var defaultSettings = {
            loaded:false
            ,width: 300
            ,height:300
            ,value: 0
            ,innerRadius:70
            ,outerRadius:95
            ,fill:"#FFFFFF"
            ,stroke:"none"
            ,strokeWidth:0
            ,transitionDuration:100
            ,fontFamily:null
            ,fontSize:null
        }
        ,create = function(pane, prefs){
            var data = [prefs.value,100-prefs.value];
            var arc = d3.svg.arc()
                .outerRadius(prefs.outerRadius)
                .innerRadius(prefs.innerRadius);
            var pie = d3.layout.pie()
                .sort(null)
                .value(function(d) { return d; });
            var svg = d3.select(pane)
                .append('svg')
                .attr('height',prefs.height)
                .attr('width',prefs.width)
                .append('g')
                .attr('transform','translate('+prefs.width/2+','+prefs.height/2+')');

            var g = svg.selectAll(".arc")
                .data(pie(data))
                .enter()
                .append("g")
                .attr("class", "arc");
            g.append("path")
                .attr("d", arc)
                .style('fill',function(d,i){
                    return (i==0)? prefs.fill : 'none';
                })
                .style("stroke",prefs.stroke)
                .style("stroke-width",prefs.strokeWidth);
            var txt = svg.append('text')
                .attr("fill",prefs.fill)
                .attr('text-anchor','middle')
                .text(data[0]+'%');
            if(prefs.fontFamily)
                txt.style('font-family',prefs.fontFamily);
            if(prefs.fontSize)
                txt.style('font-size',prefs.fontSize);
            txt.attr('transform','translate(0,'+(-txt.node().getBBox().y/3)+')');
        }
        ,api = {
            resize: function(){}
        };
    $.fn.donut = function( opts ) {
        var settings;
        // handle API method calls
        if ( api[opts] ) {
            return api[opts].call( this );
        }
        // otherwise, initialize the enscroll element

        // use default settings, and overwrite defaults with options passed in
        settings = $.extend( {}, defaultSettings, opts );

        return this.each( function() {
            var $this = $( this),
                pane = this;
            if(!settings.loaded){
                create(pane,settings);
            }
        });
    }

}(jQuery,d3,window,document));