import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { CharacterSheet, SkillCheck, Skills } from "types/model";
import { SKILL_LIST } from "utils/const";

type Props = {
  characterSheet: CharacterSheet;
  sendSkillSection: (skillcheck: SkillCheck) => void;
};
const SkillCheckSection: React.FC<Props> = ({
  characterSheet,
  sendSkillSection,
}) => {
  const [skill, setSkill] = React.useState<Skills>("Acrobatics");
  const [dc, setDC] = React.useState<number>(20);

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 20 + 1);
  };

  const handleRoll = () => {
    sendSkillSection({
      character: characterSheet.characterId,
      skill,
      skillVal: characterSheet.skills[skill].points,
      dc,
      roll: generateRandomNumber(),
    });
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyItems="center"
      border="2px solid white"
      zIndex={1}
    >
      <Typography variant="h6" fontWeight="bold">
        Skill Check
      </Typography>
      <Box
        display="flex"
        gap={2}
        justifyContent="center"
        padding={3}
        sx={{
          "& .MuiInputBase-root": {
            color: "white",
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "& .MuiSvgIcon-root": {
            color: "white",
          },
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id="character-sheet-skill-name">Skill</InputLabel>
          <Select
            labelId="character-sheet-skill-name"
            id="character-sheet-skill-name"
            value={skill}
            label="Skill"
            onChange={(event) => setSkill(event.target.value as Skills)}
          >
            {SKILL_LIST.map(({ name }, index) => (
              <MenuItem key={index} value={name}>
                {" "}
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <TextField
            type="number"
            id="character-sheet-dc"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            value={dc}
            label="DC"
            onChange={(event) => setDC(Number(event.target.value))}
          ></TextField>
        </FormControl>
        <Button variant="contained" sx={{ marginY: 2 }} onClick={handleRoll}>
          Roll
        </Button>
      </Box>
    </Box>
  );
};

export default SkillCheckSection;
