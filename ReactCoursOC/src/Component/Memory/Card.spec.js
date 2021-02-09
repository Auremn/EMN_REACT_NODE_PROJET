
import React from 'react'
import { shallow } from 'enzyme'

import Card from './Card'

import sinon from 'sinon'
import { expect as expectChai } from 'chai'

describe('<Card />', () => {
    it('should trigger its OnClick when prop is clicked', () => {
        const onClick = jest.fn()
        // Ou Avec Sinon/Chai:
        // const onClick = sinon.spy()
        const wrapper = shallow(<Card card={'T'} onClick={onClick} feedback={'hidden'} index={0} key={0} />)

        wrapper.simulate('click')
        expect(onClick).toHaveBeenCalledWith(0)
        // OU Avec Sinon/Chai:
        // expectChai(onClick).to.have.been.calledWith(0)
    });

    it('should match its reference snapshot', () => {
        const onClick = sinon.spy()
        const wrapper = shallow(
            <Card card="😁" feedback="hidden" index={0} onClick={onClick} />
        )

        expectChai(wrapper).to.matchSnapshot()
    })

});