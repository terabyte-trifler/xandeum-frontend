/**
 * JSON-RPC request helper for pRPC calls
 */
async function prpcRequest<T>(
  method: string, 
  params?: unknown[]
): Promise<T> {
  const response = await fetch(config.api.prpcUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params: params || [],
    }),
  });

  if (!response.ok) {
    throw new Error(`pRPC request failed: ${response.statusText}`);
  }

  const data = await response.json();
  
  if (data.error) {
    throw new Error(data.error.message || 'pRPC error');
  }

  return data.result;
}