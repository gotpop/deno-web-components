/**
 * Logging utility with environment variable control
 */

// Log levels
const LOG_LEVELS = {
  OFF: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  DEBUG: 4,
};

class Logger {
  constructor() {
    this.level = this.getLogLevel();
  }

  getLogLevel() {
    // Check for environment variables in order of precedence
    const envLevel =
      globalThis.DEBUG_VIEW_TRANSITIONS ||
      window.DEBUG_VIEW_TRANSITIONS ||
      globalThis.LOG_LEVEL ||
      window.LOG_LEVEL ||
      "INFO";

    const normalizedLevel = envLevel.toString().toUpperCase();
    return LOG_LEVELS[normalizedLevel] ?? LOG_LEVELS.INFO;
  }

  error(...args) {
    if (this.level >= LOG_LEVELS.ERROR) {
      console.error("[VIEW-TRANSITIONS]", ...args);
    }
  }

  warn(...args) {
    if (this.level >= LOG_LEVELS.WARN) {
      console.warn("[VIEW-TRANSITIONS]", ...args);
    }
  }

  info(...args) {
    if (this.level >= LOG_LEVELS.INFO) {
      console.info("[VIEW-TRANSITIONS]", ...args);
    }
  }

  debug(...args) {
    if (this.level >= LOG_LEVELS.DEBUG) {
      console.log("[VIEW-TRANSITIONS]", ...args);
    }
  }

  // Convenience method for transition-specific logging
  transition(...args) {
    if (this.level >= LOG_LEVELS.DEBUG) {
      console.log("[TRANSITION]", ...args);
    }
  }
}

export const logger = new Logger();
