/*
 * @author kaysaith
 * @date 2020/3/13 13:00
 */
import { Nullable } from "../util/value_checker";
class SharedPreference {
    constructor() {
        this.redis = {};
    }
    static getInstance() {
        if (SharedPreference.sharedPreference) {
            return SharedPreference.sharedPreference;
        }
        else {
            return new SharedPreference();
        }
    }
    delete(key) {
        return new Promise((resolve) => {
            delete this.redis[key];
            localStorage.removeItem(key);
            resolve();
        });
    }
    get(key) {
        const redisValue = this.redis[key];
        if (redisValue) {
            return new Nullable(false, redisValue);
        }
        else {
            const result = localStorage.getItem(key);
            if (result) {
                return new Nullable(false, result);
            }
            else {
                return new Nullable(true);
            }
        }
    }
    save(key, value) {
        return new Promise((resolve) => {
            this.redis[key] = value;
            localStorage.setItem(key, value);
            resolve();
        });
    }
}
export const Shared = SharedPreference.getInstance();
