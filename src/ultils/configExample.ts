export const vmessExample: any = {
  dns: {
    hosts: {
      'domain:googleapis.cn': 'googleapis.com',
    },
    servers: ['1.1.1.1'],
  },
  inbounds: [
    {
      listen: '127.0.0.1',
      port: 10808,
      protocol: 'socks',
      settings: {
        auth: 'noauth',
        udp: true,
        userLevel: 8,
      },
      sniffing: {
        destOverride: [],
        enabled: false,
      },
      tag: 'socks',
    },
    {
      listen: '127.0.0.1',
      port: 10809,
      protocol: 'http',
      settings: {
        userLevel: 8,
      },
      tag: 'http',
    },
  ],
  log: {
    loglevel: 'warning',
  },
  outbounds: [
    {
      mux: {
        concurrency: 8,
        enabled: false,
      },
      protocol: 'vmess',
      settings: {
        vnext: [
          {
            address: 'add',
            port: 'port',
            users: [
              {
                alterId: 'aid',
                encryption: '',
                flow: '',
                id: 'id',
                level: 8,
                security: 'auto',
              },
            ],
          },
        ],
      },
      streamSettings: {
        network: 'net',
        security: '',
        wsSettings: {
          headers: {
            Host: 'host',
          },
          path: 'path',
        },
      },
      tag: 'proxy',
    },
    {
      protocol: 'freedom',
      settings: {},
      tag: 'direct',
    },
    {
      protocol: 'blackhole',
      settings: {
        response: {
          type: 'http',
        },
      },
      tag: 'block',
    },
  ],
  routing: {
    domainMatcher: 'mph',
    domainStrategy: 'IPIfNonMatch',
    rules: [
      {
        ip: ['1.1.1.1'],
        outboundTag: 'proxy',
        port: '53',
        type: 'field',
      },
    ],
  },
};
