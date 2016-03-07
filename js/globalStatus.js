/**
 * Created by KeyserSoze on 07/03/2016.
 */
function globalStatus(data){
    var course = data.student.course[data.course.course_number];

    var te = {delivered:[], to_deliver:[]};
    Object.keys(course.te).forEach(function(d){

        if(course.te[d].delivered){
            te.delivered.push(course.te[d]);
        }else{
            te.to_deliver.push(course.te[d]);
        }

    });

    $('#donut-sup-el-te').text(te.delivered.length);
    $('#donut-sub-el-te').text(te.delivered.length+te.to_deliver.length);

    $("#info-student-general-te-donut").empty();
    $("#info-student-general-te-donut").donut({
        value: Math.floor((te.delivered.length/(te.delivered.length+te.to_deliver.length)*100)*10)/10
        , height:80
        , width:80
        , fill: '#FFFFFF'
        , stroke : '#FFFFFF'
        , strokeWidth : 1.2
        , fontFamily : '"Trade Gothic Bold 2"'
        , fontSize: "15px",
        innerRadius:25
        ,outerRadius:35
    });

    var module = {delivered:[], to_deliver:[]};
    Object.keys(course.module).forEach(function(d){
        var te = {delivered:[], to_deliver:[]};
        course.module[d].te.forEach(function(e){
            if(course.te[e].delivered){
                te.delivered.push(course.te[e]);
            }else{
                te.to_deliver.push(course.te[e]);
            }
        });

        if(te.to_deliver.length==0){
            module.delivered.push(course.module[d]);
        }else{
            module.to_deliver.push(course.module[d]);
        }
    });

    $('#donut-sup-el-mo').text(module.delivered.length);
    $('#donut-sub-el-mo').text(module.delivered.length+module.to_deliver.length);

    $("#info-student-general-module-donut").empty();
    $("#info-student-general-module-donut").donut({
        value: Math.floor((module.delivered.length/(module.delivered.length+module.to_deliver.length)*100)*10)/10
        , height:80
        , width:80
        , fill: '#FFFFFF'
        , stroke : '#FFFFFF'
        , strokeWidth : 1.2
        , fontFamily : '"Trade Gothic Bold 2"'
        , fontSize: "15px",
        innerRadius:25
        ,outerRadius:35
    });

    var lesson = {delivered:[], to_deliver:[]};
    Object.keys(course.lesson).forEach(function(d){
        var te = {delivered:[], to_deliver:[]};
        course.lesson[d].te.forEach(function(e){
            if(course.te[e].delivered){
                te.delivered.push(course.te[e]);
            }else{
                te.to_deliver.push(course.te[e]);
            }
        });

        if(te.to_deliver.length==0){
            lesson.delivered.push(course.lesson[d]);
        }else{
            lesson.to_deliver.push(course.lesson[d]);
        }
    });

    $('#donut-sup-el-le').text(lesson.delivered.length);
    $('#donut-sub-el-le').text(lesson.delivered.length+lesson.to_deliver.length);

    $("#info-student-general-lesson-donut").empty();
    $("#info-student-general-lesson-donut").donut({
        value: Math.floor((lesson.delivered.length/(lesson.delivered.length+lesson.to_deliver.length)*100)*10)/10
        , height:80
        , width:80
        , fill: '#FFFFFF'
        , stroke : '#FFFFFF'
        , strokeWidth : 1.2
        , fontFamily : '"Trade Gothic Bold 2"'
        , fontSize: "15px",
        innerRadius:25
        ,outerRadius:35
    });

    var concept = {delivered:[], to_deliver:[]};
    Object.keys(course.concept).forEach(function(d){
        var te = {delivered:[], to_deliver:[]};
        course.concept[d].te.forEach(function(e){
            if(course.te[e.te_number].delivered){
                te.delivered.push(course.te[e.te_number]);
            }else{
                te.to_deliver.push(course.te[e.te_number]);
            }
        });

        if(te.to_deliver.length==0){
            concept.delivered.push(course.concept[d]);
        }else{
            concept.to_deliver.push(course.concept[d]);
        }
    });

    $('#donut-sup-el-co').text(concept.delivered.length);
    $('#donut-sub-el-co').text(concept.delivered.length+concept.to_deliver.length);

    $("#info-student-general-concept-donut").empty();
    $("#info-student-general-concept-donut").donut({
        value: Math.floor((concept.delivered.length/(concept.delivered.length+concept.to_deliver.length)*100)*10)/10
        , height:80
        , width:80
        , fill: '#FFFFFF'
        , stroke : '#FFFFFF'
        , strokeWidth : 1.2
        , fontFamily : '"Trade Gothic Bold 2"'
        , fontSize: "15px",
        innerRadius:25
        ,outerRadius:35
    });

    console.log(te);
}

function currentStatus(data,current){
    var course = data.student.course[data.course.course_number];
    var module = {delivered:[], to_deliver:[]};
    var lesson = {delivered: [], to_deliver: []};
    var concept = {delivered: [], to_deliver: []};
    var te = {delivered: [], to_deliver: []};
    try {
        Object.keys(course.module).forEach(function (d) {
            te = {delivered: [], to_deliver: []};
            course.module[d].te.forEach(function (e) {
                if (course.te[e].delivered) {
                    te.delivered.push(course.te[e]);
                } else {
                    te.to_deliver.push(course.te[e]);
                }
            });

            if (te.to_deliver.length == 0) {
                module.delivered.push(course.module[d]);
            } else {
                module.to_deliver.push(course.module[d]);
                throw StopIteration;
            }
        });
    }catch(error) {
        module = module.to_deliver[0];
        module.lesson.forEach(function(d){
            var te_aux = {delivered: [], to_deliver: []};
            course.lesson[d].te.forEach(function(e){
                if (course.te[e].delivered) {
                    te_aux.delivered.push(course.te[e]);
                } else {
                    te_aux.to_deliver.push(course.te[e]);
                }
            });
            if (te_aux.to_deliver.length == 0) {
                lesson.delivered.push(course.lesson[d]);
            } else {
                lesson.to_deliver.push(course.lesson[d]);
            }
        });
        module.concept.forEach(function(d){
            var te_aux = {delivered: [], to_deliver: []};
            course.concept[d].te.forEach(function(e){
                if (course.te[e.id].delivered) {
                    te_aux.delivered.push(course.te[e.id]);
                } else {
                    te_aux.to_deliver.push(course.te[e.id]);
                }
            });
            if (te_aux.to_deliver.length == 0) {
                concept.delivered.push(course.concept[d]);
            } else {
                concept.to_deliver.push(course.concept[d]);
            }
        });
        var str="<h2>Module: "+module.id+"</h2>";
        str+="<h4>Lessons: "+lesson.delivered.length+"/"+(lesson.delivered.length+lesson.to_deliver.length)+"</h4>";
        str+="<h4>Concepts: "+concept.delivered.length+"/"+(concept.delivered.length+concept.to_deliver.length)+"</h4>";
        str+="<h4>Teaching elements: "+te.delivered.length+"/"+(te.delivered.length+te.to_deliver.length)+"</h4>";

        var a = moment(module.due_date,moment.ISO_8601).toDate();
        var b = moment(current).toDate();
        var range = moment.range(moment(b),moment(a));

        var t = "";
        if(range.diff('days')!=0)
            t += range.diff('days') + ' days';
        if(range.diff('days')==0 && range.diff('hours')>0)
            t += range.diff('hours') + ' hours';



        str+="<p>Remaining time: "+t+"</p>";
        $('.calendar-current').empty();
        $('.calendar-current').html(str);
    }
}
