import {expect as expectChai, expect} from 'chai'
import React from 'react'
import { shallow } from 'enzyme'

import App, {SYMBOLS} from './App'
import GuessCount from "./GuessCount";
import Card from "./Card";
import sinon from "sinon";


describe('<App /> jeu de memoire', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<App />)

        expect(wrapper).to.contain(<GuessCount guesses={0} /> )
    });

    it('has 36 Card', () => {
        const wrapper = shallow(<App />)

        expect(wrapper.find('Card')).to.have.length(36)
    });

    it('should match its reference snapshot', () => {
        const mock = sinon
            .stub(App.prototype, 'generateCards')
            .returns([...SYMBOLS.repeat(2)])
        try {
            const wrapper = shallow(<App />)

            expectChai(wrapper).to.matchSnapshot()
        } finally {
            mock.restore()
        }

    });
});

