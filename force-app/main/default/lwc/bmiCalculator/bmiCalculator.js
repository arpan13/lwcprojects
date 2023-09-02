import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {
    height = "";
    weight = "";
    bmiValue = "";
    result = "";
    inputHandler(event) {
        const { name, value } = event.target;
        if (name == 'height') {
            this.height = value;
        } if (name == 'weight') {
            this.weight = value;
        }

        //this[name]=value;
    }

    submitHandler(event) {
        event.preventDefault();
        console.log(this.height);
        console.log(this.weight);
        this.calculate();
    }

    calculate() {
        let height = Number(this.height) / 100;
        let weight = Number(this.weight);
        let bmi = weight / (height * height);
        console.log('BMI Value', bmi);
        this.bmiValue = Number(bmi.toFixed(2));//toFixed will consider 2 digits after decimal point
        if (this.bmiValue < 18.5) {
            this.result = "Underweight";
        } else if (this.bmiValue > 18.5 && this.bmiValue < 25) {
            this.result = "Healthy";
        } else if (this.bmiValue > 25 && this.bmiValue < 30) {
            this.result = "Overweight";
        } else {
            this.result = "Obese";
        }
        console.log('BMI Value', this.bmiValue);
        console.log('Result', this.result);
    }
    reCalculate() {
        this.height = "";
        this.weight = "";
        this.bmiValue = "";
        this.result = "";
    }

}