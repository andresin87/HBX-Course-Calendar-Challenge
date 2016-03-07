/**
 * Created by KeyserSoze on 02/03/2016.
 */
var client = function(){
    this.data = {};
    this.id_student = null;
    this.id_course = null;
    this.student = function(){
        return (this.data) ? this.data.student : null;
    };
    this.course = function(){
        return (this.data) ? this.data.course : null;
    };
    this.load = function(json){
        //console.log(json);
        this.data = JSON.parse(json);
        var that = this;
        $('nav.navbar .container div#course').html(this.data.course.course);
        $('nav.navbar .container li > a > img#profilePicture').attr('src',this.data.student.user.picture.thumbnail);

        var str = '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-list"></i><span style="color:#FFFFFF;" class="caret"></span></a>';
            str += '<ul class="dropdown-menu" style="background: #a41034;">';

            Object.keys(this.data.student.course).forEach(function(d){
                str+='<li><a href="#" onclick="selectView('+that.data.student.student_id+','+ d+')">'+that.data.student.course[d].course+'</a></li>'
            });
            str += '</ul>';
        str += '</a>';
        $('nav.navbar .container ul.navbar-right li.dropdown').html(str);

        $('div.container div.jumbo div#course h2#courseName').html(this.data.course.course);
        $('div.container div.jumbo div#course span#startDate').html(this.data.course.startDate);
        $('div.container div.jumbo div#course span#endDate').html(this.data.course.endDate);

        $('div.container div.jumbo div#course p#course-explanation').html(this.data.course.info);
        $('div.container div.jumbo div#course div.row > div > div#module').html(Object.keys(this.data.course.module).length);
        $('div.container div.jumbo div#course div.row > div > div#lesson').html(Object.keys(this.data.course.lesson).length);
        $('div.container div.jumbo div#course div.row > div > div#concept').html(Object.keys(this.data.course.concept).length);
        $('div.container div.jumbo div#course div.row > div > div#te').html(Object.keys(this.data.course.te).length);

        $('div.container div.jumbo div#course div.row > div > div#studentNumber').html(this.data.course.student.length);
        $('div.container div.jumbo div#course div.row > div > div#nationalitiesNumber').html(this.data.course.nationality.length);

        $('div.container div.jumbo div#course div.row div.nationalities').empty();
        var str = '<div style="padding: 15px">';
        this.data.course.nationality.forEach(function(d){
            str+='<button type="button" class="btn btn-primary btn-xs"><span class="flag-icon flag-icon-'+ d.toLowerCase()+'"></span></button>';
        });
        str+='</div>';
        $('div.container div.jumbo div#course div.row > div > div.nationalities').html(str);
        $('div.container div.jumbo div#course div.row > div > div.nationalities > div').enscroll({
            showOnHover: true,
            verticalTrackClass: 'track3',
            verticalHandleClass: 'handle3'
        });
        $('div.container div.jumbo div#course div.row > div > div.nationalities > div').css('width','100%');


        //User
        $('div.container div.jumbo div#profilePicture').css('background-image','url('+this.data.student.user.picture.large+')');
        str = "<div class='row' style='padding-right: 10px;'><div class='h4' style='margin: 0;float: right'><span style='text-transform: capitalize;color:#FFFFFF;font-family: \"Trade Gothic Bold 2\"; font-size: .9em'>"+capitalize(this.data.student.user.name.title)+"</span><br/><span style='text-transform: capitalize;color:#FFFFFF;font-family: \"Trade Gothic Bold 2\"; font-size: 2em;'>"+capitalize(this.data.student.user.name.first)+" "+capitalize(this.data.student.user.name.last)+"</span></div></div>";
        str+="<div class='row' style='padding: 5px 5px 10px 0;'><div class='h4' style='width:100%;margin: 0;float: right'><div style='float:right;color:#FFFFFF ;margin-bottom: 10px;'>"+formattedDate(this.data.student.birth)+"</div><div style='font-size:1.1em;float:left;' class='flag-icon flag-icon-"+this.data.student.nationality.toLowerCase()+"'></div></div></div>";
        $('div.container div.jumbo div#info-student-name').html(str);

        $('div.container div.jumbo div#info-student li#info-student-info').empty();
        $('div.container div.jumbo div#info-student li#info-student-info').css('padding','0');
        $('div.container div.jumbo div#info-student li#info-student-info').append('<div style="width:100%;height: 70px;"></div>');
        $('div.container div.jumbo div#info-student li#info-student-info > div').html(this.data.student.info);
        $('div.container div.jumbo div#info-student li#info-student-info > div').enscroll({
            showOnHover: true,
            verticalTrackClass: 'track3',
            verticalHandleClass: 'handle3'
        });

        str='<i class="fa fa-mobile"></i><a href="tel:'+this.data.student.user.phone+'">: '+this.data.student.user.phone+'</a>';
        str+='<br/><i class="fa fa-phone"></i><a href="tel:'+this.data.student.user.cell+'">: '+this.data.student.user.cell+'</a>';
        str+='<br/><i class="fa fa-paper-plane"></i><a href="mailto:'+this.data.student.user.email+'">: '+this.data.student.user.email+'</a>';
        str+='<br/><i class="fa fa-user"></i>: '+this.data.student.user.username;
        str+='<br/><i class="fa fa-key"></i>: '+obfuscate(this.data.student.user.password);
        $('div.container div.jumbo div#info-student li#info-student-contact').html(str);
        //$('div.container div.jumbo div#info-student li#info-student-general').html(str);
        //$('div.container div.jumbo div#info-student li#info-student-current').html(str);
        str = '<div class="students" style="width:100% !important; max-height:170px;display:list-item;">';
        this.data.course.student.forEach(function(d){
            str += '<div class="studentElement" style="background-size: contain;background-image:url('+ d.picture.thumbnail +');"></div>';
        });
        str+="</div>";
        $('div.container div.jumbo div#studentContainer div.row').empty();
        $('div.container div.jumbo div#studentContainer div.row').html(str);
        $('div.container div.jumbo div#studentContainer div.students').enscroll({
            showOnHover: true,
            verticalTrackClass: 'track3',
            verticalHandleClass: 'handle3'
        });
        $('div.container div.jumbo div#studentContainer div.students').css('width','100%');

        // Calendar
        var cal = [];
        var data_delivered = [];
        for(k in this.data.student.course[this.data.course.course_number].te){
            cal.push(moment(this.data.student.course[this.data.course.course_number].te[k].release_date,moment.ISO_8601).toDate());
            cal.push(moment(this.data.student.course[this.data.course.course_number].te[k].due_date,moment.ISO_8601).toDate());
            if(this.data.student.course[this.data.course.course_number].te[k].delivered)
                data_delivered.push(moment(this.data.student.course[this.data.course.course_number].te[k].delivered).toDate());
        }
        $('.calendar').calendar({startDate:d3.min(cal),endDate:d3.max(cal),data:this.data,currDate:d3.max(data_delivered)});

        $('#progress').progress({data:this.data,currDate:d3.max(data_delivered)});

        globalStatus(this.data);
        currentStatus(this.data, d3.max(data_delivered));
    };
};
