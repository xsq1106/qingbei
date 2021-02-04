class MyVue{
    constructor(obj){
        // 1、把根属性的名字前面加上 $
        for(let key in obj){
            this["$"+key] = obj[key];
        }

        // 2、处理data属性
        for(let key in obj.data){
            //赋初始值
            this["_"+key] = obj.data[key]; 
            // 增加命名访问器属性（set和get）
            Object.defineProperty(this,key,{
                get(){
                    return this["_"+key];
                },
                set(newVal){
                    // 劫持到数据发生变化
                    this["_"+key] = newVal; //"hi"
                    // 发布给所有订阅者（发布就是newVal）
                    // ??
                }
            });
        }

        // 增加订阅者
        // ？？？

        // （首次）渲染
        this.render();
    }

    // 渲染（把数据显示在页面上）
    render(){
        // 1、获取到容器里的innerHTML；
        let str = document.querySelector(this.$el).innerHTML;
        // 2、用数据替换 innerHTML中处于 {{}}里面的东西
        // document.querySelector(this.$el).innerHTML = str.replace(/{{msg}}/g,this.msg);
        let htmlStr = str;
        for(let key in this.$data){
            htmlStr = htmlStr.replace(new RegExp("{{"+key+"}}","g"),this[key]);
        }
        document.querySelector(this.$el).innerHTML = htmlStr;
    }
}

// {
//     el:"#app",//el:element
//     data:{
//         msg:"hello vue",
//         msg2:"hi vue"
//     }
// }