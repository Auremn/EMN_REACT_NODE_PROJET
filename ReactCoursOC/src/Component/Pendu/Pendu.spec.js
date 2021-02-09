import { expect as expectChai } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import sinon, {mock} from "sinon";


import Pendu, {PHRASE} from './Pendu'
import wrap from "chai-enzyme/build/wrap";

describe('<Pendu /> jeu du pendu', () => {

    it('renders without crashing', () => {
        const wrapper = shallow(<Pendu />)
        const onClick = sinon.spy()

        expectChai(wrapper).to.contain(<p>Nombre de Vie restante: {11}</p>)
    });

    it('should have 26 letter (Kappa)', () => {
        const wrapper = shallow(<Pendu />)

        expectChai(wrapper.find('Lettre')).to.have.length(26)
    });

    it('should have loose', () => {
        const wrapper = shallow(<Pendu />)
        wrapper.setState({ nbVie: 0})

        expectChai(wrapper.find('.LooseScreen')).to.have.length(1)
    });

    it('should have win', () => {
        const wrapper = shallow(<Pendu />)
        wrapper.setState({
            phraseU: 'abc',
            motScript: 'abc',
        })
        expectChai(wrapper.find('.WinScreen')).to.have.length(1)
    });

   // it('should  reset the game', () => {
      //  const wrapper = shallow(<Pendu />)
      //  wrapper.setState({ nbVie: 0})


   //     const testComponentInstance = renderer
   //         .create((<button className="success" onClick={Pendu.prototype.relaunchNewGame}/>))
   //         .root

        // Try to find submit button inside the form.
//        const submitButtonInstance = testComponentInstance.findByProps({ type: 'submit', });
//       expect(submitButtonInstance).toBeDefined();

   //     const eventMock = { preventDefault: jest.fn() };
   //     submitButtonInstance.props.onClick(eventMock);

   //     expect(Pendu.prototype.relaunchNewGame).toHaveBeenCalledTimes(1);

    //});

    it("Expects to run relaunchNewGame when button is pressed", () => {
        const wrapper = shallow(<Pendu />)

        const component = wrapper.instance()
        component.setState({ nbVie: 0})

        expectChai(component.state.nbVie).to.equal(0);

        wrapper.find('button').simulate('click');

        expectChai(component.state.nbVie).to.equal(11);
    });

    it("should generatePhrase return one word", () => {
        const wrapper = shallow(<Pendu />)
        const component = wrapper.instance()
        const result = component.generatePhrase()
        expectChai([...PHRASE]).to.contain(result)

    })
    // https://www.google.fr/maps/dir/62+Rue+de+Heminville,+Lesm%C3%A9nils/48.9418643,6.1496136/48.9165977,6.1560323/48.9160655,6.1160497/62+Rue+de+Heminville,+54700+Lesm%C3%A9nils/@49.006096,6.1091939,15.12z/data=!4m27!4m26!1m10!1m1!1s0x4794c6dcc305fb03:0x70c6634c852edda6!2m2!1d6.1023777!2d48.92953!3m4!1m2!1d6.1137448!2d48.9520738!3s0x4794c6ba672a9567:0x12edba03a0619610!1m0!1m0!1m5!3m4!1m2!1d6.0899724!2d48.9241363!3s0x4794c6e3cdbd7ffd:0xf1db43a98e7f2102!1m5!1m1!1s0x4794c6dcc305fb03:0x70c6634c852edda6!2m2!1d6.1023777!2d48.92953!3e2

    it('should run computeDisplay', () => {
        const wrapper = shallow(<Pendu />)
        const component = wrapper.instance()
        component.setState({ phraseU: 'az', motScript: ' _ '})

        // on passe l'indice 0 correspondant au 'a' present dans phraseU
        component.handleCardClick(0);

        expectChai(component.state.motScript).to.equal('a _ ')
    });

    it('should run computeDisplay and more', () => {
        const wrapper = shallow(<Pendu />)
        const component = wrapper.instance()
        component.setState({ phraseU: 'az', motScript: ' _ '})

        // on passe l'indice 0 correspondant au 'a' present dans phraseU
        component.handleCardClick(0);
        component.handleCardClick(0);
        expectChai(component.state.nbVie).to.equal(11)
        component.handleCardClick(1);
        expectChai(component.state.nbVie).to.equal(10)
        expectChai(component.state.motScript).to.equal('a _ ')
    });

    it('should pass the var reset at true if the game is end', () => {
        const wrapper = shallow(<Pendu />)
        const component = wrapper.instance()
        component.setState({ phraseU: 'az', motScript: ' _ '})

        // on passe l'indice 0 correspondant au 'a' present dans phraseU
        component.handleCardClick(1);
        component.handleCardClick(1);
        component.handleCardClick(1);
        component.handleCardClick(1);
        component.handleCardClick(1);
        component.handleCardClick(1);
        component.handleCardClick(1);
        component.handleCardClick(1);
        component.handleCardClick(1);
        component.handleCardClick(1);
        component.handleCardClick(1);
        component.handleCardClick(1);
        expectChai(component.state.nbVie).to.equal(0)

        expectChai(component.state.reset).to.equal(true)
    });

});
