<script>
  import Database from "./database";
  let page = 0;
  $: startIndex = page * 2000;
  let revealIndex = -1;

  const handleReveal = (event) => {
    revealIndex = event.currentTarget.dataset.index;
  };
</script>

<section class="pagination">
  <button data-page={0} class:active={page === 0}>1</button>
  <button data-page={1} class:active={page === 1}>2</button>
  <button data-page={2} class:active={page === 2}>3</button>
  <button data-page={3} class:active={page === 3}>4</button>
  <button data-page={4} class:active={page === 4}>5</button>
</section>
<section>
  <p style="font-size:2rem">例文</p>
  {#each { length: 2000 } as _, index}
    <p data-index={index} on:click={handleReveal}>
      <span>{index}</span>
      {Database.japanese[startIndex + index]}
    </p>
    {#if revealIndex == index}
      <div>
        <span>{Database.english[startIndex + index]}</span>
        <br />
        {#each Database.furigana[startIndex + index] as furiItem}
          <span>{furiItem}</span>
        {/each}
      </div>
    {/if}
  {/each}
</section>

<style>
  :global(body) {
    background-color: #202020;
    padding: 1rem;
    color: #d0d0d0;
  }
  button {
    background-color: #303030;
    border-radius: 5px;
    padding: 5px 10px;
    border: 0;
    font-weight: 600;
    margin: 0;
    color: #d0d0d0;
    cursor: pointer;
  }
  button.active {
    background-color: #0284c7;
  }
  .pagination {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    padding: 1rem;
    gap: 1rem;
  }
  p {
    margin: 0 0 0.5rem 0;
    cursor: pointer;
  }
  span {
    margin-right: 0.5rem;
  }
  div {
    margin: 0 0 0.5rem 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #f59e0b20;
    border-left: 2px solid #f59e0b;
  }
</style>
