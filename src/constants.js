export const PIZZA_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  MONSTER: 'monster'
};

export const PIZZA_DIMENSIONS = {
  [PIZZA_SIZES.SMALL]: {
    size: "250px",
    scale: 0.8
  },
  [PIZZA_SIZES.MEDIUM]: {
    size: "400px",
    scale: 0.8
  },
  [PIZZA_SIZES.MONSTER]: {
    size: "600px",
    scale: 1.0
  }
};

export const SCATTER_RADIUS = {
  [PIZZA_SIZES.SMALL]: 45,
  [PIZZA_SIZES.MEDIUM]: 45,
  [PIZZA_SIZES.MONSTER]: 45
};