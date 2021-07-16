
// CONSTRUCTOR 
class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear();
    }
    
    // Will clear our output
    clear() {
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = undefined
    }
    
    //will delete single last variable
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    
    //will add the selected number next to the number on screen
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return  //Will allow '.' to be used only once 
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    
    //will choose the operation the user has selected
    chooseOperation(operation) { 
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        } // Doing the math using compute()
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    
    //will do the calculations
    compute() {
        let computation 
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    

    //Proper formating of number on screen
    getdisplaynumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0]) //it will take the string into an array
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }
        else{
            return integerDisplay
        }
    }

    //will show the output on screen
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getdisplaynumber(this.currentOperand)
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getdisplaynumber(this.previousOperand)} ${this.operation}` //concatination
        }
        else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}

//Constants
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButtons = document.querySelector('[data-equals]')
const deleteButtons = document.querySelector('[data-delete]')
const allclearButtons = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const calculator = new Calculator(previousOperandTextElement , currentOperandTextElement)

//Events 
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
});

equalsButtons.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
});

allclearButtons.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
});

deleteButtons.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
});