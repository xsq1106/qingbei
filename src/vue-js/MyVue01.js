class MyVue{
    constructor(obj){
        // 1、处理根属性
        for(let key in obj){ //key = "el"  "data"
            this["$"+key] = obj[key];
        }

        // 2、处理data属性的每个属性
        for(let key in obj.data){
            this[key] = obj.data[key];
        }
        this.initUI();
    }

    //初始化界面（ 把data属性（对象）里面的每个属性的值，要显示在页面上）
    initUI(){
        let oDiv = document.querySelector(this.$el);
        let htmlStr= oDiv.innerHTML;
        for(let key in this.$data){
            htmlStr = htmlStr.replace(new RegExp("{{"+key+"}}","g"),this.$data[key]);
        }
        oDiv.innerHTML = htmlStr;
    }
}
