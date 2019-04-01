'use strict';

// UI: Semantic; Material;          // default= ""
// widgets : Devexpress; Ace;        // default= []


class UsedDependencyUI{
    constructor() {
        let SELF = this;

        SELF.reinit = SELF.reinit.bind(this);
        SELF.input = SELF.input.bind(this);

        SELF.UI_Semantic;
        SELF.UI_Material;
        SELF.UI_Default;
        if(window.UI_settings){
            if(window.UI_settings.UI){
                switch (window.UI_settings.UI){
                    case "Semantic" : SELF.UI_Semantic=true; break;
                    case "Material" : SELF.UI_Material=true; break;
                    default: SELF.UI_Default=true;
                }
            }
        }
        
    }
    reinit(){
        let SELF = this;
        SELF.UI_Semantic;
        SELF.UI_Material;
        SELF.UI_Default;
        if(window.UI_settings){
            if(window.UI_settings.UI){
                switch (window.UI_settings.UI){
                    case "Semantic" : SELF.UI_Semantic=true; break;
                    case "Material" : SELF.UI_Material=true; break;
                    default: SELF.UI_Default=true;
                }
            }
        }
    }
    input(){
        let SELF = this;
        let mainClass = ""; //стиль элемента из UI зависимостей
        let formField = "";
        if(SELF.UI_Semantic) {
            mainClass = " ui input form ";
            formField = " field "
        }
        return {
            mainClass:mainClass,
            formField:formField
        }
    }
    inputClickEdit(){
        let SELF = this;
        let mainClass = ""; //стиль элемента из UI зависимостей
        let formField = "";
        let iconEdit = "";
        let iconCheck = "" ;
        let iconCancel = ""
        if(SELF.UI_Semantic) {
            mainClass = " ui input form ";
            formField = " field ";
            iconEdit      = " edit icon ";
            iconCheck   = " icon check ";
            iconCancel = " close icon "
        }
        return {
            mainClass:mainClass,
            formField:formField,
            iconEdit:iconEdit,
            iconCheck:iconCheck,
            iconCancel:iconCancel
        }
    }
    btn(){
        let SELF = this;
        let mainClass = ""; //стиль элемента из UI зависимостей
        let btnClass = "";
        if(SELF.UI_Semantic) {
            mainClass = " btn ";
            btnClass = " ui button "
        }
        return {
            mainClass:mainClass,
            btnClass:btnClass
        }
    }
    btnWithConfirm(){
        let SELF = this;
        let mainClass = ""; //стиль элемента из UI зависимостей
        let btnClass = "";
        if(SELF.UI_Semantic) {
            mainClass = " ui fluid search selection dropdown  ";
            btnClass = " ui button "
        }
        return {
            mainClass:mainClass,
            btnClass:btnClass
        }
    }
    input(){
        let SELF = this;
        let mainClass = ""; //стиль элемента из UI зависимостей
        let formField = "";
        if(SELF.UI_Semantic) {
            mainClass = " ui input form ";
            formField = " field "
        }
        return {
            mainClass:mainClass,
            formField:formField
        }
    }
    checkbox(){
        let SELF = this;
        let mainClass = ""; //стиль элемента из UI зависимостей
        let toggleType = "";
        let sliderType = "";
        if(SELF.UI_Semantic) {
            mainClass = " ui checkbox ";
            toggleType = " toggle ";
            sliderType = " slider ";
        }
        return {
            mainClass:mainClass,
            toggleType:toggleType,
            sliderType:sliderType
        }
    }
    dateTime(){
        let SELF = this;
        let mainClass = ""; //стиль элемента из UI зависимостей
        let formField = "";
        if(SELF.UI_Semantic) {
            mainClass = " ui calendar form ";
            formField = " ui calendar "
        }
        return {
            mainClass:mainClass,
            formField:formField
        }
    }
    label(){
        let SELF = this;
        let mainClass = ""; //стиль элемента из UI зависимостей
        if(SELF.UI_Semantic) {
            mainClass = " ui label ";
        }
        return {
            mainClass:mainClass,
        }
    }
    textarea(){
        let SELF = this;
        let mainClass = ""; //стиль элемента из UI зависимостей
        if(SELF.UI_Semantic) {
            mainClass = " ui textarea form";
        }
        return {
            mainClass:mainClass,
        }
    }
    dropdown(){

    }

}
const DependencyUI = new UsedDependencyUI();
export default DependencyUI