<script lang="ts">
    import { CreateTodoList, AllTodoList, SelectTodoList, DeleteTodoList, SelectedTodoListId } from "../store/store";
    import PopUp from "./PopUp.svelte";
    
    let showPopUp = false;
    function AddTodoList(e: CustomEvent<string>) {
        CreateTodoList(e.detail);
        showPopUp = false;
    }
</script>

<style>
    div{
        display: flex;
        justify-content: space-between;
    }

    li:hover{
        text-decoration: underline;
        cursor: pointer;
    }
    li{
        list-style-type: none;
        display: flex;
        margin: 3px 5px;
    }
    i{
        font-size: x-large;
    }

    .fa-trash-can{
        font-size: medium;
        color: red;
    }

    span{
        flex-grow: 1;
    }

</style>

<section>
    <PopUp {showPopUp} on:close-popup={() => showPopUp = false} on:title={AddTodoList} />
    <div>
        <h1>TodoLists</h1>
        <i class="fa-solid fa-plus" on:click={() => showPopUp = true}></i>
    </div>
    <ul>
        {#each $AllTodoList as item}
        <li on:click={() => SelectTodoList(item.Id)}>
            <span>{item.Title}</span>
            <i class="fa-solid fa-trash-can" on:click={() => DeleteTodoList(item.Id, item.Id === $SelectedTodoListId)}></i>
        </li>
        {/each}
    </ul>
</section>
