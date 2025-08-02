/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OECD_API_KEY: string
  readonly VITE_WORLD_BANK_API_KEY: string
  readonly VITE_IMF_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 