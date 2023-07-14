import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import {
  CharacterSheet,
  Attributes,
  Class,
  AttributeModifier,
} from "types/model";

type Props = {
  characterSheet: CharacterSheet;
  setAttributes: (attr: CharacterSheet) => void;
  setHighlightClass: (class_name: Class[]) => void;
};

type Counter = { [key in Attributes]: number };
const DEFAULT_MODIFIER_COUNT: Counter = {
  Strength: 1,
  Dexterity: 1,
  Constitution: 1,
  Intelligence: 1,
  Wisdom: 1,
  Charisma: 1,
};

const AttributeSection: React.FC<Props> = ({
  characterSheet,
  setAttributes,
  setHighlightClass,
}) => {
  const [addCounter, setAddCounter] = React.useState<Counter>(
    DEFAULT_MODIFIER_COUNT
  );
  const [decrementCounter, setDecrementCounter] = React.useState<Counter>(
    DEFAULT_MODIFIER_COUNT
  );
  const [totalAttributes, setTotalAttributes] = React.useState<number>(0);

  const checkClassRequirementMet = () => {
    let classes: Class[] = [];
    if (
      characterSheet.attributes.Strength.points >= 14 &&
      characterSheet.attributes.Dexterity.points >= 9 &&
      characterSheet.attributes.Constitution.points >= 9 &&
      characterSheet.attributes.Intelligence.points >= 9 &&
      characterSheet.attributes.Wisdom.points >= 9 &&
      characterSheet.attributes.Charisma.points >= 9
    ) {
      classes.push("Barbarian");
    }

    if (
      characterSheet.attributes.Strength.points >= 9 &&
      characterSheet.attributes.Dexterity.points >= 9 &&
      characterSheet.attributes.Constitution.points >= 9 &&
      characterSheet.attributes.Intelligence.points >= 14 &&
      characterSheet.attributes.Wisdom.points >= 9 &&
      characterSheet.attributes.Charisma.points >= 9
    ) {
      classes.push("Wizard");
    }

    if (
      characterSheet.attributes.Strength.points >= 9 &&
      characterSheet.attributes.Dexterity.points >= 9 &&
      characterSheet.attributes.Constitution.points >= 9 &&
      characterSheet.attributes.Intelligence.points >= 9 &&
      characterSheet.attributes.Wisdom.points >= 9 &&
      characterSheet.attributes.Charisma.points >= 14
    ) {
      classes.push("Bard");
    }
    setHighlightClass(classes);
  };

  React.useEffect(() => {
    checkClassRequirementMet();
    setTotalAttributes(
      Object.values(characterSheet.attributes).reduce((acc, { points }) => {
        return acc + points;
      }, 0)
    );
    if (totalAttributes > 70) {
      alert("A Character can have up to 70 Delegated Attribute Points");
    }
  }, [characterSheet]); //improve the design here

  const handleIncrement = (
    attribute: Attributes,
    { points, modifier }: AttributeModifier
  ) => {
    if (totalAttributes <= 70) {
      setAddCounter((addCounter) => ({
        ...addCounter,
        ...{
          [attribute]:
            addCounter[attribute] < 2 ? addCounter[attribute] + 1 : 1,
        },
      }));
      setAttributes({
        ...characterSheet,
        ...{
          attributes: {
            ...characterSheet.attributes,
            [attribute]: {
              points: points + 1,
              modifier: addCounter[attribute] === 2 ? modifier + 1 : modifier,
            },
          },
        },
      });
    }
  };

  const handleDecrement = (
    attribute: Attributes,
    { points, modifier }: AttributeModifier
  ) => {
    setDecrementCounter((decrementCounter) => ({
      ...decrementCounter,
      ...{
        [attribute]:
          decrementCounter[attribute] < 2 ? decrementCounter[attribute] + 1 : 1,
      },
    }));
    setAttributes({
      ...characterSheet,
      ...{
        attributes: {
          ...characterSheet.attributes,
          [attribute]: {
            points: points - 1,
            modifier:
              decrementCounter[attribute] === 2 ? modifier - 1 : modifier,
          },
        },
      },
    });
  };

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
        Attributes
      </Typography>
      {characterSheet &&
        Object.entries(characterSheet.attributes).map(
          ([attribute, { points, modifier }], index) => (
            <Box
              key={index}
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              padding={0}
            >
              <Typography variant="body2">
                {attribute}:{points ?? 10}(Modifier:
                {modifier ?? 0})
              </Typography>
              <IconButton
                size="small"
                aria-label="increment"
                onClick={() =>
                  handleIncrement(attribute as Attributes, { points, modifier })
                }
              >
                <AddCircleIcon />
              </IconButton>
              <IconButton
                size="small"
                aria-label="decrement"
                onClick={() =>
                  handleDecrement(attribute as Attributes, { points, modifier })
                }
              >
                <RemoveCircleIcon />
              </IconButton>
            </Box>
          )
        )}
    </Box>
  );
};

export default React.memo(AttributeSection);
