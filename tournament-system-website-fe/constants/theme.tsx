import { PaletteMode } from "@mui/material";
import { Components } from "@mui/material/styles/components";
import { Theme } from "@mui/material/styles/createTheme";

export const Common = {
  labelSize: "12px",
  inputFontSize: "13px",
  inputMaxSize: "350px",
  inputMinSize: "150px",
  MuiButtonLayout: {
    fontWeight: "normal",
    padding: "10px",
    maxHeight: "45px",
    margin: "5px"
  }
};

export const layout: Components<Omit<Theme, "components">> = {
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: {
        minWidth: "450px"
      }
    }
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        width: "100%",
        maxWidth: Common.inputMaxSize
      }
    }
  },
  MuiStack: {
    defaultProps: {
      maxWidth: Common.inputMaxSize
    }
  },
  MuiFormGroup: {
    styleOverrides: {
      root: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItem: "center",
        justifyContent: "space-between",
        margin: "10px 0"
      }
    }
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        width: "35px",
        height: "35px",
        padding: 0
      }
    }
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        fontSize: Common.inputFontSize
      }
    }
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        fontSize: "14px",
        marginBottom: "10px"
      }
    }
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontSize: "14px",
        fontWeight: "normal"
      }
    }
  }
};
export const Dark = {
  color: "#181b26",
  text: "#fff",
  hover: "rgba(34,44,80,0.3)",
  active: "rgb(34,44,80)",
  bg: "#222736",
  line: "rgba(255,255,255,.2)"
};

export const Light = {
  color: "#dee2e6",
  text: "#333e50",
  hover: "#ced4da",
  active: "rgba(222, 226, 230, 0.8)",
  bg: "#f8f9fa",
  line: "rgba(0,0,0,0.2)"
};

export const getTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    common: {
      black: "#333",
      white: "#fff"
    },
    ...(mode === "light"
      ? {
          primary: {
            main: Light.color,
            contrastText: Light.text,
            light: Light.color,
            dark: Dark.color
          },
          secondary: {
            main: Light.color,
            contrastText: Light.text,
            light: Light.color,
            dark: Dark.color
          },
          text: {
            primary: Light.text,
            disabled: "gray",
            secondary: Light.text
          },
          background: {
            default: Light.bg,
            paper: Light.bg
          },
          action: {
            active: Light.active,
            focus: Light.active,
            hover: Light.hover,
            hoverOpacity: 0.5,
            selected: Light.active,
            selectedOpacity: 0.5,
            disabled: "gray"
          }
        }
      : {
          primary: {
            main: Dark.color,
            contrastText: Dark.text,
            light: Light.color,
            dark: Dark.color
          },
          secondary: {
            main: Dark.color,
            contrastText: Dark.text,
            light: Light.color,
            dark: Dark.color
          },
          text: {
            primary: Dark.text,
            disabled: "gray",
            secondary: Dark.text
          },
          background: {
            default: Dark.bg,
            paper: Dark.bg
          },
          action: {
            active: Dark.active,
            focus: Dark.active,
            hover: Dark.hover,
            hoverOpacity: 0.5,
            selected: Dark.active,
            selectedOpacity: 0.5
          }
        })
  },
  components: {
    ...layout,
    ...(mode === "light"
      ? {
          MuiButton: {
            styleOverrides: {
              root: {
                ...Common.MuiButtonLayout,
                color: Light.text,
                ":hover": {
                  background: Light.hover
                }
              },
              outlined: {
                border: `1px solid ${Light.line}`,
                ":hover": {
                  background: Light.color,
                  border: `1px solid ${Light.line}`
                }
              }
            }
          },
          MuiToggleButton: {
            styleOverrides: {
              root: {
                color: Light.text,
                width: "100%",
                "&.Mui-selected": {
                  backgroundColor: Light.active,
                  color: Light.text,
                  ":hover": {
                    background: Light.color
                  }
                },
                ":hover": {
                  background: Light.hover
                },
                ":active": {
                  background: Light.hover
                },
                "&.Mui-disabled": {
                  background: "rgba(0,0,0,0.1)"
                }
              }
            }
          },
          MuiInput: {
            styleOverrides: {
              root: {
                minWidth: Common.inputMinSize,
                fontSize: Common.inputFontSize,
                ":after": {
                  borderColor: Light.line
                }
              }
            }
          },
          MuiFormControlLabel: {
            styleOverrides: {
              root: {
                ".MuiTypography-root": {
                  fontSize: Common.labelSize
                }
              }
            }
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                background: Light.bg,
                ".Mui-focused": {
                  color: Light.text,
                  background: Light.bg
                }
              }
            }
          },
          MuiTable: {
            styleOverrides: {
              root: {
                th: {
                  color: Light.text,
                  border: `1px solid ${Light.line}`,
                  background: Light.color
                },
                td: {
                  color: Light.text,
                  border: `1px solid ${Light.line}`,
                  background: "rgba(0,0,0,0.02)"
                }
              }
            }
          },
          MuiPaginationItem: {
            styleOverrides: {
              root: {
                ":hover": {
                  background: Light.hover
                }
              }
            }
          },
          MuiPickersDay: {
            styleOverrides: {
              root: {
                "&.Mui-selected": {
                  "&:hover": {
                    backgroundColor: Light.active
                  },
                  "&:focus": {
                    backgroundColor: Light.active
                  }
                }
              }
            }
          }
        }
      : {
          // Dark
          MuiButton: {
            styleOverrides: {
              root: {
                ...Common.MuiButtonLayout,
                color: Dark.text,
                ":hover": {
                  background: Dark.hover
                }
              },
              outlined: {
                border: `1px solid ${Dark.line}`,
                ":hover": {
                  background: Dark.color,
                  border: `1px solid ${Dark.line}`
                }
              }
            }
          },

          MuiToggleButton: {
            styleOverrides: {
              root: {
                color: Dark.text,
                width: "100%",
                "&.Mui-selected": {
                  backgroundColor: Dark.active,
                  color: Dark.text,
                  ":hover": {
                    background: Dark.hover
                  }
                },
                ":hover": {
                  background: Dark.hover
                },
                ":active": {
                  background: Dark.hover
                },
                "&.Mui-disabled": {
                  background: "rgba(255,255,255,0.1)"
                }
              }
            }
          },
          MuiInput: {
            styleOverrides: {
              root: {
                minWidth: Common.inputMinSize,
                fontSize: Common.inputFontSize,
                ":after": {
                  borderColor: Dark.line
                }
              }
            }
          },
          MuiFormControlLabel: {
            styleOverrides: {
              root: {
                ".MuiTypography-root": {
                  fontSize: Common.labelSize
                }
              }
            }
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                "&.Mui-focused": {
                  color: Dark.text,
                  background: Dark.bg,
                  padding: " 0 15px 0 10px"
                }
              }
            }
          },
          MuiTable: {
            styleOverrides: {
              root: {
                th: {
                  color: Dark.text,
                  border: `1px solid ${Dark.line}`,
                  background: Dark.color
                },
                td: {
                  color: Dark.text,
                  border: `1px solid ${Dark.line}`
                }
              }
            }
          },
          MuiPaginationItem: {
            styleOverrides: {
              root: {
                ":hover": {
                  background: "rgba(255,255,255,0.1)"
                }
              }
            }
          },
          MuiPickersDay: {
            styleOverrides: {
              root: {
                "&.Mui-selected": {
                  "&:hover": {
                    backgroundColor: Dark.active
                  },
                  "&:focus": {
                    backgroundColor: Dark.active
                  }
                }
              }
            }
          }
        })
  }
});
