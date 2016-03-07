/**
 * Created by andreslucas.me on 27/02/2016.
 */

;(function( $, win, doc, undefined ) {
    var defaultSettings = {
                loaded:false
                , height:null
                , jsonURL: null
                , course: null
                , student: null
                , date: null
        }
        ,create = function(pane, prefs){
            var height = prefs.height ? prefs.height : $(pane).innerHeight()
                , width = $(pane).innerWidth();
            var svg = d3.select(pane)
                .append('svg')
                .attr('width',width)
                .attr('height',height);
            d3.json(prefs.jsonURL,function(data){
                data = data.filter(function(d){
                    if(d    .course_number == prefs.course) return d;
                } );
                //console.log(data);
            });
        }
        ,api = {
            resize: function(){}
        };

    $.fn.brush = function( opts ) {
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
            if(!settings.loaded && settings.jsonURL){
                create(pane,settings);
            }
        });
    }

}(jQuery,d3,window,document));