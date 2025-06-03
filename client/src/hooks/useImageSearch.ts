import { useEffect, useRef, useState } from "react";
import { IImage } from "../models/IImage";
import { loadSessionData, saveSessionData } from "../utils/sessionUtils";
import { getImagesFromGoogleSearch } from "../services/searchService";

export const useImageSearch = () => {
  const observerTarget = useRef(null);

  const {
    searchWord: storedWord,
    images: storedImages,
    searchTime: storedTime,
    correctedQuery: storedCorrection,
    page: storedPage,
  } = loadSessionData();

  const [searchWord, setSearchWord] = useState(storedWord);
  const [images, setImages] = useState<IImage[]>(storedImages);
  const [searchTime, setSearchTime] = useState(storedTime);
  const [correctedQuery, setCorrectedQuery] = useState(storedCorrection);
  const [page, setPage] = useState(storedPage);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!observerTarget.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        !isLoading &&
        searchWord &&
        !correctedQuery
      ) {
        getData(searchWord, page + 1, true);
      }
    });

    observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [page, isLoading, searchWord, correctedQuery]);

  const getData = async (word: string, pageNum = 1, isLoadMore = false) => {
    if (!word) return;

    const scrollY = window.scrollY;

    if (!isLoadMore) {
      setCorrectedQuery("");
      setPage(1);
      setSearchTime("");
    }

    setIsLoading(true);

    const startIndex = (pageNum - 1) * 10 + 1;

    try {
      const data = await getImagesFromGoogleSearch(word, startIndex);

      if (data.spelling?.correctedQuery) {
        setCorrectedQuery(data.spelling.correctedQuery);
        saveSessionData({
          images: [],
          searchWord: word,
          searchTime: "",
          correctedQuery: data.spelling.correctedQuery,
          page: pageNum,
        });
        return;
      }

      const newImages = data.items || [];
      const newSearchTime = data.searchInformation?.formattedSearchTime || "";
      const combined = isLoadMore ? [...images, ...newImages] : newImages;

      saveSessionData({
        images: combined,
        searchWord: word,
        searchTime: newSearchTime,
        correctedQuery: "",
        page: pageNum,
      });
      setImages(combined);
      setSearchTime(newSearchTime);
      setCorrectedQuery("");
      setPage(pageNum);

      if (isLoadMore) {
        setTimeout(() => {
          window.scrollTo(0, scrollY);
        }, 0);
      }
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchWord,
    searchTime,
    correctedQuery,
    images,
    isLoading,
    observerTarget,
    handleSearch: (text: string) => {
      if (text === searchWord && images.length > 0) {
        return;
      }
      setSearchWord(text);
      getData(text, 1, false);
    },
  };
};
