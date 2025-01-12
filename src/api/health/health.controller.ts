import Elysia from "elysia";
import { HealthServices } from "./health.service";

const _healthService = new HealthServices();

export const healthRoutes = new Elysia({ prefix: "/ping" }).get(
  "/",
  //   () => "pong"
  _healthService.getHealthStatus
);
