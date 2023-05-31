<script>
    import {Tournament} from "../lib/Tournaments"
    import {onMount} from "svelte"
    export let arrUsers
    let players = []
    const tournament = new Tournament(arrUsers.length, arrUsers)
    onMount(async()=>{
        
        tournament.createBrackets()
        const playersSettled = tournament.getPlayersSettled()
        players = tournament.drawPlayers(playersSettled)
        players.forEach(()=>{
            results.push([null,null])
        })
    })
    $: console.log(results)
    const results = []
    const nextRound = ()=>{
        let isNull = false
        results.forEach((result)=>{
            if(result[0]===null || result[1]===null) isNull = true
        })
        if(isNull) return
        else{
            console.log(":Sada")
        }
    }
</script>
<section class="container flex justify-center items-center flex-col">
    <h1 class="text-2xl font-semibold">Matches</h1>
    
    <div>

        <div class="flex flex-col gap-2">
    {#each players as duel,i}
    

        <div class="row flex flex-row justify-center gap-3">

        
        {#each duel as player,index}
        {#if index === 0}
        <div class="player flex justify-end">
            <p style="text-align: center;">{player.data.fname}</p>
            <input type=number class="inputNumb" bind:value={results[i][index]}>
        </div>
        VS
        {:else}
        <div class="player flex justify-start">
            <input type=number class="inputNumb" bind:value={results[i][index]}>
            <p style="text-align: center;">{player.data.fname}</p>
            
        </div>
        {/if}
        
        
        {/each}
        </div>
        
        
    
    {/each}
</div>

</div>
<div class="mt-3">
    <button on:click={()=>{nextRound()}}>Zatwierdź</button>
</div>

</section>
<style>
    .inputNumb{
        width:20%
    }
    .player > p{
        width:40%
    }
    .player{
        width: 45%;
    }
</style>