;(function(win,doc,undefined){
    'use strict';
    function MyDate(config){
        this._year = 1990;
        this._month = 1;
        this._day = 1;
        this.config = config;
        Object.defineProperties(this,{
            year : {
                set : function(year){
                    year = parseInt(year) || 1990;
                    this['_year'] = year > 1990 ? year : 1990;
                },
                get : function(){
                    return this['_year'];
                }
            },
            month :{
                set : function(month){
                    month = parseInt(month);
                    this['_month'] = month % 13 <= 0|| 1;
                },
                get : function(){
                    return this['_month'];
                }
            },
            day : {
                set : function(day){
                    day =
                },
                get : function(){
                    return this['_year'];
                }
            }
        });
    }
    function Calendar(config){
        this.wrap = null;
        this.head = null;
        this.body = null;
        this.config = typeof config === 'object' ? config : {};
        this.init();
    }
    Calendar.prototype = {
        init : function(){
            var wrap,head,body;
            wrap = doc.createElement('div');
            head = doc.createElement('div');
            body = doc.createElement('div');
            wrap.classList.add('calendar-wrap');
            head.classList.add('calendar-head');
            body.classList.add('calendar-body');
            wrap.appendChild(head);
            wrap.appendChild(body);

            //wrap = head + body maps for this.
            Object.defineProperty(this,'currYear', {
                get currYear(){},
                set currYear(value){}
            });
            //head = month + year ()
        },
    }


    win['Calendar'] = Calendar;

})(window,document);