<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { minLength, validators, useForm, Hint, maxLength } from "svelte-use-form"


    export let showPopUp: boolean;
    let Title: string;

    const dispatch = createEventDispatcher();
    const dispatchTitle = createEventDispatcher<{title: string}>();


    function handleCancel() {
        dispatch('close-popup');
        Title = "";
    }

    function handleSubmit() {

        dispatchTitle('title', Title);
        Title = "";
    }

    const form = useForm();
</script>

<style>
    section{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.3);
    }

    div{
        position: absolute;
        top: 20vh;
        left: 30vw;
        display: flex;
        padding: 30px 50px;
        justify-content: center;
        flex-direction: column;
        background-color: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
    }

    span{
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
    }

    button{
        margin-left: 10px;
        padding: 3px 3px;
    }

</style>

{#if showPopUp}
    <section>
        <div>
            <form use:form on:submit|preventDefault={handleSubmit}>
                <label for="title">Title: </label>
                <!-- svelte-ignore a11y-autofocus -->
                <input type="text" name="title" id="title" bind:value={Title} autocomplete="off" use:validators={[minLength(5), maxLength(30)]} >
                <Hint for="title" on="minLength" let:value>
                    The title requires at least {value} characters.
                </Hint>
                <Hint for="title" on="maxLength" let:value>
                    The title most not be more than {value} characters.
                </Hint>
                <span>
                    <button type="submit">Submit</button>
                    <button on:click={handleCancel}>Cancel</button>
                </span>
            </form>
        </div>
    </section>
{/if}
