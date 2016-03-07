/**
 * Created by KeyserSoze on 05/03/2016.
 */
;(function( $, win, doc, undefined ) {
    var defaultSettings = {
        data:null,
        margin:0
    }
    ,create = function(pane, prefs) {
        var color = {main: '#57091D',negative:'#A3012A', positive: '#097DA3', negative_alt:'#645F14', positive_alt:'#00678A'};
        d3.select(pane).selectAll('svg').remove();
        var svg = d3.select(pane)
            .append('svg')
            .attr('id','HBX-progress')
            .attr('width',$(pane).innerWidth())
            .attr('height',Object.keys(prefs.data.student.course[prefs.data.course.course_number].concept).length*15+100+15);

        var bounds = {width:$('#progress-width-reference').innerWidth()};




        var topArea = svg.append('g')
            .attr('class','top-area')
            .attr('transform',function(d){
                return 'translate('+[$(pane).innerWidth()-bounds.width,0]+')';
            });

            /*.append('rect')
            .attr('width',bounds.width)
            .style('fill','#57091c')
            .style('stroke','#FFFFFF')
            .style('stroke-width','1px')
            .attr('height',100);    // 100 is the height of this area (fixed).*/

        var topArea2 = svg.append('g')
            .attr('class','top-area2')
            .attr('transform',function(d){
                return 'translate('+[$(pane).innerWidth()-bounds.width,100]+')';
            });
        /*topArea2.append('rect')
            .attr('width',bounds.width)
            .attr('height',15)
            .style('fill','#57091c')
            .style('stroke','#FFFFFF')
            .style('stroke-width','1px');*/

        var leftArea = svg.append('g')
            .attr('class','left-area')
            .attr('transform',function(d){
                return 'translate('+[0,(100+15)]+')';
            });
            /*leftArea.append('rect')
            .attr('width',$(pane).innerWidth()-bounds.width)
            .attr('height',Object.keys(prefs.data.student.course[prefs.data.course.course_number].concept).length*15)
            .style('fill','#57091c')
            .style('stroke','#FFFFFF')
            .style('stroke-width','1px');*/

        var bigArea2 = svg.append('g')
            .attr('class','big-area')
            .attr('transform',function(d){
                return 'translate('+[$(pane).innerWidth()-bounds.width,100+15]+')';
            });
        bigArea2.append('rect')
            .attr('width',bounds.width)
            .attr('height',Object.keys(prefs.data.student.course[prefs.data.course.course_number].concept).length*15)
            .style('fill','none')
            .style('stroke','#FFFFFF')
            .style('stroke-width',.5);

        // Calendar
        var cal = [];
        if(!prefs.currDate) prefs.currDate = new Date();
        for(k in prefs.data.student.course[prefs.data.course.course_number].te){
            cal.push(moment(prefs.data.student.course[prefs.data.course.course_number].te[k].release_date,moment.ISO_8601).toDate());
            cal.push(moment(prefs.data.student.course[prefs.data.course.course_number].te[k].due_date,moment.ISO_8601).toDate());
            if(prefs.data.student.course[prefs.data.course.course_number].te[k].delivered)
                cal.push(moment(prefs.data.student.course[prefs.data.course.course_number].te[k].delivered).toDate());
            //cal.push(moment(prefs.currDate).toDate());
        }

        var x = d3.time.scale()
            .domain(d3.extent(cal))
            .range([0,bounds.width]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('top')
            //.ticks(d3.time.days, 1)
            .tickFormat(d3.time.format('%b %d'))
            .tickSize(5)
            .tickPadding(8);

        topArea.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0, ' + 100 + ')')
            .call(xAxis);

        var te = [];
        for(var n = 0; n < Object.keys(prefs.data.student.course[prefs.data.course.course_number].te).length; n++){
            te.push(prefs.data.student.course[prefs.data.course.course_number].te[Object.keys(prefs.data.student.course[prefs.data.course.course_number].te)[n]]);
            te[te.length-1].id=Object.keys(prefs.data.student.course[prefs.data.course.course_number].te)[n];
        }

        var modulesID = topArea
            .append('g')
            .attr('class','modulesID');
        var totalConcepts = 0;

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                var te_delivered = d.te.filter(function(e){ if(e.delivered) return e}).length;
                var te_to_deliver = d.te.length-te_delivered;
                var str = "<div>";
                    str += "<div style='width: 100%;'>Concept nº: "+ d.id+"</div>";
                    str += "<div style='width: 100%;'>Tecaching elements delivered: "+ te_delivered +"/"+ d.te.length+"</div>";
                return str;
            });

        for(var i = 0; i< Object.keys(prefs.data.student.course[prefs.data.course.course_number].module).length;i++){
            var module = prefs.data.student.course[prefs.data.course.course_number].module[Object.keys(prefs.data.student.course[prefs.data.course.course_number].module)[i]];
            module.id = Object.keys(prefs.data.student.course[prefs.data.course.course_number].module)[i];
            var lessons = [];


            modulesID
                .append('text')
                .attr('transform', 'translate(0, ' + 100 + ')')
                .style('fill','#FFFFFF')
                .style('font-family',"'Trade Gothic Bold 2'")
                .style('font-size','10px')
                .style('text-anchor','end')
                .attr('transform',function(){
                    return 'translate('+[x(moment(module.due_date,moment.ISO_8601).toDate())-2,20]+')'
                })
                .text('MODULE ' + module.id );
            modulesID
                .append('line')
                .attr('x1',x(moment(module.due_date,moment.ISO_8601).toDate()))
                .attr('x2',x(moment(module.due_date,moment.ISO_8601).toDate()))
                .attr('y1',20-12)
                .attr('y2',100)
                .style('stroke-width',1)
                .style('stroke','#FFFFFF');


            module.lesson.forEach(function(d) {
                lessons.push(prefs.data.student.course[prefs.data.course.course_number].lesson[d]);
                lessons[lessons.length-1].id = d;
                var concepts = lessons[lessons.length-1].concept;
                lessons[lessons.length-1].concept = [];
                concepts.forEach(function(e){
                    var concept = prefs.data.student.course[prefs.data.course.course_number].concept[e];
                    var tes = concept.te;
                    concept.te = [];
                    tes.forEach(function(f){
                        concept.te.push(prefs.data.student.course[prefs.data.course.course_number].te[f]);
                        concept.te[concept.te.length-1].id = f;
                    });
                    if(concept.te.filter(function(g){
                            if(g.delivered)
                                return g;
                        }).length == concept.te.length)
                        concept.delivered = d3.max(concept.te.map(function(g){return moment(g.delivered).toDate()}));
                    lessons[lessons.length-1].concept.push(concept);
                    lessons[lessons.length-1].concept[lessons[lessons.length-1].concept.length-1].id=e;
                });




            });


            lessons.forEach(function(d){
                var lesson = d;
                bigArea2.append('rect')
                    .attr('class','lesson')
                    .attr('data-module',function(){return module.id;})
                    .attr('data-lesson',lesson.id)
                    .attr('data-concepts',lesson.concept.length)
                    .attr('x',function(){
                        return x(moment(lesson.release_date,moment.ISO_8601).toDate());
                    })
                    .attr('y',function(){ return 15 * totalConcepts;} )
                    .attr('width',function(){
                        return x(moment(lesson.due_date, moment.ISO_8601).toDate()) - x(moment(lesson.release_date,moment.ISO_8601).toDate());
                    })
                    .attr('height',function(){ return lesson.concept.length*15})
                    .style('fill','rgba(255, 255, 255,.2)')
                    .style('stroke','#57091c')
                    .style('stroke-width',.2);
                var txt = leftArea.append('text')
                    .attr('transform',function(){
                        return 'translate('+[$(pane).innerWidth()-bounds.width-30,(15 * totalConcepts + 15 - 2)]+')'
                    })
                    .text('LESSON '+lesson.id)
                    .style('text-anchor','end')
                    .style('fill','#FFFFFF')
                    .style('font-family',"'Trade Gothic Bold 2'")
                    .style('font-size','9px');
                var bo = txt.node().getBBox();
                leftArea.append('line')
                    .attr('x1', $(pane).innerWidth()-bounds.width-30 - bo.width)
                    .attr('x2', $(pane).innerWidth())
                    .attr('y1', (15 * totalConcepts + 15))
                    .attr('y2', (15 * totalConcepts + 15))
                    .style('stroke','#FFFFFF')
                    .style('stroke-width',.3);



                lesson.concept.forEach(function(e,i){
                    e.te.forEach(function(f,j){
                        if(f.delivered){
                            bigArea2.append('line')
                                .attr('class','teachingElement')
                                .attr('data-module',function(){return module.id;})
                                .attr('data-lesson',lesson.id)
                                .attr('data-concept',e.id)
                                .attr('data-te',f.id)
                                .attr('x1', function(){ return x(moment(f.delivered,moment.ISO_8601).toDate()); })
                                .attr('y1', function(){
                                    return 15 * totalConcepts + i * 15 + 8;
                                })
                                .attr('x2', function(){ return x(moment(f.delivered,moment.ISO_8601).toDate()); })
                                .attr('y2', function(){
                                    return 15 * totalConcepts + i * 15 + 10 + 2;
                                })
                                .style('stroke',function(){
                                    if( (x(prefs.currDate) - x(moment(e.release_date,moment.ISO_8601).toDate())) > 0 )
                                        return '#FFFFFF';
                                    else
                                        return color.negative;
                                })
                                .style('stroke-width',1);
                        }
                    });

                    var elBA = bigArea2.append('rect')
                        .attr('class','concept concept-' + e.id)
                        .attr('data-module',function(){return module.id;})
                        .attr('data-lesson',lesson.id)
                        .attr('data-concept',e.id)
                        .attr('x', function(){ return x(moment(e.release_date,moment.ISO_8601).toDate()); })
                        .attr('y', function(){ return 15 * totalConcepts + i * 15 + 10})
                        .attr('height','2')
                        .attr('width', function(){
                            if(e.delivered)
                                return x(e.delivered) - x(moment(e.release_date,moment.ISO_8601).toDate());
                            else
                                if( (x(prefs.currDate) - x(moment(e.release_date,moment.ISO_8601).toDate())) > 0 ) return x(prefs.currDate) - x(moment(e.release_date,moment.ISO_8601).toDate());
                        })
                        .style('fill',function(){
                            if(e.delivered)
                                return '#FFFFFF';
                            else
                                if( (x(prefs.currDate) - x(moment(e.release_date,moment.ISO_8601).toDate())) > 0 ) return color.negative;
                        })
                        .on('mouseover', tip.show)
                        .on('mouseout', tip.hide);

                    $(elBA)[0][0]['__data__'] = e;
                    elBA.call(tip);
                    //console.log(d3.select(elBA.node()).data());

                });


                totalConcepts += lesson.concept.length;

            });



        }

        svg.append('line')
            .attr('class','today')
            .attr('x1',x(moment(prefs.currDate).toDate()) + $(pane).innerWidth()-bounds.width)
            .attr('x2',x(moment(prefs.currDate).toDate()) + $(pane).innerWidth()-bounds.width)
            .attr('y1',40)
            .attr('y2',Object.keys(prefs.data.student.course[prefs.data.course.course_number].concept).length*15+100+15)
            .style('stroke','#FFFFFF')
            .style('stroke-width',1)

    }
    ,api = {
        resize: function(){}
    };
    $.fn.progress = function( opts ) {
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

}(jQuery,d3,moment,window,document));