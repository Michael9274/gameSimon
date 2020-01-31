const lightBlue = document.getElementById('lightBlue');
const violet = document.getElementById('violet');
const orange = document.getElementById('orange');
const green = document.getElementById('green');

const LAST_LEVEL = 10;
const btnStart = document.getElementById('btnStart');

const startGame = () => {
    window.game = new Game();
}

btnStart.addEventListener('click', startGame);

class Game {
    constructor() {
        this.initialize = this.initialize.bind(this);
        this.initialize();
        this.generateSequence();
        setTimeout(this.nextLevel, 500);
    }

    initialize() {
        this.nextLevel = this.nextLevel.bind(this);
        this.chooseColor = this.chooseColor.bind(this);
        this.toggleBtnStart();
        this.level = 1;
        this.colors = {
            lightBlue,
            violet,
            orange,
            green
        }
    }

    toggleBtnStart() {
        if (btnStart.classList.contains('hide')) {
            btnStart.classList.remove('hide');
        } else {
            btnStart.classList.add('hide');
        }
    }

    generateSequence() {
        this.sequence = new Array(LAST_LEVEL).fill(0).map(() => Math.floor(Math.random() * 4));
    }

    nextLevel() {
        this.sublevel = 0;
        this.illuminateSequence();
        this.addEventsClick();
    }

    transformNumberToColor(numero) {
        switch (numero) {
            case 0:
                return 'lightBlue';
            case 1:
                return 'violet';
            case 2:
                return 'orange';
            case 3:
                return 'green';
        }
    }

    transformColorToNumber(color) {
        switch (color) {
            case 'lightBlue':
                return 0;
            case 'violet':
                return 1;
            case 'orange':
                return 2;
            case 'green':
                return 3;
        }
    }

    illuminateSequence() {
        for (let i = 0; i < this.level; i++) {
            const color = this.transformNumberToColor(this.sequence[i]);
            setTimeout(() => this.illuminateColor(color), 1000 * i);
        }
    }

    illuminateColor(color) {
        this.colors[color].classList.add('light');
        setTimeout(() => this.turnOffColor(color), 350);
    }

    turnOffColor(color) {
        this.colors[color].classList.remove('light');
    }

    addEventsClick() {
        this.colors.lightBlue.addEventListener('click', this.chooseColor);
        this.colors.green.addEventListener('click', this.chooseColor);
        this.colors.violet.addEventListener('click', this.chooseColor);
        this.colors.orange.addEventListener('click', this.chooseColor);
    }

    removeEventsClick() {
        this.colors.lightBlue.removeEventListener('click', this.chooseColor);
        this.colors.green.removeEventListener('click', this.chooseColor);
        this.colors.violet.removeEventListener('click', this.chooseColor);
        this.colors.orange.removeEventListener('click', this.chooseColor);
    }

    chooseColor(ev) {
        const nameColor = ev.target.dataset.color;
        const numberColor = this.transformColorToNumber(nameColor);
        this.illuminateColor(nameColor);
        if (numberColor === this.sequence[this.sublevel]) {
            this.sublevel++;
            if (this.sublevel === this.level) {
                this.level++;
                this.removeEventsClick();
                if (this.level === (LAST_LEVEL + 1)) {
                    this.wonTheGame();
                } else {
                    setTimeout(this.nextLevel, 1500);
                }
            }
        } else {
            this.gameOver();
        }
    }

    wonTheGame() {
        swal('Platzi', 'Felicitaciones, ganaste el juego!', 'success')
            .then(this.initialize);
    }

    gameOver() {
        swal('Platzi', 'Lo lamentamos, perdiste :(', 'error')
            .then(() => {
                this.removeEventsClick();
                this.initialize();
            })
    }

}