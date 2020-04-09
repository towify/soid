/*
 * @author kaysaith
 * @date 2020/3/13 13:00
 */

import { Nullable } from "../util/value_checker";

class SharedPreference {
  public static sharedPreference: SharedPreference | undefined;

  public static getInstance() {
    if (SharedPreference.sharedPreference) {
      return SharedPreference.sharedPreference;
    } else {
      return new SharedPreference();
    }
  }

  private redis: { [key: string]: string } = {};

  private constructor() { }

  public delete(key: string) {
    return new Promise((resolve) => {
      delete this.redis[key];
      localStorage.removeItem(key);
      resolve();
    });
  }

  public get(key: string): Nullable<string> {
    const redisValue = this.redis[key];
    if (redisValue) {
      return new Nullable(false, redisValue);
    } else {
      const result = localStorage.getItem(key);
      if (result) {
        return new Nullable(false, result);
      } else {
        return new Nullable(true);
      }
    }
  }

  public save(key: string, value: string) {
    return new Promise((resolve) => {
      this.redis[key] = value;
      localStorage.setItem(key, value);
      resolve();
    });
  }
}

export const Shared = SharedPreference.getInstance();
