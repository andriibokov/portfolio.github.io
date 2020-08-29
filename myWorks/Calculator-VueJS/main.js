var app = new Vue({
    el: '#app',
    data: {
        inputResult: '',
        inputMath: '',
        numbers:[1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        operations:['/', '+', '-', '*'],
        del: 'C',
        reset: 'CE',
        equal: "=",
        fraction: '.',
        checkBoxOperation: false     
    },
    methods: {
        pushNumber: function (params) {
            this.inputMath += params
            checkBoxOperation = false
        },
        pushOperation: function(params) {
            if(!checkBoxOperation){
                this.inputMath += params;
                checkBoxOperation = true;
            } else{
                this.inputMath = this.inputMath.slice(0, -1);
                checkBoxOperation = false; 
            }
            
        },
        fractionInput: function(){
            this.inputMath === '' ? this.inputMath = '0': false;
            this.inputMath.slice(-1) === this.fraction ? false : this.inputMath += this.fraction;
            checkBoxFraction = true
        },
        resetInput: function () {
            checkBoxOperation = false
            this.inputResult = ""            
            this.inputMath = ""            
        },
        deleteInput: function(){
            checkBoxOperation = false 
            this.inputMath = this.inputMath.slice(0, -1)
        },
        equalInput: function () {
            checkBoxOperation = false
            this.inputResult = eval(this.inputMath)
        }
    }
})
    
    
    