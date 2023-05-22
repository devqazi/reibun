<script>
  import core10k from "./core10k";
  let knownKanji = "一 九 七 二 人 入 八 力 十 下";
  let vocab = [];

  const handleGenerate = () => {
    vocab = [];
    let knownKanjiMap = {};
    knownKanji.split("").forEach((kanji) => {
      if (/^[\u4e00-\u9faf\u3400-\u4dbf]$/.test(kanji)) {
        knownKanjiMap[kanji] = true;
      }
    });
    for (let i in core10k) {
      let word = core10k[i];
      let kanjiInWord = word
        .replace(/[^\u4e00-\u9faf\u3400-\u4dbf]+/, "")
        .split("");
      let containsKnownKanji = true;
      for (let j in kanjiInWord) {
        if (!knownKanjiMap[kanjiInWord[j]]) {
          containsKnownKanji = false;
          break;
        }
      }
      if (containsKnownKanji) {
        vocab.push(word);
      }
    }
  };
  handleGenerate();
</script>

<main>
  <h3>Known Kanji</h3>
  <textarea bind:value={knownKanji} />
  <button on:click={handleGenerate}>Generate</button>
  <h3>Generated Vocabulary</h3>
  <div>
    {#each vocab as word}
      <span>{word}</span>
    {/each}
  </div>
</main>

<style>
  main {
    padding: 16px;
  }
  textarea {
    background-color: #303030;
    color: white;
    border: 0;
    width: 100%;
    padding: 5px;
    margin-bottom: 5px;
  }
  textarea:focus {
    outline: 0;
  }
  span {
    margin: 0 8px 8px 0;
    display: inline-block;
    border: 1px solid #404040;
    border-radius: 4px;
    padding: 2px 5px;
  }
  button {
    padding: 5px 10px;
  }
</style>
