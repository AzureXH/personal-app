import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "https://knowing-wren-20926.upstash.io",
  token: "AVG-AAIjcDFhZmY0MTI3Y2IwNWM0ZGY2OTNkZGJhOGJjNGM5OTU0ZXAxMA",
});

export default redis;
