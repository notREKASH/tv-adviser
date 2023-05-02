import "./global.css";
import styles from "./style.module.css";
import { TVShowAPI } from "./api/tv-show";
import { useEffect, useState } from "react";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import logo from "./assets/images/logo.png";
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";

export function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommendationList, setRecommandationList] = useState([]);

  async function fetchPopulars() {
    try {
      const populars = await TVShowAPI.fetchPopulars();
      if (populars.length > 0) {
        setCurrentTVShow(populars[0]);
      }
    } catch (error) {
      alert("Erreur durant la recherche de la recherche des séries populaires");
    }
  }

  async function fetchRecommendations(tvShowId) {
    try {
      const recommandations = await TVShowAPI.fetchRecommendations(tvShowId);
      if (recommandations.length > 0) {
        setRecommandationList(recommandations.slice(0, 10));
      }
    } catch (error) {
      alert(
        "Erreur durant la recherche de la recherche des séries recommandées"
      );
    }
  }

  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow]);

  async function searchTVShow(tvShowName) {
    try {
      const searcResponse = await TVShowAPI.fetchByTitle(tvShowName);
      if (searcResponse.length > 0) {
        setCurrentTVShow(searcResponse[0]);
      }
    } catch (error) {
      alert("Erreur durant la recherche de la série");
    }
  }

  return (
    <div
      className={styles.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={styles.header}>
        <div className="grid grid-cols-3">
          <div className="grid-cols-2">
            <Logo
              image={logo}
              title="Watowatch"
              subtitles="Find a show you may like"
            />
          </div>
          <div className="grid grid-rows-2">
            <SearchBar onSubmit={searchTVShow} />
          </div>
        </div>
      </div>
      <div className={styles.tv_show_detail}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={styles.recommendations}>
        {recommendationList && recommendationList.length > 0 && (
          <>
            <TVShowList
              onClickItem={setCurrentTVShow}
              tvShowList={recommendationList}
            />
          </>
        )}
      </div>
    </div>
  );
}
