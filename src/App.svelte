<script>
import TodoItems from "./lib/components/TodoItems.svelte";
import TodoLists from "./lib/components/TodoLists.svelte";

  
</script>

<style>
  main{
    display: flex;
    position: relative;
    height: 100vh;
    width: 100vw;
    padding: 10px;
  }

  section{
    display: flex;
    flex-direction: column;
    margin: 5px 10px;
    width: 50%;
    height: 100%;
  }
</style>

<main>
  <section class="todolist">
    <TodoLists />
  </section>
  <section class="todoitem">
    <TodoItems />
  </section>
</main>