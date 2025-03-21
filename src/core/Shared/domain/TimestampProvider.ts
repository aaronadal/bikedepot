export class TimestampProvider {
  public static now() {
    return Math.round(new Date().getTime() / 1000);
  }
}
