new Vue({
    el: '#app',
    data: {

        healthP1: 100,
        healthP2: 100,
        totalDamageP1: null,
        totalDamageP2: null,
        start: false,
        end: false,
        turn: null,
        turnsLog1: [],
        turnsLog2: [],
        currentLog1: null,
        currentLog2: null,
        spellActive: false,
        sound: false,
        hitSound: false,
        spellSound: false,
        spells: [5, 11, 17, 22, 27],
        heroes: [
            { name: 'Subzero', health: 100, fr: 'light' },
            { name: 'Scorpion', health: 100, fr: 'dark' }
        ],
        result: ''

    },
    methods: {
        started: function () {
            this.start = true;
            this.turn = 1;
            this.sound = true;
            this.hitSound = false;

        },

        reset: function () {
            this.healthP1 = 100;
            this.healthP2 = 100;
            this.totalDamageP1 = null;
            this.totalDamageP2 = null;
            this.start = false;
            this.turn = null;
            this.turnsLog1 = [];
            this.turnsLog2 = [];
            this.currentLog1 = null;
            this.currentLog2 = null;
            this.spellActive = false;
            this.end = false;
        },


        doDamage: function (dmgType, dmgK) {
            dmgType === 'Spell' ? this.spellSound = true : this.hitSound = true;
            let dmgP = Math.floor(Math.random() * dmgK)
            this.healthP2 = this.healthP2 - dmgP
            this.totalDamageP2 = this.totalDamageP2 + dmgP
            this.turnsLog1.unshift({
                t: this.turn,
                mess: dmgP === 0 ? this.currentLog1 = `${dmgType} Blocked` : this.currentLog1 = `${dmgType}ed: ${dmgP} dmg`
            })
            dmgP === 0 ? this.currentLog1 = `${dmgType} Blocked` : this.currentLog1 = `${dmgType} Success: ${dmgP} dmg`

        },
        pcDamage: function (dmgType, dmgK) {
            let dmgPc = Math.floor(Math.random() * dmgK)
            this.healthP1 = this.healthP1 - dmgPc
            this.totalDamageP1 = this.totalDamageP1 + dmgPc
            this.turnsLog2.unshift({
                t: this.turn,
                mess: dmgPc === 0 ? this.currentLog2 = `${dmgType} Blocked` : this.currentLog2 = `${dmgType}ed: ${dmgPc} dmg`
            })
            dmgPc === 0 ? this.currentLog2 = `${dmgType} Blocked` : this.currentLog2 = `${dmgType} Success: ${dmgPc} dmg`
            this.turnDamage();
        },

        turnDamage: function () {
            this.turn += 1;
            if (this.totalDamageP1 >= 100 || this.totalDamageP2 >= 100) {

                this.end = true;
            }
        },
        setResult: function (option) {
            this.result = option;
        }
    },




    computed: {
        setOverlay: function () {
            return {

            }

        },
    },
    watch: {
        turn: function (value) {
            game = this;
            if (value > 0) {

                setTimeout(function () {
                    game.hitSound = false;
                }, 200);
                setTimeout(function () {
                    game.spellSound = false;
                }, 600);
            }
            if (game.spells.indexOf(value) > -1) {
                game.spellActive = true;
            } else {
                game.spellActive = false;
            }

        },

        end: function (value) {
            game = this;
            if (value) {
                if (game.healthP2 <= 0 && game.healthP1 <= 0) {
                    game.setResult('DRAW');
                } else if (game.healthP1 <= 0) {
                    game.healthP1 = 0;
                    game.setResult('You Loose ...');

                } else {
                    game.healthP2 = 0;
                    game.setResult('You WIN !!!');
                }
            }
        }
    }
})













