/**
 * Thin wrapper over Pyodide (CPython compiled to WebAssembly).
 *
 * Two things matter here beyond "run the code":
 *  1. The runtime is loaded once and reused — it is a multi-megabyte download.
 *  2. Every run gets a *fresh* global namespace, so a variable defined in one
 *     exercise cannot silently satisfy the next one.
 */

let runtime: Promise<PyodideInterface> | null = null;

export function ensurePython(): Promise<PyodideInterface> {
  if (!runtime) {
    runtime = window.loadPyodide();
  }
  return runtime;
}

export function isPythonReady(): boolean {
  return runtime !== null && ready;
}

let ready = false;

export interface RunResult {
  stdout: string;
  error: string | null;
}

/** Trims the Pyodide wrapper frames so learners see their own traceback. */
function cleanTraceback(message: string): string {
  const lines = message.split('\n');
  const start = lines.findIndex((line) => line.startsWith('Traceback'));
  const relevant = start === -1 ? lines : lines.slice(start);
  return relevant
    .filter((line) => !line.includes('/lib/python3') && !line.includes('pyodide'))
    .join('\n')
    .trim();
}

export async function runPython(code: string, stdin?: string): Promise<RunResult> {
  const pyodide = await ensurePython();
  ready = true;

  const out: string[] = [];
  const err: string[] = [];
  pyodide.setStdout({ batched: (line) => out.push(line) });
  pyodide.setStderr({ batched: (line) => err.push(line) });

  // Replace input() rather than feeding stdin: the real builtin echoes its
  // prompt to stdout, which would pollute the output we compare against.
  const stub = `import builtins\nbuiltins.input = lambda *args, **kwargs: ${JSON.stringify(stdin ?? '')}`;

  let namespace: PyProxyDict | null = null;
  try {
    await pyodide.runPythonAsync(stub);
    namespace = pyodide.globals.get('dict')();
    await pyodide.runPythonAsync(code, { globals: namespace });
    return {
      stdout: out.join('\n'),
      error: err.length > 0 ? err.join('\n') : null,
    };
  } catch (error) {
    return {
      stdout: out.join('\n'),
      error: cleanTraceback(error instanceof Error ? error.message : String(error)),
    };
  } finally {
    namespace?.destroy();
  }
}
