import client from '@urturn/client'
import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material'
import { MOVE_TYPES, WILD_COLOR, BASIC_COLORS } from "./constants";
import styled from '@emotion/styled';
import { CARD_TYPES, ACTIONS } from "./constants"
import Cached from '@mui/icons-material/Cached';
import Block from '@mui/icons-material/Block';
import { useEffect } from 'react';

const Item = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: 'white',
  padding: '10px'
}));

const colorMap = {
  "RED": "#D93D27",
  "GREEN": "#85C040",
  "BLUE": "#0A77B8",
  "YELLOW": "#FFD237",
  "WILD": "#1e1e1e"
}

function WildIcon() {
  return <Grid container>
    <Grid item xs>
      <Box
        backgroundColor={colorMap["RED"]}
        height="20px"
        width="20px"
        borderRadius="50%"
      />
    </Grid>
    <Grid item xs>
      <Box
        backgroundColor={colorMap["YELLOW"]}
        height="20px"
        width="20px"
        borderRadius="50%"
      />
    </Grid>
    <Grid item xs>
      <Box
        backgroundColor={colorMap["GREEN"]}
        height="20px"
        width="20px"
        borderRadius="50%"
      />
    </Grid>
    <Grid item xs>
      <Box
        backgroundColor={colorMap["BLUE"]}
        height="20px"
        width="20px"
        borderRadius="50%"
      />
    </Grid>
  </Grid>
}

export function getDisplayText(type, value) {
  if (type === CARD_TYPES.NUMBER) return value;
  
  switch (value) {
    case ACTIONS.SKIP:
      return <Block />
    case ACTIONS.REVERSE:
      return <Cached />
    case ACTIONS.DRAW_TWO:
      return "+2"
    case ACTIONS.WILD:
      return <WildIcon />
    case ACTIONS.WILD_DRAW_FOUR:
      return <Box>
        +4
        <WildIcon />
      </Box>
    default:
      return ""
  }
}

function Card({ card, rotate, sx }) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [rotation, setRotation] = useState(null);

  useEffect(() => {
    if (rotate) {
      setRotation(`rotate(${Math.floor((Math.random() - 0.5) * 15)}deg)`)
    }
  }, [rotate])

  const playCard = async (colorChoice = null) => {
    if (card.color === WILD_COLOR && colorChoice === null) {
      setShowColorPicker(true);
    } else {
      const { error } = await client.makeMove({ 
        type: MOVE_TYPES.PLAY_CARD,
        card: card,
        colorChoice
      });
  
      if (error) console.log(error);
      setShowColorPicker(false);
    }
  }

  const displayText = getDisplayText(card.type, card.value);

  console.log(`rotate(${Math.floor(Math.random() * 5)}deg)`)
  return (<Box
      height={300}
      width={200}
      borderRadius="3%"
      backgroundColor={colorMap[card.color]}
      boxShadow="0px 4px 4px 0px #00000040"
      onClick={() => playCard()}
      position={"relative"}
      sx={{
        transform: rotation,
        ...sx
      }}
    >
      <Grid
        container
        direction="column"
        spacing={0}
        justifyContent="space-between"
        height="100%"
      >
        <Grid item xs display="flex" alignItems="center" justifyContent="flex-start">
          <Item fontSize="2em">{displayText}</Item>
        </Grid>
        <Grid item xs={6} display="flex" alignItems="center" justifyContent="center">
          <Item fontSize="4em">{displayText}</Item>
        </Grid>
        <Grid item xs  display="flex" alignItems="center" justifyContent="flex-end">
          <Item fontSize="2em">{displayText}</Item>
        </Grid>
      </Grid>
    </Box>)
}

function ColorPicker({ playCard }) {
  return <div>
    {BASIC_COLORS.map((color) => <button onClick={() => {playCard(color)}}>{color}</button>)}
  </div>
}

export default Card;