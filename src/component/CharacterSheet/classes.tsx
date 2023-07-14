import { List, ListItemButton, ListItemText, Typography } from "@mui/material";
import React from "react";
import { Class } from "types/model";
import { CLASS_LIST } from "utils/const";

type Props = {
  highlightClass: Class[];
  onChange: (value: Class) => void;
};
const Classes: React.FC<Props> = ({ highlightClass, onChange }) => (
  <>
    <Typography variant="h6" fontWeight="bold">
      Classes
    </Typography>
    <List role="list">
      {Object.keys(CLASS_LIST).map((class_name) => (
        <ListItemButton
          key={class_name}
          role="listitem"
          onClick={() => onChange(class_name as Class)}
        >
          <ListItemText sx={{ alignContent: "center" }}>
            <Typography
              variant="body2"
              lineHeight={0}
              sx={{
                color:
                  highlightClass.indexOf(class_name as Class) >= 0
                    ? "red"
                    : "white",
              }}
            >
              {class_name}
            </Typography>
          </ListItemText>
        </ListItemButton>
      ))}
    </List>
  </>
);

export default Classes;
