import React from "react";
import { CharacterSheetAPIService } from "service";
import { CharacterSheet, CharacterSheetResults } from "types/model";

function useFetch() {
  const cache = React.useRef<CharacterSheet[]>([]);
  const characterSheetAPIService = new CharacterSheetAPIService();
  const [isFetching, setFetching] = React.useState<boolean>(false);
  const [data, setData] = React.useState<CharacterSheet[]>([]);

  React.useEffect(() => {
    const getCharacterSheet = async () => {
      setFetching(true);
      const results = await characterSheetAPIService
        .getCharactersheet()
        .then((response) => response.body)
        .finally(() => setFetching(false));
      const data = results as unknown as CharacterSheetResults;
      setData(data.results as CharacterSheet[]);
    };
    getCharacterSheet();
  }, []);
  return { isFetching, data };
}

export default useFetch;
