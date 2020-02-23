/* eslint-disable no-plusplus */
import * as THREE from "three"
import AnimationRun from "../../../animation-run"
import { colors } from "../../../constants"

export default class SelectionSort extends AnimationRun {
  runAlgorithm(dataSet) {
    const steps = []
    const items = dataSet.map((value, index) => ({
      value,
      mesh: this.createRect(value, index),
    }))
    const meshes = items.map(v => v.mesh)
    let minIdx
    let temp
    const len = items.length

    for (let i = 0; i < len; i++) {
      minIdx = i
      steps.push({
        name: "START_MIN",
        min: items[i].mesh,
      })
      for (let j = i + 1; j < len; j++) {
        if (items[j].value < items[minIdx].value) {
          steps.push({
            name: "NEW_MIN",
            oldMin: items[minIdx].mesh,
            newMin: items[j].mesh,
          })
          minIdx = j
        } else if (j < len) {
          steps.push({
            name: "NOT_MIN",
            min: items[minIdx].mesh,
            notMin: items[j].mesh,
          })
        }
      }
      temp = items[i]
      items[i] = items[minIdx]
      steps.push({
        name: "MIN_SET",
        min: items[minIdx].mesh,
        oldFirstPos: temp.mesh,
        spot: i,
      })
      items[minIdx] = temp
    }
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

  reduceSteps = async command => {
    switch (command.name) {
      case "START_MIN":
        await this.selectionStartCycle(command)
        break
      case "NEW_MIN":
        await this.selectionNewMin(command)
        break
      case "NOT_MIN":
        await this.selectionNotMin(command)
        break
      case "MIN_SET":
        await this.selectionSetMin(command)
        break
      case "SORTED":
        await this.sorted(command)
        break
      default:
    }
  }

  calculateCameraPosition = ({ n, max }) => {
    console.log(max)
    const z = n * 28 + 20 * max
    const x = (n * (this.CUBE_SPACING + this.CUBE_WIDTH)) / 2
    const pos = new THREE.Vector3(x, 0, z)
    console.log(pos)
    return pos
  }

  // Animation
  selectionStartCycle = async ({ min }) => {
    min.material.color.setHex(colors.blue)
  }

  selectionNewMin = async ({ oldMin, newMin }) => {
    await this.bounceBoth(oldMin.position, newMin.position)
    newMin.material.color.setHex(colors.blue)
    oldMin.material.color.setHex(colors.orange)
  }

  selectionNotMin = async ({ min, notMin }) => {
    notMin.material.color.setHex(colors.blue)
    await this.bounceBoth(min.position, notMin.position)
    notMin.material.color.setHex(colors.orange)
  }

  selectionSetMin = async ({ min, spot, oldFirstPos }) => {
    const swapDest = min.position.clone()
    const minDest = new THREE.Vector3(spot * 40, 0, 0)
    await this.staggerDepth(min.position, oldFirstPos.position)
    await Promise.all([
      this.animateVector3(oldFirstPos.position, swapDest, {
        duration: this.SPEED * 3,
      }),
      this.animateVector3(min.position, minDest, { duration: this.SPEED * 3 }),
    ])
    await this.flattenDepth(min.position, oldFirstPos.position)
    min.material.color.setHex(colors.green)
  }
}
