"use client";

import { BubblesUtils } from "@/lib/bubbles.utls";
import { PixiUtils } from "@/lib/pixi.utils";
import { PriceChangePercentage } from "@/types/nav";
import dynamic from "next/dynamic";
import * as PIXI from "pixi.js";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  coins: any[];
  width?: number;
  height?: number;
};

// Modified appConfig to use props
const getAppConfig = (width: number, height: number) => ({
  width,
  height,
  speed: 0.005,
  elasticity: 0.005,
  wallDamping: 0.5,
  maxCircleSize: 250,
  minCircleSize: width > 920 ? 30 : 15,
});

function Bubbles({ coins = [], width = 800, height = 600 }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [circles, setCircles] = useState<PIXI.Circle[] | null>(null);
  const [bubbleSort, setBubbleSort] = useState(PriceChangePercentage.HOUR);
  const [app, setApp] = useState<PIXI.Application | null>(null);
  const appRef = React.useRef<HTMLDivElement>(null);

  const appConfig = useMemo(() => getAppConfig(width, height), [width, height]);

  const scalingFactor = useMemo(() => {
    return BubblesUtils.getScalingFactor(coins, bubbleSort, appConfig);
  }, [bubbleSort, coins, appConfig]);

  // Initialize circles when coins data changes
  useEffect(() => {
    if (coins.length > 0) {
      const shapes = BubblesUtils.generateCircles(
        coins,
        scalingFactor,
        PriceChangePercentage.HOUR,
        appConfig,
      );
      setCircles(shapes);
    }
  }, [coins, scalingFactor, appConfig]);

  // Initialize PIXI application with drag support
  useEffect(() => {
    const initPixi = async () => {
      if (!appRef.current || !circles) return;

      const pixiApp = new PIXI.Application();
      await pixiApp.init({
        width: appConfig.width,
        height: appConfig.height,
        backgroundColor: "#0e1010",
        antialias: true,
      });

      appRef.current.appendChild(pixiApp.canvas);
      setApp(pixiApp);

      const imageSprites: PIXI.Sprite[] = [];
      const textSprites: PIXI.Text[] = [];
      const text2Sprites: PIXI.Text[] = [];
      const circleGraphics: PIXI.Sprite[] = [];

      // Add drag event handlers
      let isDragging = false;
      let selectedCircle: any = null;
      let dragStartPos = { x: 0, y: 0 };

      pixiApp.canvas.addEventListener(
        "click",
        (e: MouseEvent) =>
          !isDragging && BubblesUtils.handleEmptySpaceClick(e, circles),
      );

      // Create and add sprites with drag functionality
      for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        const container = PixiUtils.createContainer(circle);

        // Add drag functionality to container
        container.eventMode = "dynamic";
        container.cursor = "pointer";

        container
          .on("pointerdown", function (event) {
            isDragging = true;
            selectedCircle = circle;
            dragStartPos = event.global.clone();
            circle.vx = 0;
            circle.vy = 0;
            this.alpha = 0.8;
          })
          .on("pointerup", function () {
            isDragging = false;
            selectedCircle = null;
            this.alpha = 1;
          })
          .on("pointerupoutside", function () {
            isDragging = false;
            selectedCircle = null;
            this.alpha = 1;
          })
          .on("pointermove", function (event) {
            if (isDragging && selectedCircle) {
              const newPosition = event.global;
              selectedCircle.x = newPosition.x;
              selectedCircle.y = newPosition.y;
              this.position.set(newPosition.x, newPosition.y);
            }
          });

        const imageSprite = PixiUtils.createImageSprite(circle);
        imageSprites.push(imageSprite);
        container.addChild(imageSprite);

        const circleGraphic = new PIXI.Sprite(
          PixiUtils.createGradientTexture(circle.radius * 4, circle.color),
        );
        circleGraphic.anchor.set(0.5);
        circleGraphics.push(circleGraphic);
        container.addChild(circleGraphic);

        const text = PixiUtils.createText(circle);
        container.addChild(text);
        textSprites.push(text);

        const text2 = PixiUtils.createText2(circle, PriceChangePercentage.HOUR);
        container.addChild(text2);
        text2Sprites.push(text2);

        pixiApp.stage.addChild(container);
      }

      // Modified update ticker to account for dragging
      const ticker = BubblesUtils.update(
        circles,
        imageSprites,
        textSprites,
        text2Sprites,
        circleGraphics,
        isDragging,
      );

      setTimeout(() => {
        pixiApp.ticker.add(ticker);
        setIsLoading(false);
      }, 200);

      return () => {
        pixiApp.ticker.remove(ticker);
        pixiApp.canvas.removeEventListener("click", (e: MouseEvent) =>
          BubblesUtils.handleEmptySpaceClick(e, circles),
        );
        pixiApp.destroy(true, {
          children: true,
          texture: true,
          baseTexture: true,
        });
      };
    };

    initPixi();
  }, [circles, appConfig]);

  // Update circles when bubble sort changes
  useEffect(() => {
    if (circles) {
      const { maxCircleSize, minCircleSize } = appConfig;

      circles.forEach((circle) => {
        if (!circle[bubbleSort]) return;

        const radius = Math.abs(Math.floor(circle[bubbleSort] * scalingFactor));
        circle.targetRadius =
          radius > maxCircleSize
            ? maxCircleSize
            : radius > minCircleSize
              ? radius
              : minCircleSize;
        circle.color = circle[bubbleSort] > 0 ? "green" : "red";
        if (circle.text2) {
          circle.text2.text = circle[bubbleSort].toFixed(2) + "%";
        }
      });
    }
  }, [bubbleSort, coins, circles, scalingFactor, appConfig]);

  return (
    <div className="flex flex-col-reverse overflow-hidden rounded bg-zinc-900 px-2 md:flex-col">
      <div
        className="w-full overflow-hidden rounded border-2 border-gray-800 bg-zinc-900"
        ref={appRef}
      ></div>
      {isLoading && <h2>loading</h2>}
    </div>
  );
}

export default dynamic(() => Promise.resolve(Bubbles), {
  ssr: false,
});
