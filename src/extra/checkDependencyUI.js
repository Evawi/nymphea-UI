'use strict';

// UI: Semantic; Material;          // default= ""
// widgets : Devexpress; Ace;        // default= []


class UsedDependencyUI{
    constructor() {
        let SELF = this;

        SELF.reinit = SELF.reinit.bind(this);
        SELF.input = SELF.input.bind(this);

        SELF.UI_Semantic; //depr
        SELF.UI_Material;
        SELF.UI_Default;
        if(window.UI_settings){
            if(window.UI_settings.Tooltip){
                SELF.Tooltip = window.UI_settings.Tooltip.ensure;
            }
            if(window.UI_settings.UI){
                switch (window.UI_settings.UI){
                    case "Semantic" : SELF.UI_Semantic=true; break; //depr
                    case "Material" : SELF.UI_Material=true; break;
                    default: SELF.UI_Default=true;
                }
            }
        }

        SELF.Tooltip;
    }
    reinit(){
        let SELF = this;
        SELF.UI_Semantic; //depr
        SELF.UI_Material;
        SELF.UI_Default;
        if(window.UI_settings){
            if(window.UI_settings.Tooltip){
                SELF.Tooltip = window.UI_settings.Tooltip.ensure;
            }
            if(window.UI_settings.UI){
                switch (window.UI_settings.UI){
                    case "Semantic" : SELF.UI_Semantic=true; break; //depr
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
        if(SELF.UI_Semantic) { //depr
            mainClass = " ui input form ";
            formField = " field "
        }
        if(SELF.UI_Material) {
            mainClass = " ui input form ";
            formField = " mdc-text-field "
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

        mainClass = " ui input form ";
        formField = " field ";
        iconEdit      = " edit icon ";
        iconCheck   = " icon check ";
        iconCancel = " close icon ";

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
        if(SELF.UI_Material) {
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

        mainClass = " ui fluid search selection dropdown  ";
        btnClass = " ui button "

        return {
            mainClass:mainClass,
            btnClass:btnClass
        }
    }
    checkbox(){
        let SELF = this;
        let mainClass = ""; //стиль элемента из UI зависимостей
        let toggleType = "";
        let sliderType = "";
        if(SELF.UI_Semantic ) {
            mainClass = " ui checkbox ";
            toggleType = " toggle ";
            sliderType = " slider ";
        }
        if(SELF.UI_Material) {
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
        if(SELF.UI_Semantic || SELF.UI_Material) {
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
        if(SELF.UI_Semantic || SELF.UI_Material) {
            mainClass = " ui label ";
        }
        return {
            mainClass:mainClass,
        }
    }
    textarea(){
        let SELF = this;
        let mainClass = ""; //стиль элемента из UI зависимостей
        if(SELF.UI_Semantic || SELF.UI_Material) {
            mainClass = " ui textarea form";
        }
        return {
            mainClass:mainClass,
        }
    }
    dropdown(){
        let SELF = this;
        let mainClass = ""; //стиль элемента из UI зависимостей
        let searchClass = ""
        if(SELF.UI_Semantic || SELF.UI_Material) {
            searchClass = " ui fluid search selection dropdown ";
            mainClass = "ui dropdown label"
        }
        return {
            mainClass: "ui form ",
            mainField:mainClass,
            searchField:searchClass
        }
    }

}
const DependencyUI = new UsedDependencyUI();
export default DependencyUI