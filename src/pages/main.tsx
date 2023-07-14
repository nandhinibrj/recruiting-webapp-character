import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import CharacterSheetSection from "component/CharacterSheet/CharacterSheetSection";
import SkillCheckSection from "component/skillCheck/SkillCheckSection";
import SkillCheckResults from "component/skillCheck/skillCheckResults";
import useFetch from "hooks/useFetch";
import React from "react";
import { CharacterSheetAPIService } from "service";
import { CharacterSheet, SkillCheck } from "types/model";
import { ATTRIBUTE_LIST, SKILL_LIST } from "utils/const";

const Main = () => {
  const characterSheetAPIService = new CharacterSheetAPIService();
  const { isFetching, data } = useFetch();
  const [characterSheet, setCharacterSheet] =
    React.useState<CharacterSheet[]>(data);
  const [skillCheckResults, setSkillCheckSectionResults] =
    React.useState<SkillCheck>();
  const [attributes, setAttributes] = React.useState<CharacterSheet>(data[0]);
  const [skill, setSkill] = React.useState<CharacterSheet>(data[0]);

  React.useEffect(() => {
    setCharacterSheet(data);
    setAttributes(data[0]);
    setSkill(data[0]);
  }, [data]);

  React.useEffect(() => {
      const index = characterSheet.findIndex(
        ({ characterId }) => attributes?.characterId === characterId
      );
       attributes && skill && setCharacterSheet([
        ...characterSheet.slice(0, index),
        {
          characterId: attributes.characterId,
          attributes: attributes.attributes,
          skills: skill.skills,
        },
        ...characterSheet.slice(index + 1),
      ]);
  }, [attributes, skill]);

  const saveCharacterSheet = async () => {
    await characterSheetAPIService
      .updateCharacterSheet(characterSheet!)
      .then(() => alert("Saved successfully!"));
  };

  const addNewCharacterSheet = () => {
    const newCharacterSheet = {
      characterId: String(
        Number(characterSheet[characterSheet.length - 1]!.characterId) + 1
      ),
      attributes: Object.fromEntries(
        ATTRIBUTE_LIST.map((attribute) => [
          attribute,
          { points: 10, modifier: 0 },
        ])
      ),
      skills: Object.fromEntries(
        SKILL_LIST.map(({ name, attributeModifier }) => [
          name,
          { points: 0, attributeModifier },
        ])
      ),
    } as CharacterSheet;
    setCharacterSheet([...characterSheet, newCharacterSheet]);
  };

  const resetCharacterSheet = () => {
    alert("reset it");
    setCharacterSheet(data);
  };

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <Box display="flex" flexDirection="row" gap={1} marginTop={2}>
        <Button variant="outlined" onClick={addNewCharacterSheet}>
          Add New Character
        </Button>
        <Button variant="outlined" onClick={resetCharacterSheet}>
          Reset All Characters
        </Button>
        <Button variant="outlined" onClick={saveCharacterSheet}>
          Save All Characters
        </Button>
      </Box>
      <SkillCheckResults skillCheckResults={skillCheckResults} />
      {isFetching && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      {characterSheet &&
        characterSheet.map((cs, index) => (
          <Paper
            key={index}
            variant="elevation"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              padding: 1,
              zIndex: 1,
              background: "hsl(220deg 13% 13%)",
              border: "1px double white",
              color: "white",
              width: "90%",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Character: {cs.characterId}
            </Typography>
            <SkillCheckSection
              characterSheet={cs}
              sendSkillSection={setSkillCheckSectionResults}
            />
            <CharacterSheetSection
              setAttributes={setAttributes}
              setSkill={setSkill}
              characterSheet={cs}
            />
          </Paper>
        ))}
    </Box>
  );
};

export default React.memo(Main);
