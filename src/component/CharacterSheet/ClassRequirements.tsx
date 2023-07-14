import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Class } from "types/model";
import { CLASS_LIST } from "utils/const";

type Props = {
  class_name: Class;
  onClose: (close: boolean) => void;
};

const ClassRequirements: React.FC<Props> = ({ class_name, onClose }) => (
  <>
    <Typography variant="h6" fontWeight="bold">
      {class_name} Minimum Requirements
    </Typography>
    {Object.entries(CLASS_LIST[class_name]).map(([field, value]) => (
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        padding={0}
      >
        <Typography variant="body2">
          {field}:{value}
        </Typography>
      </Box>
    ))}
    <Button size="small" variant="contained" sx={{ m: 2 }} onClick={() => onClose(true)}>
      Close Requirement View
    </Button>
  </>
);

export default ClassRequirements;
