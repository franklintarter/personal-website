import StableMatching from "./animations/stable-matching/animation-run";
import SelectionSort from "./animations/sort/selection-sort/animation-run";
import BubbleSort from "./animations/sort/bubble-sort/animation-run";

export default (name, threeRoot, opts) => {
  switch (name) {
    case "STABLE_MATCHING":
      return new StableMatching(threeRoot, opts);
    case "BUBBLE_SORT":
      return new BubbleSort(threeRoot, opts);
    case "SELECTION_SORT":
      return new SelectionSort(threeRoot, opts);
    default:
      return new SelectionSort(threeRoot, opts);
  }
};
