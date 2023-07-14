import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { Attributes, CharacterSheet } from "types/model";

type Props = {
  characterSheet: CharacterSheet;
  setSkill: (skill: CharacterSheet) => void;
};

const SkillList: React.FC<Props> = ({ characterSheet, setSkill }) => {
  const [totalSkill, setTotalSkill] = React.useState<number>(0);
  const [eligibleSkill, setEligibleSkill] = React.useState<number>(10);

  React.useEffect(() => {
    setEligibleSkill(
      10 + (characterSheet.attributes.Intelligence.points - 10) * 2
    );
  }, [characterSheet]);

  React.useEffect(() => {
    setTotalSkill(
      Object.values(characterSheet.skills).reduce((acc, { points }) => {
        return acc + points;
      }, 0)
    );
    if (totalSkill > 22) {
      alert("You need more skill points!. Upgrade Intelligence to get more");
    }
  }, [characterSheet, totalSkill]);

  const displayAttributeModifier = (attributeModifier: Attributes) =>
    characterSheet.attributes[attributeModifier].modifier || 0;

  return (
    <Box
      display="flex"
      flexDirection="column"
      padding={1}
      sx={{
        "& .MuiIconButton-root": {
          color: "white",
        },
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Skills
      </Typography>

      <Typography variant="body2" marginY={2}>
        Total skill points available: {eligibleSkill}
      </Typography>
      {characterSheet &&
        Object.entries(characterSheet.skills).map(
          ([skill, { points, attributeModifier }], index) => (
            <Box
              key={index}
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              padding={0}
            >
              <Typography variant="body2">
                {skill}:{points}(Modifier:{attributeModifier}):
                {displayAttributeModifier(attributeModifier)}
              </Typography>
              <IconButton
                size="small"
                aria-label="increment"
                onClick={() => {
                  totalSkill <= eligibleSkill && setSkill({
                    ...characterSheet,
                    skills: {
                      ...characterSheet.skills,
                      [skill]: {
                        points: points + 1,
                        attributeModifier,
                      },
                    },
                  });
                }}
              >
                <AddCircleIcon />
              </IconButton>
              <IconButton
                size="small"
                aria-label="decrement"
                onClick={() => {
                  setSkill({
                    ...characterSheet,
                    skills: {
                      ...characterSheet.skills,
                      [skill]: {
                        points: points - 1,
                        attributeModifier,
                      },
                    },
                  })
                }}
              >
                <RemoveCircleIcon />
              </IconButton>
              <Typography variant="body2">
                total:{points + displayAttributeModifier(attributeModifier)}
              </Typography>
            </Box>
          )
        )}
    </Box>
  );
};

export default React.memo(SkillList);
