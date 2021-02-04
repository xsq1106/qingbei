let observer = {
    // 定义一个数组，存储所有的订阅者
    arr:[],

    // 添加订阅者（就是给数组增加一个元素）
    addSubscriber(cb){ //cb是函数
        this.arr.push(cb);
    },

    // 发布
    publish(what){
        for(let i=0;i<this.arr.length;i++){
            this.arr[i](what)
        }
    }
}