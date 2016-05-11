(function(win,doc,undefined){
    var unique,fadeFn,wFn,mFn,dragFn,dropFn,btn1Fn,btn2Fn;
    var Layer = function(txt,config){
        this.txt= txt;
        this.config = config;
        this.startX = 0;
        this.startY = 0;
        this.dragFlag = false;
    }

    Layer.prototype = {
        init: function () {
            var that = this;
            this.wrap = doc.createElement('div');
            this.fade = doc.createElement('div');
            this.model = doc.createElement('div');
            this.header = doc.createElement('div');
            this.body = doc.createElement('div');
            this.footer = doc.createElement('div');
            this.confirmBtn = doc.createElement('button');
            this.cancelBtn = doc.createElement('button');

            this.wrap.className = 'pop-wrap pop-on';
            this.fade.className = 'pop-fade';
            this.model.className = 'pop-model';
            this.header.className = 'pop-header';
            this.body.className = 'pop-body';
            this.footer.className = 'pop-footer';
            this.confirmBtn.className = 'pop-confirm';
            this.cancelBtn.className = 'pop-cancel';
            this.confirmBtn.innerHTML = '确认';
            this.cancelBtn.innerHTML = '取消';

            this.model.appendChild(this.header);
            this.model.appendChild(this.body);
            this.model.appendChild(this.footer);
            this.footer.appendChild(this.confirmBtn);
            this.footer.appendChild(this.cancelBtn);
            this.wrap.appendChild(this.fade);
            this.wrap.appendChild(this.model);

            this.header.addEventListener('mousedown', dragFn = function (event) {
                that.dragFlag = true;
                that.startX = event.pageX;
                that.startY = event.pageY;
                that.left = parseInt(win.getComputedStyle(that.model, null).left);
                that.right = parseInt(win.getComputedStyle(that.model, null).top);
            });

            this.header.addEventListener('mouseup', dropFn = function () {
                that.dragFlag = false;
            });
            this.wrap.addEventListener('mousemove', mFn = function (event) {
                that.onDrag(event, that)
            });

            window.addEventListener('keydown', wFn = function (event) {
                var code = event.keyCode;
                if (code === 27) {//ESC
                    event.preventDefault();
                    that.close(that, undefined, true);
                }
                else if (code === 13) {
                    event.preventDefault();
                    var zzz = that.input ? that.input.value : true;
                    that.close(that, zzz);
                }
            });

            doc.getElementsByTagName('body')[0].appendChild(this.wrap);
            setTimeout(function () {
                that.wrap.className = 'pop-wrap';
            });
        },
        option: function () {
            if (typeof this.config === 'string') {
                this.setTheme(this.config);
            }
            else if (typeof this.config === 'funciton') {
                this.setTheme();
                this.callback = this.config;
            }
            else {
                this.setTheme();
            }
        },
        alert: function () {
            var that = this;
            this.init();
            this.option(this.config);
            this.body.innerHtml = this.txt;
            this.footer.removeChild(this.cancelBtn);
            this.confirmBtn.addEventListener('click', btn2Fn = function (event) {
                that.close(that)
            });
        },
        confirm: function () {
            var that = this;
            this.init();
            this.option(this.config);
            this.body.innerHTML = this.txt;
            this.cancelBtn.addEventListener('click', btn1Fn = function () {
                that.close(that, false)
            });
            this.confirmBtn.addEventListener('click', btn2Fn = function () {
                that.close(that, true)
            });
        },
        prompt : function(){
            var that = this;
            this.init();
            this.option(this.config);
            this.header.innerHTML = this.txt;
            this.input = doc.createElement('input');
            this.input.type = 'text';
            this.body.appendChild(this.input);
            this.cancelBtn.addEventListener('click',btn1Fn = function(){that.close(that,undefined);});
            this.confirmBtn.addEventListener('click',btn2Fn = function(){that.close(that,that.input.value);});
        },
        close : function(that,msg,flag){
            doc.getElementsByTagName('body')[0].removeChild(that.wrap);
            unique = undefined;

            this.fade.removeEventListener('click',fadeFn,false);
            this.header.removeEventListener('mousedown',dragFn,false);
            this.header.removeEventListener('mouseup',dropFn,false);
            this.cancelBtn.removeEventListener('click',btn1Fn,false);
            this.confirmBtn.removeEventListener('click',btn2Fn,false);
            win.removeEventListener('keydown',wFn,false);

            if(that.callback && !flag){
                if(msg !== undefined)
                    that.callback(msg);
                else
                    that.callback();
            }
        },
        setTheme : function(type){
            switch(type){
                case 'success' : {
                    this.model.style.backgroundColor = '#00ffff';
                    this.title.innerHTML = 'success';
                    break;
                }
                case 'error' : {
                    this.model.style.backgroundColor = '#ff0000';
                    this.title.innerHTML = 'Error';
                    break;
                }
                case 'warning' : {}
                    this.model.style.backgroundColor = '#00ff00';
                    this.title.innerHTML = 'Warning';
                    break;
                default : {
                    this.model.style.backgroundColor = '#888888';
                    this.header.innerHTML = 'pop';
                    break;
                }
            }
        },
        onDrag : function (event,that){
            if(that.dragFlag){
                that.model.style.left = (event.pageX - that.startX + that.left) + 'px';
                that.model.style.top = (event.pageY -that.startY + that.top) + 'px';
            }
        }
    }

    var pop = {
        alert : function(text,config){
            var layer = this.singleton(text,config);
            if(layer)
                layer.alert();
        },
        confirm : function(text,config){
            var layer = this.singleton(text,config);
            if(layer)
                layer.confirm();
        },
        prompt : function(text,config){
            var layer = this.singleton(text,config);
            if(layer)
                layer.prompt();
        },
        singleton : function(text,config){
            if(unique === undefined){
                unique = new Layer(text,config);
                return unique;
            }
            else
                return false;
        }

    }

    window['pop'] = pop;
})(window,document);