import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { expect as expectChai } from 'chai'

import Lettre from './Lettre'
import Letter from "./Lettre";

describe('<Lettre />', () => {
    it('should trigger its OnClick when prop is clicked', () => {
        //const onClick = jest.fn()
        // Ou Avec Sinon/Chai:
        const onClick = sinon.spy()
        const wrapper = shallow(<Letter
            feedback="NotPicked"
            letter="a"
            onClick={onClick}
            index={0}
            key={0}/>)

        wrapper.simulate('click')
        // expect(onClick).toHaveBeenCalledWith(0)
        // OU Avec Sinon/Chai:
        expectChai(onClick).to.have.been.called()
    });

});