import { createRouter } from "remix/fetch-router";
import { logger } from "remix/logger-middleware";

import { contentAction } from "./controllers/content.tsx";
import { moreAction } from "./controllers/more.tsx";
import { routes } from "./routes.ts";

const middleware = [logger()];

export const router = createRouter({ middleware });
router.get(routes.content, contentAction);
router.get(routes.more, moreAction);
