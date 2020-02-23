import * as THREE from "three"
// import { colors } from "../../../constants"
import AnimationRun from "../../../animation-run"

const swap = (arrayObjects, i, j) => {
  const temp = arrayObjects[i]
  // eslint-disable-next-line no-param-reassign
  arrayObjects[i] = arrayObjects[j]
  // eslint-disable-next-line no-param-reassign
  arrayObjects[j] = temp
}

export default class BubbleSort extends AnimationRun {
  runAlgorithm(dataSet) {
    const steps = []
    let swapped
    const items = dataSet.map((value, index) => ({
      value,
      mesh: this.createRect(value, index),
    }))
    const meshes = items.map(v => v.mesh)

    do {
      swapped = false
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < items.length; i++) {
        if (items[i] && items[i + 1] && items[i].value > items[i + 1].value) {
          swap(items, i, i + 1)
          steps.push({
            name: "SWAP",
            b: items[i],
            a: items[i + 1],
          })
          swapped = true
        } else if (i < items.length - 1) {
          steps.push({
            name: "NOSWAP",
            b: items[i],
            a: items[i + 1],
          })
        }
      }
    } while (swapped)

    steps.push({
      name: "SORTED",
      meshes,
    })
    return { meshes, steps }
  }

  // eslint-disable-next-line class-methods-use-this
  createDataSet({ n, min, max }) {
    return Array.from({ length: n }, () =>
      Math.floor(Math.random() * (max - min) + min)
    )
  }

  reduceSteps = async step => {
    switch (step.name) {
      case "SWAP":
        await this.swap(step)
        break
      case "NOSWAP":
        await this.noSwap(step)
        break
      case "SORTED":
        await this.sorted(step)
        break
      default:
    }
  }

  calculateCameraPosition = ({ n, max }) => {
    const z = n * 28 + 20 * max
    const x = (n * (this.CUBE_SPACING + this.CUBE_WIDTH)) / 2
    return new THREE.Vector3(x, 0, z)
  }
}
