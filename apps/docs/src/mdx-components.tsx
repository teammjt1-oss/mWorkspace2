import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: (props) => <h1 className="mb-6 text-3xl font-bold" {...props} />,
  h2: (props) => <h2 className="mt-10 mb-4 border-b pb-2 text-xl font-semibold" {...props} />,
  h3: (props) => <h3 className="mt-8 mb-3 text-lg font-semibold" {...props} />,
  p: (props) => <p className="my-4 leading-7" {...props} />,
  a: (props) => <a className="font-medium underline underline-offset-4" {...props} />,
  ul: (props) => <ul className="my-4 ml-6 list-disc space-y-2" {...props} />,
  ol: (props) => <ol className="my-4 ml-6 list-decimal space-y-2" {...props} />,
  code: (props) => <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm" {...props} />,
  pre: (props) => (
    <pre
      className="my-4 overflow-x-auto rounded-lg bg-muted p-4 text-sm [&>code]:bg-transparent [&>code]:p-0"
      {...props}
    />
  ),
  table: (props) => <table className="my-4 w-full text-sm" {...props} />,
  th: (props) => <th className="border px-3 py-2 text-left font-semibold" {...props} />,
  td: (props) => <td className="border px-3 py-2" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
