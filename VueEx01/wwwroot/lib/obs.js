// let subject = {};
// subject.Items = {}; // 改為 object
// subject.Register = function(key, observer){
//     if(this.Items[key] === undefined){
//         this.Items[key] = []; // 為Items新增一個property
//     }
//     // console.warn(this.Items);
//    
//     this.Items[key].push(observer);
// }
//
// subject.notify = function(){
//     let key = Array.prototype.shift.call(arguments);  //取出arguments的第一筆
//     let observers = this.Items[key]; // 取出訂閱者
//     if(observers === null || observers.length ===0)return false;
//    
//     for(let observer of observers){
//         console.log("args ", arguments);
//         observer.apply(this, arguments); // 這裡的arguments 應該會少第一項，因為上面取走了
//     }
// }

// let genericEvent = {
//     Items : {},
//    
//     register : function(key, observer){
//         if(this.Items[key] === undefined){
//             this.Items[key] = []; // 為Items新增一個property
//         }
//        
//         this.Items[key].push(observer);
//     },
//    
//     notify : function(){
//         let key = Array.prototype.shift.call(arguments);  //取出arguments的第一筆
//         let observers = this.Items[key]; // 取出訂閱者
//         if(observers === null || observers.length ===0)return false;
//
//         for(let observer of observers){
//             observer.apply(this, arguments); // 這裡的arguments 應該會少第一項，因為上面取走了
//         }
//     }
// }
//
// var installEvent = function(subject){
//     for(let prop in genericEvent){
//         subject[prop] = genericEvent[prop]; // 將generic 的所有members複製一份過來
//     }
// }

(function(global) {
    let genericEvent = function () {
        this.Items = {};
        
        let result = new installEvent();
        result.prototype = this.prototype;
    }
    
    genericEvent.prototype = {
        register : function (key, observer) {
            if (this.Items[key] === undefined) {
                this.Items[key] = []; // 為Items新增一個property
            }

            this.Items[key].push(observer);
            
            return this; // support method chaining
        },

        notify : function () {
            let key = Array.prototype.shift.call(arguments);  //取出arguments的第一筆
            let observers = this.Items[key]; // 取出訂閱者
            if (observers === undefined || observers === null || observers.length === 0) return false;

            for (let observer of observers) {
                observer.apply(this, arguments); // 這裡的arguments 應該會少第一項，因為上面取走了
            }
        }
    }
    
    var installEvent = function(){
        this.Items = {}
    }
    
    global.waGenericEvent$ = new genericEvent();
})(window)