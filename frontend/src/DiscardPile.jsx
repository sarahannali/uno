import { Box } from "@mui/material";
import Card from './Card'

function DiscardPile({ discardPile }) {
  return <Box height="300px" width="200px" position="relative">
    {discardPile.map((card, i) => // TODO: fix to not re-calc rotate each time
          <Card
            card={card}
            rotate
            sx={{
              transform: `rotate(${Math.floor((Math.random() - 0.5) * 15)}deg)`,
              position: 'absolute'
            }}
          />
        )}
  </Box>
}

export default DiscardPile;