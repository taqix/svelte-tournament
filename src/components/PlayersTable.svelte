<script lang="ts">
    export let arrUsers
    export let editableId
    export let handleDelete
    export let handleEdit
    export let editUser
    export let handleUpdate
    export let cancelUpdate

</script>
<section>
    {#each arrUsers as user (user.id)}
    
    {#if user.id !== editableId} 
    <tr>
      <td><p style="font-size: 0.6em;">{user.id}</p></td>
      <td><p>{user.data.fname}</p></td>
      <td><p>{user.data.lname}</p></td>
      <td><p>{user.data.age}</p></td>
      <td><p>{user.data.city}</p></td>
      <td><p>{user.data.date}</p></td>
      <button class="delete" on:click={()=>{handleDelete(user.id)}}>X</button>
      <button class="edit" on:click={()=>{handleEdit(user.id)}}>edit</button>
    </tr>
    {:else}
    <tr>
      <td>{user.id}</td>
      <td><input
        
        type="text"
        id="fnameEdit"
        name="fnameEdit"
        bind:value={editUser.fname}
      /></td>
      <td><input
       
        type="text"
        id="lnameEdit"
        name="lnameEdit"
        bind:value={editUser.lname}
      /></td>
      <td><input
        
        type="number"
        id="ageEdit"
        name="ageEdit"
        bind:value={editUser.age}
      /></td>
      <td><input
        type="text"
        id="cityEdit"
        name="cityEdit"
        bind:value={editUser.city}
      /></td>
      <td>{user.data.date}</td>
      <button class="confirm" on:click={()=>{handleUpdate()}}>confirm</button>
      <button class="delete" on:click={()=>{cancelUpdate()}}>cancel</button>
    </tr>
      {/if}
    {/each}
</section>
<style>

  tr{
    width:100%;
    display: flex;
  }
  td{
    flex:1;
    justify-content: stretch;
    border: 1px solid grey;
    text-align: center;
  }
  input {
    border: 1px solid green;
    border-radius: 10px;
    background-color: rgb(211, 216, 222);
    padding: 5px;
  }
  .delete{
    background-color: red;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 60px;
    
    
  }
  .confirm{
    background-color: green;
  }
</style>