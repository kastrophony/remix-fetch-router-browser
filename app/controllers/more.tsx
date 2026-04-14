import { BuildAction } from "remix/fetch-router";

import { routes } from "../routes.ts";
import { render } from "../utils/render.ts";

export const moreAction = {
  async handler() {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return render(
      <main>
        <h1>more content</h1>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
      </main>,
    );
  },
} satisfies BuildAction<"GET", typeof routes.more>;
