<script lang="ts">
import { CreateTodoItem, SelectedTodoListId, AllTodoList, DeleteTodoItem } from "../store/store";

    import PopUp from "./PopUp.svelte";
    let showPopUp = false;

    function AddTodoItem(e: CustomEvent<string>) {
        CreateTodoItem(e.detail, $SelectedTodoListId);
        showPopUp = false;
    }

    $: SelectedTodoList = $AllTodoList.filter( x => x.Id === $SelectedTodoListId)[0];

</script>

<style>
    div{
        display: flex;
        justify-content: space-between;
    }

    li{
        list-style-type: none;
        margin: 3px 5px;
        display: flex;
        align-items: center;
    }
    .line-through{
        text-decoration: line-through;
    }
    span{
        margin-left: 5px;
        flex-grow: 1;
    }

    i{
        font-size: x-large;
    }

    .fa-trash-can{
        font-size: medium;
        color: red;
    }
</style>

<section>
    <PopUp {showPopUp} on:close-popup={() => showPopUp = false} on:title={AddTodoItem} />
    <div>
        <h1>TodoItems</h1>
        {#if $SelectedTodoListId}
            <i class="fa-solid fa-plus" on:click={() => showPopUp = true}></i>
        {/if}
    </div>
    <ul>
        {#if $SelectedTodoListId !== ""}
             {#each SelectedTodoList.TodoItems as item}
                 <li>
                    <input type="checkbox" name="isCompleted" id="isCompleted" bind:checked={item.isCompleted}>
                    <span class={`${item.isCompleted ? 'line-through': ''}`}>
                        {item.Title}
                    </span>
                    <i class="fa-solid fa-trash-can" on:click={() => DeleteTodoItem(item.Id, SelectedTodoList.Id)}></i>
                </li>
             {/each}    
        {/if}
    </ul>
</section> 