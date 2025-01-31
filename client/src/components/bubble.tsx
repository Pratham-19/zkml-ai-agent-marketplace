"use client";

import { PixiUtils } from "@//lib/pixi.utils";
import { appConfig, BubblesUtils } from "@/lib/bubbles.utls";
import { CoingeckoCoinData, PriceChangePercentage } from "@/types/nav";

import * as PIXI from "pixi.js";
import React, { useEffect, useMemo, useState } from "react";
import { Skeleton } from "./ui/skeleton";

type Props = {
  coins: CoingeckoCoinData[];
};

const { width, height, maxCircleSize, minCircleSize } = appConfig;

export default function Bubbles({ coins = [] }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [circles, setCircles] = useState<PIXI.Circle[] | null>(null);
  const [bubbleSort, setBubbleSort] = useState(PriceChangePercentage.HOUR);

  const appRef = React.useRef<HTMLDivElement>(null);

  const scalingFactor = useMemo(() => {
    return BubblesUtils.getScalingFactor(coins, bubbleSort);
  }, [bubbleSort, coins]);

  useEffect(() => {
    if (coins) {
      const scalingFactor = BubblesUtils.getScalingFactor(
        coins,
        PriceChangePercentage.HOUR,
      );
      const shapes = BubblesUtils.generateCircles(coins, scalingFactor);
      setCircles(shapes);
    }
  }, [coins]);

  useEffect(() => {
    async function initPixi() {
      if (!circles) return;
      const imageSprites: PIXI.Sprite[] = [];
      const textSprites: PIXI.Text[] = [];
      const text2Sprites: PIXI.Text[] = [];
      const circleGraphics: PIXI.Sprite[] = [];

      const app = new PIXI.Application({
        width,
        height,
        antialias: true,
      });

      const appContainer = appRef.current;

      await app.init();

      appContainer?.appendChild(app.canvas);
      appContainer?.children[0].addEventListener("click", (e: unknown) =>
        BubblesUtils.handleEmptySpaceClick(e as MouseEvent, circles),
      );

      const loadTextures = circles.map(() =>
        PIXI.Assets.load("/dummy-token.jpg"),
      );
      await Promise.all(loadTextures);

      for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];

        const container = PixiUtils.createContainer(circle);

        const imageSprite = await PixiUtils.createImageSprite(circle);
        // imageSprites.push(imageSprite);
        // container.addChild(imageSprite);

        const circleGraphic = new PIXI.Sprite(
          PixiUtils.createGradientTexture(circle.radius * 4, circle.color),
        );
        circleGraphic.anchor.set(0.5);
        circleGraphics.push(circleGraphic);
        container.addChild(circleGraphic);

        // Create the text
        const text = PixiUtils.createText(circle);
        container.addChild(text);
        textSprites.push(text);

        // Create the second text
        const text2 = PixiUtils.createText2(circle, PriceChangePercentage.HOUR);

        container.addChild(text2);
        text2Sprites.push(text2);

        app.stage.addChild(container);
      }

      const ticker = BubblesUtils.update(
        circles,
        imageSprites,
        textSprites,
        text2Sprites,
        circleGraphics,
      );
      setTimeout(() => {
        app.ticker.add(ticker);
        setIsLoading(false);
      }, 200);

      return () => {
        app.ticker.remove(ticker);
        appContainer?.children[0]?.removeEventListener("click", (e: unknown) =>
          BubblesUtils.handleEmptySpaceClick(e as MouseEvent, circles),
        );
      };
    }

    initPixi();
  }, [circles]);

  useEffect(() => {
    if (circles) {
      const max = maxCircleSize;
      const min = minCircleSize;

      circles.forEach((circle) => {
        if (!circle[bubbleSort]) return;

        const radius = Math.abs(Math.floor(circle[bubbleSort] * scalingFactor));
        circle.targetRadius = radius > max ? max : radius > min ? radius : min;
        circle.color = circle[bubbleSort] > 0 ? "green" : "red";
        if (circle.text2) {
          circle.text2.text = circle[bubbleSort].toFixed(2) + "%";
        }
      });
    }
  }, [bubbleSort, coins, circles, scalingFactor]);
  return (
    <div className="flex flex-col-reverse">
      {/* <NavigationBar bubbleSort={bubbleSort} setBubbleSort={setBubbleSort} /> */}
      <div className="h-[400px] w-full overflow-hidden" ref={appRef}></div>
      {isLoading && <Skeleton className="h-[400px] w-full rounded-md" />}
    </div>
  );
}
