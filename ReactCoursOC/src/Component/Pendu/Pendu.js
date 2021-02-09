import './Pendu.css';
import React, { Component } from 'react';
import Letter from './Lettre';
import shuffle from 'lodash.shuffle';
import axios from "axios";



const ALPHA = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
export const PHRASE = ["abc"];

class Pendu extends Component {

    state = {
        letters: ALPHA,
        usedLetters: [],
        phraseU: this.generatePhrase(),
        motScript: "",
        nbVie: 11,
        reset: false,
        name: "",
        records: [],
    };

    componentWillMount() {
        this.computeDisplay(this.state.phraseU, this.state.usedLetters);
        this.getRecord();
    };

    componentDidUpdate() {
        this.getRecord();
    };

    getRecord() {
        axios.get(`http://localhost:3000/api/record/`)
            .then(res => {
                const records = res.data;
                this.setState({ records });
            });
    };

    generatePhrase() {
        const candidates = shuffle(PHRASE);
        const result = candidates.pop();
        console.log(result);
        return result;
    };

    // for binding
    handleCardClick = index => {
        const { motScript,phraseU,letters,usedLetters } = this.state;
        let { nbVie,reset } = this.state;

        const targetLetter = letters[index];

        if (nbVie<=0 || (motScript.length === phraseU.length)) {
            this.setState({reset: true});
            return;
        }


        if (!reset) {
            let test = phraseU.indexOf(targetLetter);
            if (test === -1) nbVie--;
            this.setState({nbVie: nbVie});

            if (usedLetters.includes(targetLetter)) {
                return;
            }
            usedLetters.push(targetLetter);
            this.computeDisplay(phraseU,usedLetters);
        }

    };

    handleSubmit = event  => {
        const { name, nbVie } = this.state;
        event.preventDefault();

        axios.post(`http://localhost:3000/api/record/`, { name, nbVie })
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
        this.setState({name: null});
    };

    // Si une lettre de la
    // phrase est dans usedLettres, alors on affiche la lettre
    computeDisplay(phrase, usedLetters) {
        const result = phrase.replace(/\w/g,    (letter) => (
            usedLetters.includes(letter) ? letter : ' _ '));
        this.setState({ motScript: result});
        return result;
    };

     relaunchNewGame = () => {
        const phraseU = this.generatePhrase();
        const letters = ALPHA;
        const usedLetters = [];
        const motScript = "";
        const nbVie = 11;
        const reset = false;
        const name = "";

        this.setState({ letters, usedLetters, phraseU, motScript, nbVie, reset, name });
    };

     getFeedbackForLetter(index) {
        const { letters, usedLetters, phraseU } = this.state;
        const targetLetter = letters[index];
        const lettreMatch = usedLetters.includes(targetLetter);

        if (lettreMatch) {
            return phraseU.includes(targetLetter) ? 'PickedAndGood' : 'PickedAndFalse';
        } else {
            return 'NotPicked';
        }
    };

    render() {
        const { letters,motScript,phraseU,records } = this.state;
        let nbBadTry = this.state.nbVie;
        const win = (motScript.length === phraseU.length);
        const loose = nbBadTry === 0;

        return(
            <div className="JeuDuPendu">
                <h1>Jeu du Pendu</h1>

                {win}
                <div className="Clavier">
                    {letters.map((lettre, index) => (
                        <Letter
                            feedback={this.getFeedbackForLetter(index)}
                            letter={lettre}
                            onClick={this.handleCardClick}
                            index={index}
                            key={index}/>
                    ))}
                </div>


                <article>
                    <div className="DevineMot">
                        {motScript}
                    </div>

                    <div className="NbVieRestante">
                        <p>Nombre de Vie restante: {nbBadTry}</p>
                    </div>

                    <div className="NewGameButton">
                        <button className="BTNReload" onClick={this.relaunchNewGame}>
                            Recommencer une nouvelle partie
                        </button>
                    </div>
                </article>

                <footer>
                    {win &&
                    <div className="WinScreen">
                        <p>GG C'est win</p>
                    </div>}

                    {loose &&
                    <div className="LooseScreen">
                        <p>GG T'es vraiment nul</p>
                    </div>
                    }

                    {win && (this.state.name != null &&
                    <div className="SubmitRecord">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Pseudo</label>
                                <input
                                type="text"
                                placeholder="Quel est votre Pseudo ?"
                                value={this.state.name}
                                onChange={e => this.setState({name: e.target.value})} />
                            </div>
                            <button type="submit">Valider</button>
                        </form>
                    </div>)}



                    <div className="TabRecord">
                        <table>
                            <thead>
                            <tr>
                                <th>Pseudo</th>
                                <th>Date</th>
                                <th>score</th>
                            </tr>
                            </thead>
                            <tbody>
                            {records.map(record =>
                                <tr key={record.name}>
                                    <td>{record.name}</td>
                                    <td>{record.date}</td>
                                    <td>{record.Score}</td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </footer>
            </div>
            );
    };
}

export default Pendu;
