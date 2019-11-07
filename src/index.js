'use strict';

import DependencyUI  from './extra/checkDependencyUI.js';

import COMPONENT  from './class/component.class.jsx';

import INPUT             from './component/input/input.jsx';
import CLICKEdit         from './component/input/inputClickEdit.jsx';

import BTN               from './component/btn/btn.jsx';
import BTNWithConfirm    from './component/btn/btnWithConfirm.jsx';

import BTNMU             from './component/btn/btn_mu.jsx'; //use dx+mu

import DROPDOWN          from './component/dropdown/dropdown.jsx';

import CHECKBOX          from './component/checkbox/checkbox.jsx';

import LABEL             from './component/label/label.jsx';
import TEXTAREA          from './component/textarea/textarea.jsx';

require("./style/default_style.less");
class nymphea_ui {

}

const NYMPHEA_UI = new nymphea_ui();
NYMPHEA_UI.COMPONENT   = COMPONENT;
NYMPHEA_UI.INPUT       = {
    base : INPUT,
    clickEdit :CLICKEdit,
};

NYMPHEA_UI.BTN= {
    base : BTN,
    withConfirm : BTNWithConfirm,
    baseMU: BTNMU
};

NYMPHEA_UI.DROPDOWN={
    base : DROPDOWN //IM NOT READY!!!!
};
NYMPHEA_UI.CHECKBOX={
    base : CHECKBOX //IM NOT READY!!!!
};
NYMPHEA_UI.LABEL={
    base : LABEL
};
NYMPHEA_UI.TEXTAREA={
    base : TEXTAREA
};

NYMPHEA_UI.reinit = DependencyUI.reinit;

export default NYMPHEA_UI