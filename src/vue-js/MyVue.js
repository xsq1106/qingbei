class MyVue{
    constructor(obj){
        // 1、根属性
        // 把所有配置项的根属性，前面加上$，绑定在vue实例上
        for(let key in obj){   //el   data
            this["$"+key] = obj[key];
        }

        // 2、处理data属性
        // 让obj里的data里属性完成数据劫持（使用Object.defineProperty）
        for(let key in obj.data){    //msg                   
            //增加一个下划线开头的属性（普通属性）
            this["_"+key] = obj.data[key];//  this._msg = 
            //增加属性（可控制的属性）
            Object.defineProperty(this,key,{  //key = msg
                get:function(){
                    return this["_"+key]; //this._msg
                },
                set:function(newVal){ //hi
                    // console.log("msg被改了");
                    this["_"+key] = newVal; //this._msg=""
                    // 发布
                    observer.publish(newVal);                 
                }
            });
        }
        this.addSubscriber();
        // 渲染
        this.render();
    }

    addSubscriber(){
        let box = document.querySelector(this.$el);
        // 完成订阅
        // 第一个p标签订阅msg 的值。
        observer.addSubscriber(function(what){
            box.firstElementChild.innerHTML = what;
        });
        // 最后一个p标签订阅msg 的值。
        observer.addSubscriber(function(what){
            box.lastElementChild.innerHTML = what;
        });
    }

    // 渲染：把数据显示在html上。
    render(){
        // this.$el;
        // this.$el.innerHTML = this.
        let box = document.querySelector(this.$el);
        let str = box.innerHTML;
        for(let key in this.$data){  
            str = str.replace(new RegExp("{{"+key+"}}",'g'),this.$data[key]);
            //   str.replace(new RegExp("{{msg}}",'g'),"hello");
        }
        box.innerHTML = str;
    }
}