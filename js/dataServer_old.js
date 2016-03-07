/**
 * Created by andreslucas.me on 27/02/2016.
 */

;(function( $, win, doc, undefined ) {
    var defaultSettings = {
            course_number:1
            ,student: 0
            ,date: new Date()
            ,calendarJSON:null
            ,courseJSON:null
            ,studentJSON:null
        }
        ,data = {}
        ,create = function(prefs, handleData){
                //d3.json(prefs.calendarJSON,function(d){
                jQuery.ajax({
                    dataType: "json"
                    ,url: prefs.calendarJSON
                    ,async: false
                    ,success: function(d){
                        data['course']={};
                        d.forEach(function(d){
                            data['course'][d.course_number]=d;
                            data['course'][d.course_number]['info']='Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt.';
                            data['course'][d.course_number]['student']=[];
                        });
                        //d3.json(prefs.courseJSON,function(d){
                        jQuery.ajax({
                            dataType: "json"
                            ,url: prefs.courseJSON
                            ,async: false
                            ,success: function(d){
                                d.forEach(function(d){
                                    if(!data['course'][d.course_number]['module']) data['course'][d.course_number]['module']={};
                                    if(!data['course'][d.course_number]['module'][d.module_number])
                                        data['course'][d.course_number]['module'][d.module_number] = {lesson:[],concept:[],te:[]};
                                    if(data['course'][d.course_number]['module'][d.module_number]['lesson'].indexOf(d.lesson_number)<0)
                                        data['course'][d.course_number]['module'][d.module_number]['lesson'].push(d.lesson_number);
                                    if(data['course'][d.course_number]['module'][d.module_number]['concept'].indexOf(d.concept_number)<0)
                                        data['course'][d.course_number]['module'][d.module_number]['concept'].push(d.concept_number);
                                    if(data['course'][d.course_number]['module'][d.module_number]['te'].indexOf(d.te_number)<0)
                                        data['course'][d.course_number]['module'][d.module_number]['te'].push(d.te_number);

                                    if(!data['course'][d.course_number]['lesson']) data['course'][d.course_number]['lesson']={};
                                    if(!data['course'][d.course_number]['lesson'][d.lesson_number])
                                        data['course'][d.course_number]['lesson'][d.lesson_number] = {module: d.course_number,concept:[],te:[]};
                                    if(data['course'][d.course_number]['lesson'][d.lesson_number]['concept'].indexOf(d.concept_number)<0)
                                        data['course'][d.course_number]['lesson'][d.lesson_number]['concept'].push(d.concept_number);
                                    if(data['course'][d.course_number]['lesson'][d.lesson_number]['te'].indexOf(d.te_number)<0)
                                        data['course'][d.course_number]['lesson'][d.lesson_number]['te'].push(d.te_number);

                                    if(!data['course'][d.course_number]['concept']) data['course'][d.course_number]['concept']={};
                                    if(!data['course'][d.course_number]['concept'][d.concept_number])
                                        data['course'][d.course_number]['concept'][d.concept_number] = {module: d.course_number,lesson: d.lesson_number,te:[]};
                                    if(data['course'][d.course_number]['concept'][d.concept_number]['te'].indexOf(d.te_number)<0)
                                        data['course'][d.course_number]['concept'][d.concept_number]['te'].push(d.te_number);

                                    if(!data['course'][d.course_number]['te']) data['course'][d.course_number]['te']={};
                                    if(!data['course'][d.course_number]['te'][d.te_number])
                                        data['course'][d.course_number]['te'][d.te_number] = {module: d.course_number,lesson: d.lesson_number,concept: d.concept_number};

                                });
                            }
                        });
                        //d3.json(prefs.studentJSON,function(d){
                        jQuery.ajax({
                            dataType: "json"
                            ,url: prefs.studentJSON
                            ,async: false
                            ,success: function(d){
                                data['student']={};
                                d.forEach(function(d){
                                    if(data['course'][d.course_number]['student'].indexOf(d.student_id)<0)
                                        data['course'][d.course_number]['student'].push(d.student_id);
                                    data['student'][d.student_id]=d;
                                    data['student'][d.student_id]['img']= "img/face/"+(d.student_id-1)+".jpg";
                                    data['student'][d.student_id]['info']='Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.';
                                });
                            }
                        });
                        handleData(data);
                    }
                });



        }
        ,api = {
            getCourse: function(course){
                return data['course'][course];
            }
            ,getStudent: function(student){
                return data['student'][student];
            }
        };
    $.fn.dataServer = function( opts ) {
        var settings;
        var data;
        // handle API method calls
        if ( api[opts] ) {
            return api[opts].call( this );
        }
        // otherwise, initialize the enscroll element

        // use default settings, and overwrite defaults with options passed in
        settings = $.extend( {}, defaultSettings, opts );

        function d(handleData){
            create(settings, function(d){
                handleData(d);
            });
        }
        return d();

    }

}(jQuery,d3,window,document));
