import React, { useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import AnimatedAlgorithm from "../three-root";
import getAnimation from "../get-animation";
import "rc-slider/assets/index.css";

const IndexPage = () => {
  const [speed, setSpeed] = useState(5);
  const [paused, setPaused] = useState(false);
  const [size, setSize] = useState(15);
  const [alg, setAlg] = useState("STABLE_MATCHING");

  const [loaded, setLoaded] = useState(false);
  const threeContainer = useRef(null);
  const [threeRoot, setThreeRoot] = useState(null);
  const [animationRun, setAnimationRun] = useState(null);

  const changeSpeed = val => {
    const num = Number(val);
    setSpeed(num);
    if (animationRun !== null) {
      animationRun.setSpeed(val);
    }
  };

  const togglePause = () => {
    setPaused(prevState => {
      if (prevState) {
        threeRoot.play();
      } else {
        threeRoot.pause();
      }
      return !prevState;
    });
  };

  const startAlgorithm = () => {
    if (loaded) {
      if (animationRun !== null) {
        animationRun.dispose();
      }

      const nextRun = getAnimation(alg, threeRoot, {
        n: size,
        min: 3,
        max: 20
      });
      setAnimationRun(nextRun);
      nextRun.setSpeed(speed);
      const animate = nextRun.createAnimation();
      animate();
    }
  };

  const randomize = () => {
    startAlgorithm();
    if (threeRoot.paused) {
      threeRoot.tick();
    }
  };

  useEffect(() => {
    const root = new AnimatedAlgorithm({
      element: threeContainer.current
    });
    setThreeRoot(root);
    setLoaded(true);

    return () => {
      if (loaded) {
        root.dispose();
      }
    };
  }, []);

  return (
    <>
      <div style={{ width: "4rem" }}>
        <Slider
          value={speed}
          onChange={val => changeSpeed(val)}
          min={1}
          max={10}
        />
      </div>
      <button type="button" onClick={randomize}>
        Randomize
      </button>
      <button onClick={togglePause} type="button">
        {paused ? "unpause" : "pause"}
      </button>
      <input
        value={speed}
        type="number"
        onChange={e => changeSpeed(e.target.value)}
      />
      <input
        value={size}
        type="number"
        onChange={e => setSize(e.target.value)}
      />
      <select value={alg} onChange={e => setAlg(e.target.value)}>
        <option value="STABLE_MATCHING">Stable Matching</option>
        <option value="BUBBLE_SORT">Bubble Sort</option>
        <option value="SELECTION_SORT">Selection Sort</option>
      </select>
      <div className="mt-8">
        <div
          className="neo-glow mt-8 flex items-center justify-center"
          style={{ marginLeft: "-1rem", marginRight: "-1rem" }}
        >
          {/* <div className="neo-glow p-6 mt-8 h-64 flex items-center justify-center"> */}
          {/* <h2 className="text-brand-gray text-5xl font-serif">Animation</h2> */}
          {/* <AnimatedAlgorithm /> */}
          <div id="three-container" ref={threeContainer} />
        </div>
      </div>
    </>
  );
};

export default IndexPage;
