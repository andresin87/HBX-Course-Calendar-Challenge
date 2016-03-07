/**
 * @author: Andrés Lucas http://www.andreslucas.me/
 * Requires jQuery, moment and chance
 */
function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}

function obfuscate(s) {
    return s[0] + s.slice(1).replace(/./g, "*");
}

function formattedDate(date) {
    var d = new Date(date || Date.now()),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [month, day, year].join('/');
}

(function(root, factory) {
    if(!chance) chance = new Chance();
    if (typeof define === 'function' && define.amd) {
        define(['moment', 'jquery','chance', 'exports'], function(momentjs, $, chance, exports) {
            root.daterangepicker = factory(root, exports, momentjs, $, chance);
        });

    } else if (typeof exports !== 'undefined') {
        var momentjs = require('moment');
        var chancejs = require('chance');
        var jQuery = (typeof window != 'undefined') ? window.jQuery : undefined;  //isomorphic issue
        if (!jQuery) {
            try {
                jQuery = require('jquery');
                if (!jQuery.fn) jQuery.fn = {}; //isomorphic issue
            } catch (err) {
                if (!jQuery) throw new Error('jQuery dependency not found');
            }
        }

        factory(root, exports, momentjs, jQuery, chancejs);

        // Finally, as a browser global.
    } else {
        root.daterangepicker = factory(root, {}, root.moment || moment, (root.jQuery || root.Zepto || root.ender || root.$), root.chance || chance);
    }

}(this || {}, function(root, dataServer, moment, $, chance) { // 'this' doesn't exist on a server
    var DataServer = function( options, cb) {

        //default settings for options
        var that = this;
        this.course = null;
        this.student = null;
        this.calendarJSON = null;
        this.courseJSON = null;
        this.studentJSON = null;
        this.userJSON = null;
        this.startDate = moment().startOf('day');
        this.endDate = moment().endOf('day');
        this.minDate = false;
        this.maxDate = false;
        this.data = {};
        this.client = new client();

        this.locale = {
            format: 'MM/DD/YYYY',
            separator: ' - ',
            applyLabel: 'Apply',
            cancelLabel: 'Cancel',
            weekLabel: 'W',
            customRangeLabel: 'Custom Range',
            daysOfWeek: moment.weekdaysMin(),
            monthNames: moment.monthsShort(),
            firstDay: moment.localeData().firstDayOfWeek()
        };

        this.callback = function() { };


        //custom options from user
        if (typeof options !== 'object' || options === null)
            options = {};


        //
        // handle all the possible options overriding defaults
        //
        if (!(Number(options.course) === 'NaN'))
            this.course = options.course;
        if (!(Number(options.student) === 'NaN'))
            this.student = options.student;
        if (typeof options.calendarJSON === 'string')
            this.calendarJSON = options.calendarJSON;
        if (typeof options.courseJSON === 'string')
            this.courseJSON = options.courseJSON;
        if (typeof options.studentJSON === 'string')
            this.studentJSON = options.studentJSON;
        if (typeof options.userJSON === 'string')
            this.userJSON = options.userJSON;


        if (typeof options.locale === 'object') {

            if (typeof options.locale.format === 'string')
                this.locale.format = options.locale.format;

            if (typeof options.locale.separator === 'string')
                this.locale.separator = options.locale.separator;

            if (typeof options.locale.daysOfWeek === 'object')
                this.locale.daysOfWeek = options.locale.daysOfWeek.slice();

            if (typeof options.locale.monthNames === 'object')
                this.locale.monthNames = options.locale.monthNames.slice();

            if (typeof options.locale.firstDay === 'number')
                this.locale.firstDay = options.locale.firstDay;

            if (typeof options.locale.applyLabel === 'string')
                this.locale.applyLabel = options.locale.applyLabel;

            if (typeof options.locale.cancelLabel === 'string')
                this.locale.cancelLabel = options.locale.cancelLabel;

            if (typeof options.locale.weekLabel === 'string')
                this.locale.weekLabel = options.locale.weekLabel;

            if (typeof options.locale.customRangeLabel === 'string')
                this.locale.customRangeLabel = options.locale.customRangeLabel;

        }

        if (typeof options.startDate === 'string')
            this.startDate = moment(options.startDate, this.locale.format);

        if (typeof options.endDate === 'string')
            this.endDate = moment(options.endDate, this.locale.format);

        if (typeof options.minDate === 'string')
            this.minDate = moment(options.minDate, this.locale.format);

        if (typeof options.maxDate === 'string')
            this.maxDate = moment(options.maxDate, this.locale.format);

        if (typeof options.startDate === 'object')
            this.startDate = moment(options.startDate);

        if (typeof options.endDate === 'object')
            this.endDate = moment(options.endDate);

        if (typeof options.minDate === 'object')
            this.minDate = moment(options.minDate);

        if (typeof options.maxDate === 'object')
            this.maxDate = moment(options.maxDate);

        // sanity check for bad options
        if (this.minDate && this.startDate.isBefore(this.minDate))
            this.startDate = this.minDate.clone();

        // sanity check for bad options
        if (this.maxDate && this.endDate.isAfter(this.maxDate))
            this.endDate = this.maxDate.clone();

        var start, end, range;

        if (typeof cb === 'function') {
            if(this.calendarJSON && this.courseJSON && this.studentJSON && (typeof cb === 'function')){
                if(options.calendarJSON || options.studentJSON || options.courseJSON || options.userJSON){
                    //d3.json(prefs.calendarJSON,function(d){
                    jQuery.ajax({
                        dataType: "json"
                        ,url: this.calendarJSON
                        ,async: false
                        ,success: function(d){
                            that.data['course']={};
                            d.forEach(function(d){
                                dd = d;
                                if(!that.data['course'][d.course_number])
                                    that.data['course'][d.course_number]={course:null, course_number:null, module:{}};
                                var strArr = d.course.split(" ");
                                var str = "";
                                for(var i = 0; i <strArr.length-5 ;i++){
                                    str += strArr[i];
                                    if(i!=strArr.length-6)
                                        str += " ";
                                }
                                that.data['course'][d.course_number].course = str;
                                that.data['course'][d.course_number].startDate = strArr[strArr.length-5]+ " " +strArr[strArr.length-4];
                                that.data['course'][d.course_number].endDate = strArr[strArr.length-2]+ " " +strArr[strArr.length-1];
                                that.data['course'][d.course_number].course_number = d.course_number;
                                if(!that.data['course'][d.course_number]['module'][d.module_number]){
                                    var start =  d.release_date.split('-');
                                    var end =  d.due_date.split('-');
                                    var st = new Date(parseInt(start[0]),parseInt(start[1])-1,parseInt(start[2]),0,0,0);
                                    var en = new Date(parseInt(end[0]),parseInt(end[1])-1,parseInt(end[2]),23,59,59);
                                    that.data['course'][d.course_number]['module'][d.module_number] = {release_date: st,due_date: en,lesson:[],concept:[],te:[]};
                                }
                                that.data['course'][d.course_number]['info']=chance.paragraph({sentences: 5});
                                that.data['course'][d.course_number]['student']=[];
                                that.data['course'][d.course_number]['nationality']=[];
                            });
                            //d3.json(prefs.courseJSON,function(d){
                            jQuery.ajax({
                                dataType: "json"
                                ,url: that.courseJSON
                                ,async: false
                                ,success: function(d){
                                    d.forEach(function(d){
                                        if(!that.data['course'][d.course_number]['module']) that.data['course'][d.course_number]['module']={};
                                        if(!that.data['course'][d.course_number]['module'][d.module_number])
                                            that.data['course'][d.course_number]['module'][d.module_number] = {lesson:[],concept:[],te:[],release_date: that.data['course'][d.course_number]['module'][d.module_number].release_date,due_date: that.data['course'][d.course_number]['module'][d.module_number].due_date};
                                        if(that.data['course'][d.course_number]['module'][d.module_number]['lesson'].indexOf(d.lesson_number)<0)
                                            that.data['course'][d.course_number]['module'][d.module_number]['lesson'].push(d.lesson_number);
                                        if(that.data['course'][d.course_number]['module'][d.module_number]['concept'].indexOf(d.concept_number)<0)
                                            that.data['course'][d.course_number]['module'][d.module_number]['concept'].push(d.concept_number);
                                        if(that.data['course'][d.course_number]['module'][d.module_number]['te'].indexOf(d.te_number)<0)
                                            that.data['course'][d.course_number]['module'][d.module_number]['te'].push(d.te_number);
                                        if(d.release_date<that.data['course'][d.course_number]['module'][d.module_number].release_date)
                                            that.data['course'][d.course_number]['module'][d.module_number].release_date= d.release_date;
                                        if(d.due_date>that.data['course'][d.course_number]['module'][d.module_number].due_date)
                                            that.data['course'][d.course_number]['module'][d.module_number].due_date= d.due_date;

                                        if(!that.data['course'][d.course_number]['lesson']) that.data['course'][d.course_number]['lesson']={};
                                        if(!that.data['course'][d.course_number]['lesson'][d.lesson_number])
                                            that.data['course'][d.course_number]['lesson'][d.lesson_number] = {module: d.module_number,concept:[],te:[],release_date:that.data['course'][d.course_number]['module'][d.module_number].release_date,due_date: that.data['course'][d.course_number]['module'][d.module_number].due_date};
                                        if(that.data['course'][d.course_number]['lesson'][d.lesson_number]['concept'].indexOf(d.concept_number)<0)
                                            that.data['course'][d.course_number]['lesson'][d.lesson_number]['concept'].push(d.concept_number);
                                        if(that.data['course'][d.course_number]['lesson'][d.lesson_number]['te'].indexOf(d.te_number)<0)
                                            that.data['course'][d.course_number]['lesson'][d.lesson_number]['te'].push(d.te_number);
                                        if(d.release_date<that.data['course'][d.course_number]['lesson'][d.module_number].release_date)
                                            that.data['course'][d.course_number]['lesson'][d.module_number].release_date= d.release_date;
                                        if(d.due_date>that.data['course'][d.course_number]['lesson'][d.module_number].due_date)
                                            that.data['course'][d.course_number]['lesson'][d.module_number].due_date= d.due_date;

                                        if(!that.data['course'][d.course_number]['concept']) that.data['course'][d.course_number]['concept']={};
                                        if(!that.data['course'][d.course_number]['concept'][d.concept_number])
                                            that.data['course'][d.course_number]['concept'][d.concept_number] = {module: d.module_number,lesson: d.lesson_number,te:[],release_date:that.data['course'][d.course_number]['module'][d.module_number].release_date,due_date: that.data['course'][d.course_number]['module'][d.module_number].due_date};
                                        if(that.data['course'][d.course_number]['concept'][d.concept_number]['te'].indexOf(d.te_number)<0)
                                            that.data['course'][d.course_number]['concept'][d.concept_number]['te'].push(d.te_number);
                                        if(d.release_date<that.data['course'][d.course_number]['concept'][d.module_number].release_date)
                                            that.data['course'][d.course_number]['concept'][d.module_number].release_date= d.release_date;
                                        if(d.due_date>that.data['course'][d.course_number]['concept'][d.module_number].due_date)
                                            that.data['course'][d.course_number]['concept'][d.module_number].due_date= d.due_date;

                                        if(!that.data['course'][d.course_number]['te']) that.data['course'][d.course_number]['te']={};
                                        if(!that.data['course'][d.course_number]['te'][d.te_number])
                                            that.data['course'][d.course_number]['te'][d.te_number] = {module: d.module_number,lesson: d.lesson_number,concept: d.concept_number,release_date:that.data['course'][d.course_number]['module'][d.module_number].release_date, due_date:that.data['course'][d.course_number]['module'][d.module_number].due_date};
                                        if(d.release_date<that.data['course'][d.course_number]['te'][d.module_number].release_date)
                                            that.data['course'][d.course_number]['te'][d.module_number].release_date= d.release_date;
                                        if(d.due_date>that.data['course'][d.course_number]['te'][d.module_number].due_date)
                                            that.data['course'][d.course_number]['te'][d.module_number].due_date= d.due_date;
                                    });
                                }
                            });
                            //d3.json(prefs.studentJSON,function(d){
                            jQuery.ajax({
                                dataType: "json"
                                ,url: that.studentJSON
                                ,async: false
                                ,success: function(d){
                                    that.data['student']={};
                                    d.forEach(function(d){  // set IDs and courses
                                        if(!that.data['student'][d.student_id])
                                            that.data['student'][d.student_id] = {};
                                        that.data['student'][d.student_id]['student_id'] = d.student_id;
                                        if(!that.data['student'][d.student_id]['course'])
                                            that.data['student'][d.student_id]['course']={};
                                        if(!that.data['student'][d.student_id]['course'][d.course_number]) {
                                            that.data['student'][d.student_id]['course'][d.course_number] = {
                                                module: that.data.course[d.course_number].module
                                                , lesson: that.data.course[d.course_number].lesson
                                                , concept: that.data.course[d.course_number].concept
                                            };
                                            if (!that.data['student'][d.student_id]['course'][d.course_number].te)
                                                that.data['student'][d.student_id]['course'][d.course_number].te = {};
                                            for (n in that.data.course[d.course_number].te) {
                                                that.data['student'][d.student_id]['course'][d.course_number].te[n] = {};
                                                for (m in that.data.course[d.course_number].te[n]) {
                                                    that.data['student'][d.student_id]['course'][d.course_number].te[n][m] = that.data.course[d.course_number].te[n][m];
                                                }
                                            }
                                        }
                                        that.data.student[d.student_id].course[d.course_number].te[d.te_number]['delivered'] = moment(d.completiondate,moment.ISO_8601).toDate();
                                    });
                                    if(!that.userJSON) {
                                        for(id in that.data['student']) {
                                             jQuery.ajax({
                                                 dataType: "json"
                                                 , url: "http://api.randomuser.me/"
                                                 , async: false
                                                 , success: function (e) {
                                                     //for (var key in e['results'][0]['user']) {
                                                     //    that.data['student'][id][key] = e['results'][0]['user'][key];
                                                     //}
                                                     that.data['student'][id]['user'] = e['results'][0]['user'];
                                                     that.data['student'][id]['nationality'] = e['nationality'];
                                                     for(k in that.data['student'].course){
                                                         if(that.data['course'][k].nationality.indexOf(e.nationality)<0) that.data['course'][k].nationality.push(e.nationality);
                                                     }
                                                 }
                                             });
                                         }
                                    }else{
                                        jQuery.ajax({
                                            dataType: "json"
                                            , url: that.userJSON
                                            , async: false
                                            , success: function (e) {
                                                var i = 0;
                                                for(var kID in that.data['student']){
                                                    for(var j in e.results[i]){
                                                        that.data.student[kID][j] = e.results[i][j];
                                                    }
                                                    for(var j=0; j < Object.keys(that.data.student[kID].course).length; j++ ){
                                                        var l = Object.keys(that.data.student[kID].course)[j];
                                                        if(that.data['course'][l].nationality.indexOf(e.results[i].nationality)<0) that.data['course'][l].nationality.push(e.results[i].nationality);
                                                    }

                                                    i++;
                                                }
                                            }
                                        });
                                    }

                                    for(var sID in that.data['student']){
                                        that.data.student[sID].birth = chance.birthday({ year: chance.year({ min: (new Date().getFullYear()- 45), max: (new Date().getFullYear()- 25) }) });
                                        //that.data.student[sID].birth = moment().range(startDate, endDate);
                                        that.data['student'][sID]['img']= "img/face/"+(sID)+".jpg";
                                        that.data['student'][sID]['info']=chance.paragraph({sentences: 2});

                                        // add students to courses
                                        for(k in that.data.student[sID].course){
                                            if(that.data.course[k].student.map(function(d){return d.student_id}).indexOf(sID)<0)
                                                that.data.course[k].student.push(that.data.student[sID]);
                                        }
                                    }


                                }
                            });
                            if(this.userJSON){
                                jQuery.ajax({
                                    dataType: "json"
                                    , url: that.userJSON
                                    , async: false
                                    , success: function (e) {
                                        var i = 0;
                                        for(var kID in that.data['student']){
                                            for(var j in e.results[i]){
                                                that.data.student[kID][j] = e.results[i][j];
                                            }
                                            for(var j=0; j < Object.keys(that.data.student[kID].course).length; j++ ){
                                                var l = Object.keys(that.data.student[kID].course)[j];
                                                if(that.data['course'][l].nationality.indexOf(e.results[i].nationality)<0) that.data['course'][l].nationality.push(e.results[i].nationality);
                                            }

                                            i++;
                                        }
                                    }
                                });
                            }

                        }
                    });
                }
            }
            this.callback = cb;
            cb(this);
        }

        this.getSimulateInfoData = function(userObj){
            var str = "<div class='row' style='border-right: 1px solid #FFFFFF;    padding-right: 10px;'><div class='h4' style='margin: 0;float: right'><span style='text-transform: capitalize;color:#FFFFFF;font-family: \"Trade Gothic Bold 2\"; font-size: .9em'>"+userObj.user.name.title+"</span><br/><span style='text-transform: capitalize;color:#FFFFFF;font-family: \"Trade Gothic Bold 2\"; font-size: 2em;'>"+userObj.user.name.first+" "+userObj.user.name.last+"</span></div></div>";
            str+="<div class='row' style='border-right: 1px solid #FFFFFF;padding-right: 10px;'><div class='h4' style='margin: 0;float: right'><span class='flag-icon flag-icon-"+userObj.nationality.toLowerCase()+"'></span> <span style='color:#FFFFFF'>"+Math.floor(moment.duration(moment(new Date()).diff(moment(userObj.birth))).asYears())+" years</span></div></div>";
            str+="<div class='row' style='border-right: 1px solid #FFFFFF;border-bottom: 1px solid #FFFFFF;padding: 4px 10px 10px 0px;'><div class='h4' style='margin: 0;float: right'><span style='color:#FFFFFF;font-family: \"Trade Gothic Bold 2\"; font-size: 3em;float: right;'>"+Object.keys(userObj.course).length+"</span><br/><span style='color:#FFFFFF;   font-family: \"Trade Gothic Bold 2\"; font-size: .9em;float: right;text-align: right;'>ENROLLED<br/>COURSES</span></div></div>";
            return str;
        };

        this.getStudent = function(kID){
            return (!kID) ? this.data.student[this.student] : this.data.student[kID]
        };

        this.selectUser = function(userID){
            this.student = userID;
            if(Object.keys(this.data.student[userID].course).length>0)
                this.course = Object.keys(this.data.student[userID].course)[0];
            else
                this.course = null;
            if(this.student && this.course){
                var t = [];
                for(var i in this.data.student){
                    t.push(this.data.student[i]);
                }
                flkty.select(t.map(function(d){return parseInt(d.student_id);}).indexOf(parseInt(userID)));
                delete t;
                $('footer div.tab-content > div#users div.slider div.simulate-user.selected').removeClass('selected');
                $('footer div.tab-content > div#users div.slider div.simulate-user').each(function(){
                    if($(this).find('img').data('id')==userID){
                        $(this).addClass('selected');
                    }
                });
                var str = this.getSimulateInfoData(this.data.student[this.student]);
                $('footer div.tab-content > div#users div#simulate-user-info').html(str);
                var ret = null;
                this.qry({student:this.student,course:this.course},function(d){
                    ret = d;
                });
                return ret;
            }
            return false;

        };

        /*this.update = function(data){
            $('nav.navbar .container div#course').html(data.course.course);
            $('nav.navbar .container li > a > img#profilePicture').attr('src',data.student.user.picture.thumbnail);

            $('div.container div.jumbo div#course h2#courseName').html(data.course.course);
            $('div.container div.jumbo div#course span#startDate').html(data.course.startDate);
            $('div.container div.jumbo div#course span#endDate').html(data.course.endDate);

            $('div.container div.jumbo div#course p#course-explanation').html(data.course.info);
            $('div.container div.jumbo div#course div.row > div > div#module').html(Object.keys(data.course.module).length);
            $('div.container div.jumbo div#course div.row > div > div#lesson').html(Object.keys(data.course.lesson).length);
            $('div.container div.jumbo div#course div.row > div > div#concept').html(Object.keys(data.course.concept).length);
            $('div.container div.jumbo div#course div.row > div > div#te').html(Object.keys(data.course.te).length);

            $('div.container div.jumbo div#course div.row > div > div#studentNumber').html(data.course.student.length);
            $('div.container div.jumbo div#course div.row > div > div#nationalitiesNumber').html(data.course.nationality.length);
            var str = "";
            data.course.nationality.forEach(function(d){
                str+='<button type="button" class="btn btn-primary btn-xs"><span class="flag-icon flag-icon-'+ d.toLowerCase()+'"></span></button>';
            });
            $('div.container div.jumbo div#course div.row > div > div.nationalities > div').html(str);
            $('div.container div.jumbo div#course div.row > div > div.nationalities').enscroll({
                showOnHover: true,
                verticalTrackClass: 'track3',
                verticalHandleClass: 'handle3'
            });
            $('div.container div.jumbo div#course div.row > div > div.nationalities').css('width','100%');


            //User
            $('div.container div.jumbo div#profilePicture').css('background-image','url('+data.student.user.picture.large+')');
            str = "<div class='row' style='padding-right: 10px;'><div class='h4' style='margin: 0;float: right'><span style='text-transform: capitalize;color:#FFFFFF;font-family: \"Trade Gothic Bold 2\"; font-size: .9em'>"+capitalize(data.student.user.name.title)+"</span> <span style='text-transform: capitalize;color:#FFFFFF;font-family: \"Trade Gothic Bold 2\"; font-size: 2em;'>"+capitalize(data.student.user.name.first)+" "+capitalize(data.student.user.name.last)+"</span></div></div>";
            str+="<div class='row' style='padding: 10px 5px 10px 0;'><div class='h4' style='margin: 0;float: right'><div style='color:#FFFFFF ;margin-bottom: 10px;'>"+formattedDate(data.student.birth)+"</div><div style='font-size:2em;' class='flag-icon flag-icon-"+data.student.nationality.toLowerCase()+"'></div></div></div>";
            $('div.container div.jumbo div#info-student li#info-student-name').html(str);
            $('div.container div.jumbo div#info-student li#info-student-info').html(data.student.info);
            str='<i class="fa fa-mobile"></i><a href="tel:'+data.student.user.phone+'">: '+data.student.user.phone+'</a>';
            str+='<br/><i class="fa fa-phone"></i><a href="tel:'+data.student.user.cell+'">: '+data.student.user.cell+'</a>';
            str+='<br/><i class="fa fa-paper-plane"></i><a href="mailto:'+data.student.user.email+'">: '+data.student.user.email+'</a>';
            str+='<br/><i class="fa fa-user"></i>: '+data.student.user.username;
            str+='<br/><i class="fa fa-key"></i>: '+obfuscate(data.student.user.password);
            $('div.container div.jumbo div#info-student li#info-student-contact').html(str);
            //$('div.container div.jumbo div#info-student li#info-student-general').html(str);
            //$('div.container div.jumbo div#info-student li#info-student-current').html(str);
            str = "";
            data.course.student.forEach(function(d){
                str += '<div class="studentElement" style="background-size: contain;background-image:url('+ d.picture.thumbnail +');"></div>';
            });
            $('div.container div.jumbo div#studentContainer div.students').html(str);
            $('div.container div.jumbo div#studentContainer').enscroll({
                showOnHover: true,
                verticalTrackClass: 'track3',
                verticalHandleClass: 'handle3'
            });
            $('div.container div.jumbo div#studentContainer').css('width','100%');
        }*/
    };

    DataServer.prototype = {
        constructor: DataServer,

        dataserver: function(options){
            return new DataServer(options, function(d){
                data = d;
            });
        },
        º: function(opt){
            for(var i in opt){
                this[i] = opt[i]
            }
            return $().dataserver(this);
        },

        qry: function(options, callback){
            var that = {};
            that.data = this.data;
            if (!(Number(options.course) === 'NaN'))
                that.course = options.course;
            if (!(Number(options.student) === 'NaN'))
                that.student = options.student;
            var data = [];
            data['course'] = {};//that.data['course'][that.course];
            for(var k in that.data['course'][that.course]){
                if(k!='student')
                    data.course[k]=that.data.course[that.course][k];
            }
            data.course.student = [];
            that.data['course'][that.course].student.forEach(function(d,i){
                data.course.student.push({
                    nationality:that.data.student[d.student_id].nationality
                    ,birth:that.data.student[d.student_id].birth
                    ,info:that.data.student[d.student_id].info
                });
                for(var k in that.data.student[d.student_id].user){
                    data.course.student[data.course.student.length-1][k]=that.data.student[d.student_id].user[k]
                }
            });
            data.student = {};
            for(var k in that.data.student[options.student]){
                if(k!='course')
                    data.student[k]=that.data['student'][options.student][k];
                else{
                    data.student[k]={};
                    for(var j in that.data.student[options.student][k]){
                            data.student[k][j]={};
                            data.student[k][j].course = that.data.course[j].course;
                            data.student[k][j].course_number = that.data.course[j].course_number;
                            data.student[k][j].endDate = that.data.course[j].endDate;
                            data.student[k][j].startDate = that.data.course[j].startDate;
                            data.student[k][j].info = that.data.course[j].info;
                            for(var i in that.data.student[options.student][k][j]){
                                if(i!='student')
                                    data.student[k][j][i]=that.data.student[options.student][k][j][i];
                                else{
                                    data.student[k][j][i]=that.data.student[options.student][k][j][i].length;
                                }
                            }
                    }
                }
            }
            //data['student'] = that.data['student'][options.student];

            /*
             var progression = [];
             this.data['course'][this.course]['student'].forEach(function(d){
             var stu = this.data['student'][d];
             delete stu.student_id;
             progression.push(stu);
             });
             */
            if(typeof callback == 'function'){
                //console.log(JSON.stringify({course:data.course, student:data.student}));
                callback(JSON.stringify({course:data.course, student:data.student}));
            }
            this.client.load(JSON.stringify({course:data.course, student:data.student}));
            //return JSON.stringify(data);
        },

        setStartDate: function(startDate) {
            if (typeof startDate === 'string')
                this.startDate = moment(startDate, this.locale.format);

            if (typeof startDate === 'object')
                this.startDate = moment(startDate);

            if (this.minDate && this.startDate.isBefore(this.minDate))
                this.startDate = this.minDate;

            if (this.maxDate && this.startDate.isAfter(this.maxDate))
                this.startDate = this.maxDate;
        },

        setEndDate: function(endDate) {
            if (typeof endDate === 'string')
                this.endDate = moment(endDate, this.locale.format);

            if (typeof endDate === 'object')
                this.endDate = moment(endDate);

            if (this.endDate.isBefore(this.startDate))
                this.endDate = this.startDate.clone();

            if (this.maxDate && this.endDate.isAfter(this.maxDate))
                this.endDate = this.maxDate;

            if (this.dateLimit && this.startDate.clone().add(this.dateLimit).isBefore(this.endDate))
                this.endDate = this.startDate.clone().add(this.dateLimit);

            this.previousRightTime = this.endDate.clone();

            if (!this.isShowing)
                this.updateElement();

            this.updateMonthsInView();
        },

        getUser:function(id){
            if(!id){
                return this.data.student[this.student];
            }
            return this.data.student[id];
        },
        start:function(){

            if(!this.student)
                this.student = Object.keys(this.data.student)[0];
            if(!this.course)
                this.course = Object.keys(this.data.student[this.student].course)[0];
            //Footer
            str = '<div class=""><div class="col-xs-3"><div id="simulate-user-info"style="padding:10px;"></div></div><div class="col-xs-9" style=""><div style="padding:10px;"><div class="slider" style="display:block;">';
            for(var k in this.data.student){
                str+="<div class='simulate-user'><img data-id="+this.data.student[k].student_id+" style='width:160px;' src='img/placeholder.jpg' data-flickity-lazyload='"+this.data.student[k].user.picture.medium+"'/></div>";
            }
            str +="</div></div><div></div>";

            $('footer div.tab-content > div#users').html(str);

            flkty = new Flickity('footer div.tab-content > div#users div.slider',{
                freeScroll: true,
                wrapAround: true,
                lazyLoad: 10,
                prevNextButtons: false
            });
            this.selectUser(this.student);

            var counter = 0;
            var isDragging = false;
            //$('footer div.tab-content > div#users div.slider')


            $('footer div.tab-content > div#users div.slider div.simulate-user')
                .mouseover(function(){
                    var kID = $(this).find('img').data('id');
                    var str = º.getSimulateInfoData(º.data.student[kID]);
                    $('footer div.tab-content > div#users div#simulate-user-info').html(str);
                })
                .mouseout(function(){
                    var str = º.getSimulateInfoData(º.getStudent());
                    $('footer div.tab-content > div#users div#simulate-user-info').html(str);
                }).mousedown(function() {
                    $(window).mousemove(function() {
                        isDragging = true;
                        $(window).unbind("mousemove");
                    });
                })
                .mouseup(function() {
                    var wasDragging = isDragging;
                    isDragging = false;
                    $(window).unbind("mousemove");
                    if (!wasDragging) {
                        console.log('click!');
                        var kID = $(this).find('img').data('id');
                        º.selectUser(kID)

                    }else{
                        console.log('drag!');
                    }
                });

            return this;
        }
    };

    $.fn.dataserver = function(options) {
        return new DataServer(options, function(d){
            data = d;
        });
    };

    return DataServer;

}));

var º = function(opt){ return $().dataserver(opt); };
