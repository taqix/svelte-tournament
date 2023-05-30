<script lang="ts">
    export let fname
    export let lname
    export let age
    export let city
    export let sendNewPlayer
    export let backToHome
</script>
<section>
    <div class="container flex flex-col items-center">
        <button on:click={()=>backToHome()} class="login">Back</button>
        <div class="flex flex-row mt-4 items-center">
          <label for="fname">Imie:</label><br />
          <input
            class="ml-3"
            type="text"
            id="fname"
            name="fname"
            bind:value={fname}
          />
        </div>
        <div class="flex flex-row mt-4 items-center">
          <label for="lname">Nazwisko:</label><br />
          <input
            class="ml-3"
            type="text"
            id="lname"
            name="lname"
            bind:value={lname}
          />
        </div>
        <div class="flex flex-row mt-4 items-center">
          <label for="age">Wiek:</label><br />
          <input
            class="ml-3"
            type="number"
            id="age"
            name="age"
            bind:value={age}
          />
        </div>
        <div class="flex flex-row mt-4 items-center">
          <label for="age">Miejscowość:</label><br />
          <input
            class="ml-3"
            type="text"
            id="city"
            name="city"
            bind:value={city}
          />
        </div>
        <div class="row mt-4">
          <button class="login" on:click={sendNewPlayer}>Zapisz</button>
        </div>
      </div>
</section>
<style>

  input {
    border: 1px solid green;
    border-radius: 10px;
    background-color: rgb(211, 216, 222);
    padding: 5px;
  }
  .login {
    background-color: aqua;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 150px;
    border: 1px solid rgb(2, 120, 170);
    border-radius: 20px;
  }
 
</style>