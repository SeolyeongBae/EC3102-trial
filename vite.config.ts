import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
  },
  server: {
    open: true, //개발 서버를 실행할 때 브라우저를 자동으로 엽니다.
    port: 3000, //3000번 포트로 개발 서버를 실행합니다.
    proxy: {
      "/api": {
        target: "https://computer-system-team-02.dev.mobilex.kr/api", // 실제 백엔드 서버 URL로 변경
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: "eslint src/",
        dev: {
          logLevel: ["warning"],
        },
      },
      enableBuild: false,
    }),
    svgr(),
  ],
});
