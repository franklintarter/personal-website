import * as THREE from "three";
// import { colors } from "../../../constants"
import AnimationRun from "../../../animation-run";

const swap = (arrayObjects, i, j) => {
  const temp = arrayObjects[i];
  // eslint-disable-next-line no-param-reassign
  arrayObjects[i] = arrayObjects[j];
  // eslint-disable-next-line no-param-reassign
  arrayObjects[j] = temp;
};

export default class BubbleSort extends AnimationRun {
  runAlgorithm(dataSet) {
    const steps = [];
    let swapped;
    const items = dataSet.map((value, index) => ({
      value,
      mesh: this.createRect(value, index)
    }));
    const meshes = items.map(v => v.mesh);

    do {
      swapped = false;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < items.length; i++) {
        if (items[i] && items[i + 1] && items[i].value > items[i + 1].value) {
          swap(items, i, i + 1);
          steps.push({
            name: "SWAP",
            b: items[i],
            a: items[i + 1]
          });
          swapped = true;
        } else if (i < items.length - 1) {
          steps.push({
            name: "NO",
            b: items[i],
            a: items[i + 1]
          });
        }
      }
    } while (swapped);

    steps.push({
      name: "SORTED",
      meshes
    });
    return { meshes, steps };
  }

  code = [
    { step: "", text: "function bubbleSort(arr) {" },
    { step: "", text: "  let swapped;" },
    { step: "", text: "  const n = arr.length - 1;" },
    { step: "", text: "  do {" },
    { step: "", text: "    swapped = false;" },
    { step: "", text: "    for (let i = 0; i < n; i++) {" },
    {
      step: "SWAP NO",
      text: "      if (arr[i] > arr[i + 1]) {"
    },
    { step: "SWAP", text: "        const temp = arr[i];" },
    { step: "SWAP", text: "        arr[i] = arr[i + 1];" },
    { step: "SWAP", text: "        arr[i + 1] = temp;" },
    { step: "SWAP", text: "        swapped = true;" },
    { step: "SWAP", text: "      }" },
    { step: "", text: "    }" },
    { step: "NO", text: "  // else { // no swap }  " },
    { step: "", text: "  } while (swapped);" },
    { step: "SORTED", text: "  return arr;" },
    { step: "", text: "}" }
  ];

  // runAlgorithmClean() {
  //   let swapp;
  //   let n = a.length - 1;
  //   const x = a;
  //   do {
  //     swapp = false;
  //     for (let i = 0; i < n; i++) {
  //       if (x[i] < x[i + 1]) {
  //         const temp = x[i];
  //         x[i] = x[i + 1];
  //         x[i + 1] = temp;
  //         swapp = true;
  //       }
  //     }
  //     n--;
  //   } while (swapp);
  //   return x;
  // }

  // eslint-disable-next-line class-methods-use-this
  createDataSet({ n, min, max }) {
    return Array.from({ length: n }, () =>
      Math.floor(Math.random() * (max - min) + min)
    );
  }

  reduceSteps = async step => {
    switch (step.name) {
      case "SWAP":
        await this.swap(step);
        break;
      case "NO":
        await this.noSwap(step);
        break;
      case "SORTED":
        await this.sorted(step);
        break;
      default:
    }
  };

  calculateCameraPosition = ({ n, max }) => {
    const z = n * 28 + 20 * max;
    const x = (n * (this.CUBE_SPACING + this.CUBE_WIDTH)) / 2;
    return new THREE.Vector3(x, 0, z);
  };
}
