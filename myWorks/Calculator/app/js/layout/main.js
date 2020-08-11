const body = document.querySelector("body");
const boxKey = document.querySelector(".key__box");
const monitorInput = document.querySelector(".monitor__input");
const monitorInputMini = document.querySelector(".monitor__input-mini");
const inputMessage = document.querySelector(".input__message");
const btn = document.querySelectorAll(".key__btn");
let checkBox = false;
let message = "";
boxKey.onmousedown = body.onkeydown = pressing;
function pressing (event){
    let checkBoxDelete = false;
    let clickElement = event.target;

    if(event.code !== undefined){

        for (const elem of btn) {
            if(event.key === "Enter"){
                if(elem.value === "="){
                    clickElement = elem;
                }
            } else if(event.key === "Backspace"){
                if(elem.value === "Delete"){
                    clickElement = elem;
                }
            } else if(elem.value === event.key){
                clickElement = elem;
            }
        }                       
    }
    let elemeValue = clickElement.value;
    let dataKey = clickElement.dataset.key;

    if(dataKey === "number"){
        if(monitorInput.value.length >= 16){
            return;
        } else {
            if(checkBox){
                removeValue(monitorInput);
                removeValue(monitorInputMini);
                checkBox = false;
            }
            ifCheckBox (monitorInput);
            ifCheckBox (monitorInputMini);
            if(monitorInput.value === "0"){
                changeValue(monitorInput, clickElement);
            }else{
                pushValue(monitorInput, clickElement);
            }
        }
    }

    if(dataKey === "minus"){
        ifCheckBox (monitorInputMini);
        if(monitorInput.value === "" || monitorInput.value === "0") return;
        if(monitorInput.value[1] !== "-"){
            unshiftSymbol(monitorInput, clickElement);
        } else {
            sliceValue(monitorInput, 2, monitorInput.value.length); 
        }
    }

    if(dataKey === "fractional"){
        ifCheckBox (monitorInputMini);
        if(monitorInput.value === "" || monitorInput.value === "0"){
            pushSymbolThree(monitorInput, 0, clickElement);
        } else {
            if(monitorInput.value[monitorInput.value.length-1] !== "." && !monitorInput.value.includes(".")){
                pushSymbolThree(monitorInput, monitorInput.value, clickElement);
            } else { return; }
        }
    }

    if(dataKey === "round"){
        let checkBoxEquality = false;
        let lastSymbol = monitorInputMini.value.charAt(monitorInputMini.value.length-1);
        if(monitorInput.value[1] === "-"){
            monitorInput.value = `(${monitorInput.value})`;
        } else if(monitorInput.value.charAt(monitorInput.value.length-1) === "."){
                sliceValue(monitorInput, 0, -1);
        }else if(monitorInputMini.value === "" && monitorInput.value === "") return false;
        if(elemeValue === "+" || elemeValue === "-" || elemeValue === "*" || elemeValue === "/"){
            if(monitorInput.value === "" && (lastSymbol === "-" || lastSymbol === "+" || lastSymbol === "/" || lastSymbol === "*")){
                sliceValue(monitorInputMini, 0, -1);
                pushValue(monitorInputMini, clickElement);
            } else {
                ifCheckAndSlice (monitorInput, monitorInputMini, 0, -1);
                pushSymbolThreePlus(monitorInputMini, monitorInput, clickElement);
                removeValue(monitorInput);
            }
        }else if(elemeValue === "="){
            if(monitorInput.value === "" && (lastSymbol === "-" || lastSymbol === "+" || lastSymbol === "/" || lastSymbol === "*")){
                sliceValue(monitorInputMini, 0, -1);
            }
            if(checkBox){
                sliceValue(monitorInputMini, 0, -1);
                checkBoxEquality = true;
            }
            if(!checkBoxEquality){
                pushValue(monitorInputMini, monitorInput);
                roundValue(monitorInput, monitorInputMini);
                pushValue(monitorInputMini, clickElement);
                checkBox = true;
            }else{
                removeValue(monitorInputMini)
                checkBox = false;
            }
        }
    }

    if(dataKey === "Delete"){
        if(checkBox){
            removeValue(monitorInputMini);
            checkBox = false;
        } else{
            sliceValue(monitorInput, 0, -1);
        }
    }

    if(dataKey === "C"){
        removeValue(monitorInput);
        removeValue(monitorInputMini);
    }

    if(dataKey === "CE"){
        ifCheckBox (monitorInputMini);
        removeValue(monitorInput);
    }

    if(dataKey === "pow"){
        mathPow (monitorInputMini, monitorInput);
    }

    if(dataKey === "decimal"){
        if(monitorInput.value === "0" || monitorInput.value === ""){
            message = "Деление на ноль невозможно";
            arrorMessage(message);
        }
        mathDecimal (monitorInputMini, monitorInput);
    }
    
    if(dataKey === "squareRoot"){
        mathSquare(monitorInputMini, monitorInput);
    }
    
    if(dataKey === "interest"){
        mathInterest(monitorInputMini, monitorInput);
    }
    if(monitorInput.value.length >= 16){
        monitorInput.value = monitorInput.value.slice(0,17);
    }
    
}

