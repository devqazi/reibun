<script>
  import Database from "./database";
  let startIndex = 0;
  let endIndex = 500;
  let revealIndex = -1;

  const handleReveal = (event) => {
    revealIndex = Number(event.currentTarget.dataset.index);
  };
  const handleClose = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      revealIndex = -1;
    }
  };

  $: progress = revealIndex < 0 ? 0 : Database.progress[revealIndex];
  $: trailing =
    revealIndex < 0
      ? []
      : Database.kanji.slice(Math.max(progress - 5, 0), progress);
</script>

<section>
  {#each { length: endIndex - startIndex } as _, index}
    <p data-index={index + startIndex} on:click={handleReveal}>
      <span>{index + startIndex + 1}</span>
      {Database.japanese[startIndex + index]}
    </p>
  {/each}
</section>
{#if revealIndex > -1}
  <div class="backdrop" on:click={handleClose}>
    <div class="dialog">
      <p>{Database.japanese[revealIndex]}</p>
      <p>
        {#each Database.furigana[revealIndex] as furi}
          <span class="bubble">{furi}</span>
        {/each}
      </p>
      <p>{Database.english[revealIndex]}</p>
      <p>
        Setence: {startIndex + revealIndex} Kanji: {progress}
      </p>
      <p>
        {#each trailing as kanji}
          <span class="bubble">{kanji}</span>
        {/each}
      </p>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    z-index: 10000;
    inset: 0;
  }
  .dialog {
    background-color: #303030;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
    padding: 16px;
    text-align: center;
  }
  .bubble {
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: inline-block;
    margin-right: 5px;
    border-radius: 5px;
    padding: 2px 6px;
  }
</style>
