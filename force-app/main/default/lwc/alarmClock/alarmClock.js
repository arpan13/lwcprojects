import { LightningElement } from 'lwc';
import AlarmClockAssets from "@salesforce/resourceUrl/AlarmClockAssets";
export default class AlarmClock extends LightningElement {
    clockImage = AlarmClockAssets + '/AlarmClockAssets/clock.png';
    ringtone = new Audio(AlarmClockAssets + '/AlarmClockAssets/Clocksound.mp3');
    currentTime = "";
    hours = [];
    mins = [];
    meridians = ["AM", "PM"];
    hourSelected;
    minSelected;
    meridiemSelected;
    alarmTime;
    isAlarmSet = false;
    isAlarmTriggered = false;

    get isFieldNotSelected() {
        return !(this.hourSelected && this.minSelected && this.meridiemSelected);
    }

    get shakeImage() {
        return this.isAlarmTriggered ? 'shake' : '';
    }
    connectedCallback() {
        this.createHoursOptions();
        this.createMinOptions();
        this.currentTimehandler();
    }

    currentTimehandler() {

        setInterval(() => {
            let dateTime = new Date();
            let hour = dateTime.getHours();
            let min = dateTime.getMinutes();
            let sec = dateTime.getSeconds();
            let ampm = "AM";
            if (hour == 0) {
                hour = 12;
            } else if (hour >= 12) {
                hour = hour - 12;
                ampm = "PM";
            }
            hour = hour < 10 ? "0" + hour : hour;
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            this.currentTime = `${hour}:${min}:${sec} ${ampm}`;
            if (this.alarmTime == `${hour}:${min} ${ampm}`) {
                this.isAlarmTriggered = true;
                this.ringtone.play();
                this.ringtone.loop = true;
            }
        }, 1000)


    }
    createHoursOptions() {
        for (let i = 1; i <= 12; i++) {
            let val = i < 10 ? `0${i}` : i;
            this.hours.push(val);

        }
    }
    createMinOptions() {
        for (let i = 0; i <= 59; i++) {
            let val = i < 10 ? `0${i}` : i;
            this.mins.push(val);

        }
    }

    optionHandler(event) {
        const { label, value } = event.detail;
        if (label === 'Hours') {
            this.hourSelected = value;
        } else if (label === 'Mins') {
            this.minSelected = value;
        } else if (label === 'AM/PM') {
            this.meridiemSelected = value;
        }
    }

    setAlarmHandler(event) {
        this.alarmTime = `${this.hourSelected}:${this.minSelected} ${this.meridiemSelected}`;
        this.isAlarmSet = true;
    }

    clearAlarmHandler() {
        this.alarmTime = '';
        this.isAlarmSet = false;
        this.isAlarmTriggered = false;
        this.ringtone.pause();
        const elements = this.template.querySelectorAll('c-clock-drop-down');
        Array.from(elements).forEach(element => {
            element.reset('');
        })
    }
}