function mathInterest(ImportOf, ImportIn){
    if(ImportOf.value === ""){
        message = "Любой процент от 0 будет равен 0";
        arrorMessage(message);
        removeValue(monitorInput);
    } else {
        let roundText = ImportOf.value.slice(0,-1);
        let result = eval(roundText);
        ImportOf.value +=  result/100*ImportIn.value;
        checEquality();
    }
}
function mathSquare(ImportOf, ImportIn){
    if(ImportIn.value === ""){
        ImportIn.value = "0";
    }
    ImportOf.value += `Math.sqrt(${ImportIn.value})`;
    checEquality();
}
function arrorMessage(message){
    inputMessage.value = message;
    function deleteArrorMessage(){
        inputMessage.value = "";
    }
    setTimeout(deleteArrorMessage, 3000);
}
function mathDecimal (ImportOf, ImportIn){
    if(ImportIn.value === "" || ImportIn.value === "0"){
        return;
    } else {
        ImportOf.value += `1/(${ImportIn.value})`;
    }
    checEquality();
}
function mathPow (ImportOf, ImportIn){
    if(ImportIn.value === ""){
        ImportIn.value = "0";
    }
    ImportOf.value += `Math.pow(${ImportIn.value}, 2)`;
    checEquality();

}
function checEquality(){
    let checkBoxEquality = false;
    if(checkBox){
        sliceValue(monitorInputMini, 0, -1);
        checkBoxEquality = true;
    }
    if(!checkBoxEquality){
        roundValue(monitorInput, monitorInputMini);
        monitorInputMini.value += "=";
        checkBox = true;
    }else{
        removeValue(monitorInputMini);
        checkBox = false;
    }
}
function ifCheckAndSlice (input, ImportOf, indexStart, indexEnd){
    if(checkBox){
            removeValue(input);
            sliceValue(ImportOf, indexStart, indexEnd)
            checkBox = false;
        }
}
function ifCheckBox (input){
    if(checkBox){
            removeValue(input);
            checkBox = false;
        }
}
function sliceValue(ImportOf, indexStart, indexEnd){
    ImportOf.value = ImportOf.value.slice(indexStart,indexEnd);
}
function roundValue(ImportOf, elemEval){
    ImportOf.value = eval(elemEval.value);
}
function checkStartDableZero(clickElement, monitorInput){
    if(elemeValue === "0" && monitorInput.value === "0")return;
}
function removeValue(input){
    input.value = "";
}
function changeValue(ImportOf, ImportIn){
    ImportOf.value = ImportIn.value;
}
function pushValue(ImportOf, ImportIn){
    ImportOf.value += ImportIn.value;
}
function unshiftSymbol(ImportOf, symbol){
    ImportOf.value = symbol.value + ImportOf.value;
}
function pushSymbolThree(ImportOf, ImportIn, clickElem){
    ImportOf.value = ImportIn + clickElem.value;
}
function pushSymbolThreePlus(ImportOf, ImportIn, clickElem){
    ImportOf.value += ImportIn.value + clickElem.value;
}