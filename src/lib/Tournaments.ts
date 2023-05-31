export class Tournament{
    private amountOfPlayers: number
    private roundStages: number
    private arrPlayers: Array<any>
    private arrPlayersSettled: Array<any>
    private bracketsArray: any[][]
    constructor(amountOfPlayers: number, arrPlayers: Array<any>){
        this.amountOfPlayers = amountOfPlayers
        this.arrPlayers = arrPlayers
        this.arrPlayersSettled = []
        this.roundStages = Math.log2(this.getNearestPowerOfTwo())
        this.bracketsArray = []
        for(let i = 0; i < 2; i++){
            this.bracketsArray[i] = []
            for(let j = 0; j < 2; j++){
                this.bracketsArray[i][j] = 0
            }
        }
    }
    getNearestPowerOfTwo(): number{
        return Math.pow(2,Math.ceil(Math.log2(this.amountOfPlayers))-1)
    }
    setRoundStages(numberPow: number){
        this.roundStages = Math.log2(numberPow)
    }
    createBrackets(){
        const nearestPowerOfTwo = this.getNearestPowerOfTwo()
        this.roundStages = Math.log2(nearestPowerOfTwo)
        for(let i=0;i<nearestPowerOfTwo;i++){
            const player = this.arrPlayers[Math.floor(Math.random()*this.arrPlayers.length)]
            if(!this.arrPlayersSettled.includes(player)){
                this.arrPlayersSettled.push(player);
            }
            else{
                i--
            }
        }
        
        this.arrPlayersSettled.forEach((player)=>{
            console.log(player)
        })
        for(let i = 0; i < this.arrPlayersSettled.length/2; i++){
            this.bracketsArray[i] = []
            for(let j = 0; j < 2; j++){
                this.bracketsArray[i][j] = 0
            }
        }

    }
    getPlayersSettled(): Array<any>{
        return this.arrPlayersSettled
    }
    drawPlayers(winnerPlayers: Array<any>): any[][]{
        console.log(winnerPlayers)
        // console.log("test",this.arrPlayersSettled,)
        const arrByo = []
        for(let i=0;i<winnerPlayers.length/2;i++){
            for(let j=0;j<2;j++){
                const randomPlayer = winnerPlayers[Math.floor(Math.random()*winnerPlayers.length)]
                if(!arrByo.includes(randomPlayer)){
                    this.bracketsArray[i][j]=randomPlayer;
                    arrByo.push(randomPlayer)
                }
                else{
                    j--
                }
            }

        }
        return this.bracketsArray
    }
}