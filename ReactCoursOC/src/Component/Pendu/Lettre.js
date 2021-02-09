import React from 'react'
import PropTypes from 'prop-types'
import './Lettre.css'

const Lettre = ({ letter, feedback, onClick, index }) => (
    <div className={`Clavar ${feedback}`} onClick={ () => onClick(index)}>
        <span className="letter ">
            {letter}
        </span>
    </div>
)


Lettre.propTypes = {
    letter: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    feedback: PropTypes.oneOf([
        'PickedAndGood',
        'PickedAndFalse',
        'NotPicked',
    ]).isRequired,
}

export default Lettre