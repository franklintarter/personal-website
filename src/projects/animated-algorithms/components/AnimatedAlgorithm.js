import React, { useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import AnimatedAlgorithm from "../three-root";
import getAnimation from "../get-animation";
import "./slider.css";

export default ({ algorithmName }) => {
  const [speed, setSpeed] = useState(5);
  const [paused, setPaused] = useState(false);
  const [size, setSize] = useState(15);

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

      const nextRun = getAnimation(algorithmName, threeRoot, {
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
    if (loaded) {
      startAlgorithm();
    }
  }, [loaded]);

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
      <div
        className="neo-glow mt-6 flex items-center justify-center"
        style={{ marginLeft: "-1rem", marginRight: "-1rem" }}
      >
        <div
          style={{ lineHeight: 0 }}
          id="three-container"
          ref={threeContainer}
        />
      </div>
      {/* <div className="flex justify-between mt-6 items-center"> */}
      <div className="flex justify-between mt-4 mb-12 items-center xs:flex-row flex-col">
        <div className="w-32 flex flex-col mb-6 xs:mb-0">
          <span className="text-lg text-center mb-1 text-gray-800">Speed</span>
          <Slider
            value={speed}
            onChange={val => changeSpeed(val)}
            min={1}
            max={10}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={randomize}
            className="mr-4 bg-brand-faded hover:bg-brand-gray transition text-white font-bold py-1 px-4 rounded"
          >
            Restart
          </button>
          <button
            onClick={togglePause}
            type="button"
            className="bg-brand-faded w-20 hover:bg-brand-gray transition text-white font-bold py-1 px-2 rounded"
          >
            {paused ? "Play" : "Pause"}
          </button>
        </div>
      </div>
    </>
  );
};
