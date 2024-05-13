import {format} from "winston";

export const logFilters = {
  sillyFilter: format((info) => {
    return info.level === 'silly' ? info : false;
  }),
  verboseFilter: format((info) => {
    return info.level === 'verbose' ? info : false;
  }),
  debugFilter: format((info) => {
    return info.level === 'debug' ? info : false;
  }),
  infoFilter: format((info) => {
    return info.level === 'info' ? info : false;
  }),
  warnFilter: format((info) => {
    return info.level === 'warn' ? info : false;
  }),
  errorFilter: format((info) => {
    return info.level === 'error' ? info : false;
  })
};
