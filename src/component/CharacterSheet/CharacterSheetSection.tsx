import { Grid, Paper } from "@mui/material";
import React from "react";
import { Class } from "types/model";
import AttributeSection from "./AttributeSection";
import Classes from "./classes";
import ClassRequirements from "./ClassRequirements";
import SkillList from "./SkillList";
import { CharacterSheet } from "types/model";

type Props = {
  characterSheet: CharacterSheet;
  setAttributes: (attr: CharacterSheet) => void;
  setSkill: (update: CharacterSheet) => void;
};

const CharacterSheetSection: React.FC<Props> = ({
  characterSheet,
  setAttributes,
  setSkill,
}) => {
  const [className, setClassName] = React.useState<Class | null>(null);
  const [highlightClass, setHighlightClass] = React.useState<Class[]>([]);

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={3}>
          <Paper
            variant="outlined"
            sx={{
              height: 700,
              background: "hsl(220deg 13% 13%)",
              border: "1px double white",
              color: "white",
            }}
          >
            <AttributeSection
              characterSheet={characterSheet}
              setAttributes={setAttributes}
              setHighlightClass={setHighlightClass}
            />
          </Paper>
        </Grid>
        <Grid item xs={1.5}>
          <Paper
            variant="outlined"
            sx={{
              height: 700,
              background: "hsl(220deg 13% 13%)",
              border: "1px double white",
              color: "white",
            }}
          >
            <Classes highlightClass={highlightClass} onChange={setClassName} />
          </Paper>
        </Grid>
        {className && (
          <Grid item xs={2}>
            <Paper
              variant="outlined"
              sx={{
                height: 700,
                background: "hsl(220deg 13% 13%)",
                border: "1px double white",
                color: "white",
              }}
            >
              <ClassRequirements
                class_name={className}
                onClose={() => setClassName(null)}
              />
            </Paper>
          </Grid>
        )}
        <Grid item xs={4}>
          <Paper
            variant="outlined"
            sx={{
              height: 700,
              background: "hsl(220deg 13% 13%)",
              border: "1px double white",
              color: "white",
            }}
          >
            <SkillList
              characterSheet={characterSheet}
              setSkill={setSkill}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(CharacterSheetSection);
