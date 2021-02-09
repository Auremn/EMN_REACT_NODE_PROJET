import { expect as expectChai } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import sinon, {mock} from "sinon";

import Main from './Main'
import { BrowserRouter as Router } from 'react-router-dom';


describe('<Main />', () => {
    it('renders without crashing', () => {
        shallow(
            <Router>
                <Main />
            </Router>);
    });


});