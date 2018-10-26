import React from 'react';
import INPUT from '../src/component/input/input'
//import Nya from '../public/nymphea_UI.v_0.0.0'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

//чтоб обновить снапшоты юзай npm test -- -u  если запустишь просто npm test тест ругнется на новый элемент


/*describe('>>>Input --- Shallow Render REACT COMPONENTS',()=>{
    let wrapper
    const output = 10

    beforeEach(()=>{
        wrapper = shallow(<Input />)

    })

    it('+++ render the DUMB component', () => {
        expect(wrapper.length).toEqual(1)
    });

    it('+++ contains output', () => {
        expect(wrapper.find('input[placeholder="Output"]').prop('value')).toEqual(output)
    });

});*/

describe('>>>Input--- Snapshot',()=>{

    it('+++capturing Snapshot of Input', () => {
        const renderedValue =  renderer.create(<INPUT />).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });
});