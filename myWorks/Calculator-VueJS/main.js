var app = new Vue({
    el: '#app',
    data: {
        inputResult:'',
        inputMath:'',
        numbers:[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0],
        operations:['%', '/', '+', '-', '*'],
        reset: "CE",
        equal: "=",
        checkBox: false
    },
    methods: {
        pushNumber: function (params) {
            checkBox = false
            this.inputMath += params
        },
        pushOperation: function (params) {
            !checkBox ? this.inputMath += params : false;
            checkBox = true
        },
        resetInput: function () {
            checkBox = false
            this.inputResult = ""            
            this.inputMath = ""            
        },
        equalInput: function () {
            checkBox = false
            this.inputResult = eval(this.inputMath)
        }
    }
})
    
    
    