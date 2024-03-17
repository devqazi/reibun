import React, { useState, lazy, Suspense } from "react";
import NavBar from "./components/NavBar";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import LightNovel from "./pages/LightNovel";
import KanjiToVocab from "./pages/KanjiToVocab";

const Core6k = lazy(() => import("./pages/Core6k"));
const Reibun10k = lazy(() => import("./pages/Reibun10k"));

const App = () => {
  const [page, setPage] = useState("kanji-to-vocab");

  const handleNavigate = (page) => {
    setPage(page);
  };
  return (
    <>
      <NavBar onNavigate={handleNavigate} />
      <Suspense fallback={<LinearProgress />}>
        {page === "core-6k" ? <Core6k /> : null}
        {page === "reibun-10k" ? <Reibun10k /> : null}
        {page === "kanji-to-vocab" ? <KanjiToVocab /> : null}
        {page === "kaifuku-jutsu-shi" ? (
          <LightNovel name="kaifuku-jutsu-shi-01.json" />
        ) : null}
      </Suspense>
    </>
  );
};

export default App;
