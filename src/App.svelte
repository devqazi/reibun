<script>
  import Database from "./database";
  let page = 0;
  let revealIndex = -1;
  const total = 10000;
  const pageSize = 1000;
  const numPages = total / pageSize;
  $: startIndex = page * pageSize;

  const handleReveal = (event) => {
    revealIndex = event.currentTarget.dataset.index;
  };

  const handlePageClick = (event) => {
    console.log(event);
    page = Number(event.currentTarget.dataset.page);
    revealIndex = -1;
  };
</script>

<section class="pagination">
  {#each { length: numPages } as _, pageNumber}
    <button
      on:click={handlePageClick}
      data-page={pageNumber}
      class:active={page === pageNumber}>{pageNumber}</button
    >
  {/each}
</section>
<section>
  <p style="font-size:2rem">例文</p>
  {#each { length: pageSize } as _, index}
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
