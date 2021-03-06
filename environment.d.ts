declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      FAUNA_SECRET: string;
      appUrl: string;
      appTitle: string;
    }
  }
}

export {}
