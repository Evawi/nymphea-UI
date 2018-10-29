import React from 'react';
import INPUT from '../src/component/input/input'
//import Nya from '../public/nymphea_UI.v_0.0.0'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'


//чтоб обновить снапшоты юзай npm test -- -u  если запустишь просто npm test тест ругнется на новый элемент


describe('>>>INPUT simple',()=>{

    it('+++Snapshot default ', () => {
        const renderedValue =  renderer.create(<INPUT />).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });
    it('+++Snapshot PROPS popupLabel ', () => {
        const renderedValue =  renderer.create(
            <INPUT
                 popupLabel="label value"
            />
        ).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });
    it('+++Snapshot STATE error', () => {
        const input = shallow(
            <INPUT type="number" />
        );
        input.find('input').simulate('change', {target: {value: 'abc'} });
        const renderedValue =  renderer.create(<INPUT />).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });
    it('---should handle the onChange event', () => {
        const mockFn = jest.fn();
        const input = shallow(
            <INPUT  />
        );
        input.find('input').simulate('change', {target: {value: 'matched'} });
        expect(input.state().value).toEqual('matched');
        expect(input.state().error).toEqual(false);
    });

    it('---should handle the onChange event PROPS checkEmpty', () => {
        const mockFn = jest.fn();
        const input = shallow(
            <INPUT
             checkEmpty={true}
                />
        );
        input.find('input').simulate('change', {target: {value: ''} });
        expect(input.state().value).toEqual('');
        expect(input.state().error).toEqual(true);
    });
    it('---should handle the onChange event PROPS type NUMBER', () => {
        const mockFn = jest.fn();
        const input = shallow(
            <INPUT type="number" />
        );
        input.find('input').simulate('change', {target: {value: '123'} });
        expect(input.state().value).toEqual('123');
        expect(input.state().error).toEqual(false);
    });
    it('---should handle the onChange event PROPS type NUMBER error', () => {
        const mockFn = jest.fn();
        const input = shallow(
            <INPUT type="number" />
        );
        input.find('input').simulate('change', {target: {value: 'abc'} });
        expect(input.state().value).toEqual('');
        expect(input.state().error).toEqual(true);
    });
});