export const carouselItemContentVariatns = {
  hidden: {
    y: 200,
    opacity: 0,
    transition: {
      type: "spring",
      delay: 0.3,
    },
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      delay: 0.75,
    },
  },
};
export const inViewDropupShow = {
  hidden: {
    y: 75,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
    },
  },
};
export const filterTypeVariants = {
  hidden: {
    height: 0,
    transition: {
      duration: 0.35,
    },
  },
  visible: {
    height: "auto",
    transition: {
      duration: 0.35,
    },
  },
};
export const inViewScaleParentShow = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      duration: 0.1,
      staggerChildren: 0.05,
    },
  },
};
export const inViewScaleChildShow = {
  hidden: {
    scale: 0.9,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
    },
  },
};
export const inViewFromLeftShow = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      delay: 0.2,
      duration: 0.75,
    },
  },
};
export const inViewFromRightShow = {
  hidden: {
    x: 300,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      delay: 0.2,
      duration: 0.75,
    },
  },
};
export const donateFormVariant = {
  close: {
    opacity: 0,
    y: "-100%",
    transition: {
      type: "spring",
      duration: 0.5,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 0.5,
    },
  },
};
// category
export const categoryItemShow = {
  hidden: {
    scale: 0.95,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "tween",
      delay: 0.2,
      duration: 0.25,
    },
  },
};
// donate
export const donateValueShow = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
    },
  },
};
