export const enum CONSOLER_COMPILED {
  SERVER = "server",
  CLIENT = "client"
}

export const enum CONSOLE_COLORS {
  RESET = "\x1b[0m",
  LINE = "\n",
  BRIGHT = "\x1b[1m",
  DIM = "\x1b[2m",
  UNDERSCORE = "\x1b[4m",
  BLINK = "\x1b[5m",
  REVERSE = "\x1b[7m",
  HIDDEN = "\x1b[8m",
  FGBLACK = "\x1b[30m",
  FGRED = "\x1b[31m",
  FGGREEN = "\x1b[32m",
  FGYELLOW = "\x1b[33m",
  FGBLUE = "\x1b[34m",
  FGMAGENTA = "\x1b[35m",
  FGCYAN = "\x1b[36m",
  FGWHITE = "\x1b[37m",
  BGBLACK = "\x1b[40m",
  BGRED = "\x1b[41m",
  BGGREEN = "\x1b[42m",
  BGYELLOW = "\x1b[43m",
  BGBLUE = "\x1b[44m",
  BGMAGENTA = "\x1b[45m",
  BGCYAN = "\x1b[46m",
  BGWHITE = "\x1b[47m"
}

/**
 * Next.js Console log Style
 * @class
 * */
export default class NextConsole {
  public static log = (color: string, event: string, message: string, ...arg: any): void => {
    if (process.env.NODE_ENV !== "production") {
      const delimiter = event.length >= 5 ? " - " : "  - ";

      let at = "";

      if (arg.length) {
        let path = "";

        if (arg.length > 1) {
          // (/page/index.tsx:1)
          path = ` (${CONSOLE_COLORS.FGGREEN}${CONSOLE_COLORS.UNDERSCORE}${process.cwd()}${arg[1]}:${arg[2]}${CONSOLE_COLORS.RESET})`;
        }

        //     at server
        //     at server (/page/index.tsx:1)
        at = `${CONSOLE_COLORS.LINE}    at ${arg[0]}${path}`;
      }

      /**
       * info  - message
       * info  - message
       *     at server
       * info  - message
       *     at server (/page/index.tsx:1)
       * */
      console.log(`${color}${event}${CONSOLE_COLORS.RESET}${delimiter}${message}${at}`);
    }
  };

  public static info = (message: string, ...arg: any): void => {
    this.log(CONSOLE_COLORS.FGCYAN, "info", message, ...arg);
  };

  public static event = (message: string, ...arg: any): void => {
    this.log(CONSOLE_COLORS.FGMAGENTA, "event", message, ...arg);
  };

  public static wait = (message: string, ...arg: any): void => {
    this.log(CONSOLE_COLORS.FGCYAN, "wait", message, ...arg);
  };

  public static warn = (message: string, ...arg: any): void => {
    this.log(CONSOLE_COLORS.FGYELLOW, "warn", message, ...arg);
  };

  public static ready = (message: string, ...arg: any): void => {
    this.log(CONSOLE_COLORS.FGGREEN, "ready", message, ...arg);
  };

  public static error = (message: string, ...arg: any): void => {
    this.log(CONSOLE_COLORS.FGRED, "error", message, ...arg);
  };
}
