import { Grid } from "@mui/material";
import Card from "./Card";

function PlayerHand({ curPlr, playerHandsById }) {
  return <Grid container wrap="nowrap">
  {
    (curPlr && playerHandsById && playerHandsById[curPlr.id]) && playerHandsById[curPlr.id].map((card) => 
      <Grid item xs={1} width="10%"  sx = {{
        '&:hover': {
          transform: "translateY(-10%)",
          transition: "transform 0.1s"
        }
      }}>
        <Card card={card} />
      </Grid>
    )
  }
  </Grid>
}

export default PlayerHand;