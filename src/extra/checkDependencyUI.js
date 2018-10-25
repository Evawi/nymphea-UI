'use strict';

// UI: Semantic; Material;          // default= ""
// widgets : Devexpress; Ace;        // default= []


class UsedDependencyUI{
    constructor() {
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

        SELF.input = SELF.input.bind(this);
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
    inputWithBtn(){

    }

}
const DependencyUI = new UsedDependencyUI();
export default DependencyUI