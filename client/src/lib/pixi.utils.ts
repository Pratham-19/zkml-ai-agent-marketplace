"use client";

import { PriceChangePercentage } from "@/types/nav";
import * as PIXI from "pixi.js";

const imageTextureCache: Map<string, PIXI.Texture> = new Map();

const gradientTextureCache: Map<string, PIXI.Texture> = new Map();

export class PixiUtils {
  static createContainer = (circle: PIXI.Circle) => {
    const container = new PIXI.Container();
    container.position.set(circle.x, circle.y);
    container.hitArea = new PIXI.Circle(0, 0, circle.radius);
    container.eventMode = "dynamic";
    return container;
  };

  static createImageSprite = (circle: PIXI.Circle) => {
    const imgUrl = `/dummy-token.jpg`;

    // Check if texture is already cached
    if (imageTextureCache.has(imgUrl)) {
      const texture = imageTextureCache.get(imgUrl)!;
      const sprite = new PIXI.Sprite(texture);

      const isFullSize = circle.radius * 0.3 < 10;

      sprite.anchor.set(0.5);

      sprite.width = circle.radius * (isFullSize ? 1.2 : 0.5);
      sprite.height = circle.radius * (isFullSize ? 1.2 : 0.5);
      sprite.position = { x: 0, y: isFullSize ? 0 : -circle.radius / 2 };

      return sprite;
    }

    // If not cached, create new texture
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        const source = new PIXI.ImageSource({
          resource: image,
        });

        const texture = new PIXI.Texture({
          source,
        });

        // Cache the texture
        imageTextureCache.set(imgUrl, texture);

        const sprite = new PIXI.Sprite(texture);
        const isFullSize = circle.radius * 0.3 < 10;

        sprite.anchor.set(0.5);
        sprite.width = circle.radius * (isFullSize ? 1.2 : 0.5);
        sprite.height = circle.radius * (isFullSize ? 1.2 : 0.5);
        sprite.position = { x: 0, y: isFullSize ? 0 : -circle.radius / 2 };

        resolve(sprite);
      };

      image.src = imgUrl;
    });
  };

  static createText = (circle: PIXI.Circle) => {
    const fontSize = circle.radius * 0.4;

    const textStyle = new PIXI.TextStyle({
      fontSize: fontSize + "px",
      fill: "#ffffff",
    });

    const text = new PIXI.Text(circle.symbol.toUpperCase(), textStyle);
    text.anchor.set(0.5);
    text.position.y = 0.15 * circle.radius;
    return text;
  };

  static createText2 = (
    circle: PIXI.Circle,
    bubbleSort: PriceChangePercentage,
  ) => {
    const fontSize = circle.radius * 0.3;

    const text2Style = new PIXI.TextStyle({
      fontSize: fontSize + "px",
      fill: "#ffffff",
    });

    const data = circle[bubbleSort]
      ? circle[bubbleSort]!.toFixed(2) + "%"
      : "No data";

    const text2 = new PIXI.Text(data, text2Style);
    text2.anchor.set(0.5);
    text2.position.y = circle.radius / 1.5;
    circle["text2"] = text2;

    return text2;
  };

  static createGradientTexture(radius: number, color: string): PIXI.Texture {
    const textureKey: string = `${radius}_${color}`;

    if (gradientTextureCache.has(textureKey)) {
      return gradientTextureCache.get(textureKey)!;
    }

    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = radius;
    canvas.height = radius;
    const context: CanvasRenderingContext2D | null = canvas.getContext("2d");

    if (context) {
      // Create the radial gradient based on the provided color
      const gradient: CanvasGradient = context.createRadialGradient(
        radius / 2,
        radius / 2,
        0,
        radius / 2,
        radius / 2,
        radius / 2,
      );

      switch (color) {
        case "green":
          gradient.addColorStop(0, "rgba(46, 204, 113, 0)");
          gradient.addColorStop(0.42, "rgba(46, 204, 113, 0.15)");
          gradient.addColorStop(0.6, "rgba(46, 204, 113, 0.92)");
          break;
        case "red":
          gradient.addColorStop(0, "rgba(255,99,71, 0.1)");
          gradient.addColorStop(0.45, "rgba(255,99,71, 0.15)");
          gradient.addColorStop(0.6, "rgba(255,99,71, 0.95)");
          break;
      }

      // Fill the canvas with the gradient
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(radius / 2, radius / 2, radius / 2 / 2, 0, Math.PI * 2);
      context.fill();

      // Create a PIXI texture from the canvas
      const texture: PIXI.Texture = PIXI.Texture.from(canvas);

      // Cache the texture for future use
      gradientTextureCache.set(textureKey, texture);

      return texture;
    }

    return PIXI.Texture.from(canvas);
  }
}
