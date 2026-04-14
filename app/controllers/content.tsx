import { BuildAction } from "remix/fetch-router";

import { routes } from "../routes.ts";
import { render } from "../utils/render.ts";

export const contentAction = {
  handler() {
    return render(
      <main>
        <h1>content</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </main>,
    );
  },
} satisfies BuildAction<"GET", typeof routes.home>;
