import {config} from "dotenv";

config();

export const APP_CONFIG = {
    env: process.env.NODE_ENV || 'development',
    port: Number(process.env.SHOP_APP_PORT || 3000),
}
