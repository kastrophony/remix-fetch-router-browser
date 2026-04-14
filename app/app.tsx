import { createRoot, Frame } from "remix/component";

function App() {
  return () => (
    <div>
      <h1>Hello, World!</h1>
      <Frame src="/home" fallback={<p>Loading...</p>} />
      <Frame src="/about" fallback={<p>Loading after 2 seconds...</p>} />
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
