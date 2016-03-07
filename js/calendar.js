/**
 * Created by KeyserSoze on 02/03/2016.
 */
;(function( $, win, doc, undefined ) {
    var defaultSettings = {
            data:null,
            margin:0
        }
        ,create = function(pane, prefs){
            var color = {main: '#57091D',negative:'#A3012A', positive: '#097DA3', negative_alt:'#645F14', positive_alt:'#00678A'};
            if(!prefs.data || !(prefs.startDate)){
                return null;
            }
            if(!prefs.endDate)  prefs.endDate = new Date();
            var numWeeks = Math.trunc(moment.duration(moment(prefs.endDate).diff(moment(prefs.startDate))).asWeeks());
            if(moment(prefs.startDate).weekday()!=0)
                numWeeks++;

            var cellHeight = (($(pane).innerHeight()-40)-prefs.margin*2)/7;
            var cellWidth;
            if(($(pane).innerWidth()-prefs.margin*2)<numWeeks*cellHeight){
                cellWidth=cellHeight;
            }else{
                cellWidth=($(pane).innerWidth()-prefs.margin*2)/numWeeks;
            }
            var percent = d3.format(".1%"),
            format = d3.time.format("%Y-%m-%d");
            var getWeekNum =function(start, mom){
                var n = Math.trunc(moment.duration(moment(mom).diff(moment(start))).asWeeks());
                if(moment(mom).weekday()<moment(start).weekday()) n++;
                if(moment(mom)<moment(start))   n--;
                //if(moment(mom).week()==1) n++;
                return n;
            };
            var enumerateDaysBetweenDates = function(startDate, endDate) {
                var dates = [];

                var currDate = moment(startDate).clone().startOf('day');
                var lastDate = moment(endDate).clone().startOf('day');
                dates.push(currDate.clone().toDate());
                while(currDate.add(1,'days').diff(lastDate) <= 0) {
                    //console.log(currDate.toDate());
                    dates.push(currDate.clone().toDate());
                }

                return dates;
            };
            var enumerateMonthsBetweenDates = function(startDate, endDate) {
                var dates = [];

                var currDate = moment(startDate).clone().startOf('month');
                var lastDate = moment(endDate).clone().startOf('date');

                dates.push(currDate.clone().toDate());
                while(currDate.add(1,'months').diff(lastDate) <= 0) {
                    //console.log(currDate.toDate());
                    dates.push(currDate.clone().toDate());
                }

                return dates;
            };
            var drag = d3.behavior.drag()
                .on("drag", function(d,i) {
                    var bounds = d3.select(this).node().getBBox();
                    var pos = d3.transform(d3.select(this).attr('transform'));
                    var newpos = [
                            pos.translate[0]+d3.event.dx
                        ,
                        0
                    ];
                    if(newpos[0]>0) newpos[0]=0;
                    if(newpos[0]<-(bounds.width-$('svg#HBX-calendar').innerWidth()))  newpos[0]=-(bounds.width-$('svg#HBX-calendar').innerWidth());
                    d3.select(this).attr("transform", function(d,i){
                        if(($(pane).innerWidth()-prefs.margin*2)<numWeeks*cellHeight)
                            return "translate(" + newpos + ")";
                    })
                });
            var enumDates = enumerateDaysBetweenDates(prefs.startDate, prefs.endDate);
            var enumMonths = enumerateMonthsBetweenDates(prefs.startDate, prefs.endDate);
            var teCal = {};
            var currModule = {};
            if(prefs.data){
                for (var d in prefs.data.student.course[prefs.data.course.course_number].te){
                    var date;
                    var status = false;
                    if(prefs.data.student.course[prefs.data.course.course_number].te[d].delivered) {
                        date = moment(prefs.data.student.course[prefs.data.course.course_number].te[d].delivered, moment.ISO_8601).format('YYYY MM DD');
                        status = true;
                    }else{
                        date = moment(prefs.data.student.course[prefs.data.course.course_number].te[d].due_date, moment.ISO_8601).format('YYYY MM DD');
                    }
                    if (!teCal[date]) {
                        teCal[date] = {delivered:[], to_deliver:[]};
                    }

                    (status) ? teCal[date].delivered.push(prefs.data.student.course[prefs.data.course.course_number].te[d]) : teCal[date].to_deliver.push(prefs.data.student.course[prefs.data.course.course_number].te[d]);
                    if(status){
                        teCal[date].delivered[teCal[date].delivered.length - 1].te_number = parseInt(d);
                        teCal[date].delivered[teCal[date].delivered.length - 1].status = status
                    }else{
                        teCal[date].to_deliver[teCal[date].to_deliver.length - 1].te_number = parseInt(d);
                        teCal[date].to_deliver[teCal[date].to_deliver.length - 1].status = status
                    }
                }
                for (var d in teCal){
                    if(teCal[d].to_deliver.length>0 && !currModule.module)
                        currModule = prefs.data.student.course[prefs.data.course.course_number].te[teCal[d].to_deliver[0].te_number];
                }
            }
            d3.select(pane).selectAll('svg').remove();
            var svg = d3.select(pane)
                .append('svg')
                .attr('id','HBX-calendar')
                .attr('height',$(pane).innerHeight()-prefs.margin)
                .attr('width',$(pane).innerWidth()-prefs.margin)
                .append('g')
                .attr('transform','translate('+prefs.margin+','+prefs.margin+')')
                .call(drag);

            var module = [];
            for( var k in prefs.data.student.course[prefs.data.course.course_number].module ){
                module.push(prefs.data.student.course[prefs.data.course.course_number].module[k]);
                module[module.length-1].id = k;
            }
            if(prefs.data){
                var modules = svg.append('g')
                    .attr('class','modules')
                    .selectAll('g.module')
                    .data(module)
                    .enter()
                    .append('g')
                    .attr('class',function(d){
                        if(d.id == currModule.module)   return "module active module_" + d.id;
                        return "module module_" + d.id;
                    })
                    .append('path')
                    .attr('d',function(d){
                        return modulePath(d.release_date, d.due_date);
                    });
            }

            var days = svg.selectAll('.day')
                .data(enumDates)
                .enter()
                .append('g')
                .attr('class','day')
                .attr('transform',function(d){
                    return 'translate('+getWeekNum(prefs.startDate,d    )*cellWidth+','+ moment(d).weekday()*cellHeight +')';
                })
                .on("mouseover", function(){

                    var el = d3.select(d3.event.currentTarget);
                    if(!el.classed('day'))
                        el = d3.select(el).parentNode;
                    var dat = teCal[moment(el.data()[0]).format('YYYY MM DD')];

                    if(dat){
                        var svg = d3.select('body')
                            .append('svg')
                            .attr('class','calendar-tooltip')
                            .style('z-index', '10')
                            .style('position', 'absolute');


                        tooltip = svg.append('g')

                            .attr('class','tooltip-text');
                        tooltip.append('text')
                            .style('font-family', '"Trade Gothic Bold 2"')
                            .style('font-size', function(d){return 10})
                            .style('text-anchor','start')
                            .style('fill','#57091D')
                            .attr('transform','translate('+[2,12]+')')
                            .text(function(d){
                                if(dat.delivered.length>0)
                                    return 'Delivered: ' + dat.delivered.length + ' teaching elements.';
                                else
                                    return 'To deliver: ' + dat.to_deliver.length + ' teaching elements.';
                            });
                            if(dat.delivered.length==0 && dat.to_deliver.length>0){
                                tooltip.append('text')
                                    .style('font-family', '"Trade Gothic Bold 2"')
                                    .style('font-size', function (d) {
                                        return 10
                                    })
                                    .style('text-anchor', 'start')
                                    .style('fill', '#57091D')
                                    .attr('transform', 'translate(' + [2, 25] + ')')
                                    .text(function (d) {
                                        var a = moment(el.data()[0]);
                                        var t = moment(el.data()[0]).clone().endOf('day');
                                        var range = moment.range(moment(prefs.currDate),moment(el.data()[0]).endOf('day'));
                                        var str= 'Time left: ';
                                        if(range.diff('days')!=0)
                                            str += range.diff('days') + ' days';
                                        if(range.diff('days')==0 && range.diff('hours')>0)
                                            str += range.diff('hours') + ' hours';
                                        return str;
                                    });
                            }
                            //if(dat.delivered.length>0) {
                            if(dat.delivered.length>0 && dat.to_deliver.length>0){
                                tooltip.append('text')
                                    .style('font-family', '"Trade Gothic Bold 2"')
                                    .style('font-size', function (d) {
                                        return 10
                                    })
                                    .style('text-anchor', 'start')
                                    .style('fill', '#57091D')
                                    .attr('transform', 'translate(' + [2, 25] + ')')
                                    .text(function (d) {
                                        if(dat.delivered.length>0)
                                            return 'To deliver: ' + dat.to_deliver.length + ' teaching elements.';
                                        else{
                                            var range = moment.range(moment(prefs.currDate),moment(d3.select(el).data()[0]).endOf('day'));
                                            var str= 'Time left: ';
                                            if(range.diff('days')!=0)
                                                str += range.diff('days') + ' days';
                                            if(range.diff('days')==0 && range.diff('hours')>0)
                                                str += range.diff('hours') + ' hours';
                                            return str;
                                        }
                                    });
                                if(dat.delivered.length>0){
                                    tooltip.append('text')
                                        .style('font-family', '"Trade Gothic Bold 2"')
                                        .style('font-size', function (d) {
                                            return 10
                                        })
                                        .style('text-anchor', 'start')
                                        .style('fill', '#57091D')
                                        .attr('transform', 'translate(' + [2, 40] + ')')
                                        .text(function (d) {
                                            var a = moment(el.data()[0]);
                                            var t = moment(el.data()[0]).clone().endOf('day');
                                            var range = moment.range(moment(prefs.currDate),moment(el.data()[0]).endOf('day'));
                                            var str= 'Time left: ';
                                            if(range.diff('days')!=0)
                                                str += range.diff('days') + ' days';
                                            if(range.diff('days')==0 && range.diff('hours')>0)
                                                str += range.diff('hours') + ' hours';
                                            return str;
                                        });
                                }

                            }
                            var bounds = tooltip.node().getBBox();
                            svg.insert('path',':first-child')
                                .style('fill','#FFFFFF')
                                .attr('d',function(d){
                                    return 'M 0,0 ' +

                                        ' V ' + (10 + bounds.height + bounds.y * 2) +
                                        ' H ' + 1 +
                                        ' V ' + ( + bounds.height + bounds.y * 2) +
                                        ' H ' + (bounds.width + bounds.x * 2) +
                                        ' V ' + 0 +
                                        ' Z';
                            });
                            bounds = svg.node().getBBox();
                            svg
                                .attr('height', 10 + bounds.height + bounds.y * 2)
                                .attr('width', bounds.width + bounds.x * 2)
                                .style('display','inherit')
                                .style('top',$(el.node()).offset().top-$(el.node()).height()-bounds.height)
                                .style('left',$(el.node()).offset().left);
                    }


                })
                .on("mousemove", function(){
                    //d3.select('svg.calendar-tooltip')
                    //    .style('top',d3.mouse(d3.select('body').node())[1]-7)
                    //    .style('left',$(d3.event.srcElement).offset().left - $(window).scrollLeft());
                })
                .on("mouseout", function(){
                    d3.selectAll('svg.calendar-tooltip').remove();
                });
            days.append('path')
                .attr('fill',function(d){

                    if(teCal[moment(d).format('YYYY MM DD')]){
                        if(teCal[moment(d).format('YYYY MM DD')].to_deliver.length>0){
                            return color.negative;
                        }
                        if(teCal[moment(d).format('YYYY MM DD')].delivered.length>0){
                            return color.positive_alt;
                        }
                    }
                })
                .attr('opacity','1')
                .attr('d',function(d){
                    if(teCal[moment(d).format('YYYY MM DD')]){
                        return 'M 0,'+(cellHeight/2)+' V ' + (cellHeight) + ' H ' + cellHeight/2 + ' Z';
                    }
                });

            days.append('path')
                .attr('d',function(d){
                    if(teCal[moment(d).format('YYYY MM DD')]){
                        return 'M 0,0 ' +
                            'V '+ cellHeight/2 +
                            ' L ' + cellHeight/2 + ','+ cellHeight +
                            ' H ' + cellWidth +
                            ' V ' + 0 +
                            'Z';
                    }
                    else{
                        return 'M 0,0 ' +
                            'V '+ cellHeight +
                            ' H ' + cellWidth +
                            ' V ' + 0 +
                            'Z';
                    }
                })
                .attr('fill',function(d){
                    if(!prefs.currDate){
                        prefs.currDate = new Date();
                    }
                    var x = (moment.range(moment(prefs.currDate).clone().startOf('day'),moment(d).clone().startOf('day')).diff('days'));
                    switch (true){
                        case (x<0):
                            return 'rgba(255,255,255,.4)';
                            break;
                        case (x==0):
                            return 'rgba(255,255,255,.9)';
                            break;
                        case (x>0):
                            return 'rgba(255,255,255,.7)';
                            break;
                    }
                    //return 'rgba(255,255,255,.7)';
                })
                .attr('stroke','#57091c')
                .attr('stroke-width',1)
            days.append('text')
                .attr('x', function(d){return cellWidth-3})
                .attr('y', function(d){return cellHeight-10})
                .attr('fill', function(d){return '#57091c'})
                .style('font-family', '"Trade Gothic Bold 2"')
                .style('font-size', function(d){return 10})
                .style('text-anchor','end')
                .text(function(d){
                    return moment(d).date();
                });



            function modulePath(t0,t1) {
                d0 = moment(t0,moment.ISO_8601).toDate().getDay(), w0 = getWeekNum(prefs.startDate, moment(t0,moment.ISO_8601).toDate()),
                d1 = moment(t1,moment.ISO_8601).toDate().getDay(), w1 = getWeekNum(prefs.startDate, moment(t1,moment.ISO_8601).toDate());
                return "M" + (w0 + 1) * cellWidth + "," + d0 * cellHeight
                    + "H" + w0 * cellWidth + "V" + 7 * cellHeight
                    + "H" + w1 * cellWidth + "V" + (d1 + 1) * cellHeight
                    + "H" + (w1 + 1) * cellWidth + "V" + 0
                    + "H" + (w0 + 1) * cellWidth + "Z";
            }

            var monthPanel = svg.append('g')
                .attr('transform','translate('+0+','+($(pane).innerHeight()-40-prefs.margin)+')');
            var monthElems = monthPanel.selectAll('.panelMonth')
                    .data(enumMonths).enter()
                    .append('g')
                    .attr('transform',function(d){
                        return 'translate('+[getWeekNum(prefs.startDate, d)*cellWidth,0]+')'
                    });
            monthElems[0].forEach(function(mp,i){
                d3.select(mp).append('line')
                    .attr('x1',1)
                    .attr('x2',1)
                    .attr('y1',function(d){
                        return -(7-moment(d).weekday())*cellHeight;
                    })
                    .attr('y2',35)
                    .style('stroke','#FFFFFF')
                    .style('stroke-width',1)
                    .style('opacity',1);
                d3.select(mp).append('line')
                    .attr('x1',1)
                    .attr('x2',20)
                    .attr('y1',35)
                    .attr('y2',35)
                    .style('stroke','#FFFFFF')
                    .style('stroke-width',1)
                    .style('opacity',1);
                d3.select(mp).append('text')
                    .style('fill','#FFFFFF')
                    .attr('transform','translate(2,33)')
                    .style('opacity',.5)
                    .style('font-family', '"Trade Gothic Bold 2"')
                    .style('font-size', function(d){return 10})
                    .style('text-anchor','start')
                    .text(function(d){
                        return moment(d).format('MMM');
                    });
                d3.select(mp).append('text')
                    .style('fill','#FFFFFF')
                    .attr('transform','translate(2,21)')
                    .style('opacity',.5)
                    .style('font-family', '"Trade Gothic Bold 2"')
                    .style('font-size', function(d){return 10})
                    .style('text-anchor','start')
                    .text(function(d){
                        return (moment(d).format('MMM')=='Jan') ? moment(d).format('YYYY') : (i==0) ? moment(d).format('YYYY') : null;
                    });
            });


    }
        ,api = {
        resize: function(){}
    };
    $.fn.calendar = function( opts ) {
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