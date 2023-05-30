<script lang="ts">
  import { initializeApp } from "firebase/app";
  // import { JsonDatabase } from "brackets-json-db"
  import PlayersTable from "./components/PlayersTable.svelte";
  import RegisterPlayer from "./components/RegisterPlayer.svelte";
  
  import { onMount } from 'svelte';
  import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    getDoc,
    getDocs,
    deleteDoc,
    updateDoc
  } from "firebase/firestore";
  const firebaseConfig = {
    apiKey: "AIzaSyB5tJ6JABoIgh8b-CkedAJKMadL2wySoXg",
    authDomain: "todo-2cf4d.firebaseapp.com",
    projectId: "todo-2cf4d",
    storageBucket: "todo-2cf4d.appspot.com",
    messagingSenderId: "905978612163",
    appId: "1:905978612163:web:4a4c0bb6d7b0992a7c1576",
  };
  const data = {
    name: "test",
    country: "test",
  };
  // Initialize Firebase
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const dbRef = collection(db, "users");
  const docRef = doc(db, "users", "users");
  let isSended = true;
  // @ts-ignore
  const arrUsers = [];
  async function dataGet() {
    const querySnapshot = await getDocs(collection(db, "users"));
    arrUsers.splice(0,arrUsers.length)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      const user = { id: doc.id, data: doc.data() };
      arrUsers.push(user);
    });
    return true
  }
  
  let fname = "";
  let lname = "";
  let age = "";
  let city = "";
  let editUser = {
    fname: "",
    lname: "",
    age: "",
    city:""
  }
  async function sendNewPlayer() {
    if (fname == "" || lname == "" || age == null || city == "") {
      return;
    }
    if (
      fname.trim() == "" ||
      lname.trim() == "" ||
      age == null ||
      city.trim() == ""
    ) {
      return;
    }
    console.log(fname, lname, age, city)
    const start = new Date().toLocaleString();
    const dataRec = {
      fname: fname,
      lname: lname,
      age: age,
      city: city,
      date: start,
    };
    const newRec = await addDoc(dbRef, dataRec);
    handleGet()
    isSended = true;
    console.log("added new record");
  }
  async function deletePlayer(id: string) {
    const deletedUser = await deleteDoc(doc(db,'users',id))
    const gettingData = await dataGet();
    console.log("usunieto")
    return true
  }

  let editableId: string = ""
  let promise
  function backToHome(){
    isSended = true
  }
  function handleGet(){
    promise = dataGet()
  }
  function handleDelete(id: string) {
    promise = deletePlayer(id)
  }
  function handleEdit(id: string) {
    arrUsers.forEach((user)=>{
      if(user.id ===id){
        console.log("edited",user);
        
        editUser.fname = user.data.fname
        editUser.lname = user.data.lname
        editUser.age = user.data.age
        editUser.city = user.data.city

      }
    })
    console.log(editUser,id)
    editableId = id
  }
  function cancelUpdate(){
    editableId = ""
  }
  function handleUpdate(){
    promise = updatePlayer()
  }
  async function updatePlayer() {
    const actRef = doc(db, "users",editableId);
    console.log(editUser)
    const update = await updateDoc(actRef,editUser)
    console.log("updated")
    editableId = ""
    const gettingData = await dataGet()
    return true
  }
  onMount(async () =>{
    handleGet()
  })  
  function getNearestPowerOfTwo(input: number): number{
    
    return Math.pow(2,Math.ceil(Math.log2(input))-1)
    
    
  }
  console.log(getNearestPowerOfTwo(13))
</script>

<main>
  {#if isSended}
  <div class="container flex flex-col items-center">
    <div class="flex flex-row">
      <button class="bg-zinc-500 hover:bg-zinc-700 ease-out duration-300 text-white font-bold py-2 px-4 rounded-full" on:click={()=>{isSended=false}}>Register player</button>
    </div>
    <h1>Players</h1>
    <table class="flex flex-col justify-center">
      {#await promise}
      <p>...waiting</p>
      {:then}
      <PlayersTable cancelUpdate={cancelUpdate} arrUsers={arrUsers} editableId={editableId} handleDelete={handleDelete} handleEdit={handleEdit} editUser={editUser} handleUpdate={handleUpdate} />
      {:catch error}
      <p style="color:red">error: {error}</p>
      {/await}
      
    </table>
    <button class=" mt-2 bg-zinc-500 hover:bg-zinc-700 ease-out duration-300 text-white font-bold py-2 px-4 rounded-full" on:click={()=>{}}>Start tournament</button>

  </div>
  
  {:else}
  <RegisterPlayer bind:fname={fname} bind:lname={lname} bind:age={age} bind:city={city} sendNewPlayer={sendNewPlayer} backToHome={backToHome}/>
  {/if}
</main>

<style>
  table{
    width: 100%;
  }
  
</style>
