export class HealthServices {
  async getHealthStatus() {
    return {
      message: "pong",
    };
  }
}
