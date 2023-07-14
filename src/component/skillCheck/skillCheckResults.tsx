import React from "react";
import { SkillCheck } from "../../types/model";
import { Box, Typography } from "@mui/material";

type Props = {
  skillCheckResults: SkillCheck | undefined;
};

const SkillCheckResults: React.FC<Props> = ({
  skillCheckResults,
}) => (
  <Box display="flex" flexDirection="column" gap={1}>
    <Typography variant="h6" fontWeight="bold">
      Skill Check Results
    </Typography>
    <Typography variant="subtitle2">Character: {skillCheckResults?.character ?? "1"}</Typography>
    <Typography variant="body2">
      Skill: {skillCheckResults?.skill ?? "Acrobatics"}: {skillCheckResults?.skillVal ?? 0}
    </Typography>
    <Typography variant="body2">
      You rolled: {skillCheckResults?.roll ?? 0}
    </Typography>
    <Typography variant="body2">
      The DC was: {skillCheckResults?.dc ?? 20}
    </Typography>
    <Typography variant="body2">
      Result:
      {skillCheckResults && skillCheckResults.roll >= skillCheckResults.dc
        ? "Sucessful"
        : "Failure"}
    </Typography>
  </Box>
);

export default SkillCheckResults;
