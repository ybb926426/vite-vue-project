import type { ServerOptions } from 'http-proxy';

type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, ServerOptions & { rewrite: (path: string) => string}>;

const httpsRE = /^https:\/\//;

export function createProxy(list: ProxyList = []) {
  const res: ProxyTargetList = {};
  for(const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);
    res[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return res;
}