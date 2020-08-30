var app = new Vue({
    el: '#app',
    data: {
        inputResult: '',
        inputMath: '',
        buySelected:'',
        saleSelected:'',
        inputSelectedBuy:'',
        inputSelectedSale:'',
        numbers:[1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        operations:['/', '+', '-', '*'],
        del: 'C',
        reset: 'CE',
        equal: "=",
        fraction: '.',
        checkBoxOperation: false,
        courses: []
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
        },
        selectedBuy: function(){
            return Math.round(eval(this.inputSelectedBuy * this.buySelected)*100)/100
        },
        selectedSale: function(){
            return (this.saleSelected === '' || this.inputSelectedSale === '') ? 0 : Math.round(eval(this.inputSelectedSale / this.saleSelected)*100)/100
        }
    },
    mounted(){
        axios
            .get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
            .then(response => (this.courses = response.data.slice(0, -1)))
    }
})
    
    
    