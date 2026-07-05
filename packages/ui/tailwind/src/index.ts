// Theme exports
export * from './theme';
export { theme } from './theme';

// Utility exports
export { cn } from './utils/cn';

// Config exports
export { gitAnimalsConfig, createGitAnimalsConfig } from './config';
export { gitAnimalsPreset } from './preset';

// Component exports — 슬라이스 전환 시 panda 원본과 1:1 대조 후 점진 추가(ADR-003).
export * from './components';
