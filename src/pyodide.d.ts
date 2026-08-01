interface PyProxyDict {
  destroy(): void;
}

interface PyodideInterface {
  runPythonAsync(code: string, options?: { globals?: PyProxyDict }): Promise<unknown>;
  runPython(code: string): unknown;
  globals: { get(name: string): (...args: unknown[]) => PyProxyDict };
  setStdout(options: { batched: (msg: string) => void }): void;
  setStderr(options: { batched: (msg: string) => void }): void;
}

interface Window {
  loadPyodide: (options?: Record<string, unknown>) => Promise<PyodideInterface>;
}
