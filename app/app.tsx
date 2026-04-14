import { createRoot, Frame } from "remix/component";

import { routes } from "./routes.ts";

function App() {
  return () => (
    <div>
      <h1>Hello, World!</h1>
      <Frame src={routes.content.href()} fallback={<p>Loading...</p>} />
      <Frame
        src={routes.more.href()}
        fallback={<p>Loading after 2 seconds...</p>}
      />
    </div>
  );
}

// Create a root attached to a DOM element
const container = document.getElementById("app")!;
const root = createRoot(container, {
  frameInit: {
    resolveFrame: async (src, signal, target) => {
      const headers = new Headers({ accept: "text/html" });
      if (target) {
        headers.set("x-remix-target", target);
      }
      const response = await fetch(src, { headers, signal });
      return response.body ?? (await response.text());
    },
  },
});

root.render(<App />);
