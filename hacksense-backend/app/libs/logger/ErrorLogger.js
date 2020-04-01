const fs = require('fs');

const availableLogger = {
  fileLogger: function(errorLogPath) {
    return function(errorLogMessage) {
      fs.writeFile(errorLogPath, errorLogMessage, failure => {
        if (failure) {
          /* eslint-disable no-console */
          console.log(failure);
          /* eslint-enable no-console */
        }
      });
    };
  },
  stdoutLogger: function() {
    return function(errorLogMessage) {
      /* eslint-disable no-console */
      console.log(errorLogMessage);
      /* eslint-enable no-console */
    };
  }
};

class ErrorLogger {
  constructor(errorLogPath) {
    if (errorLogPath == null) {
      this._logger = availableLogger.stdoutLogger();
    } else {
      this._logger = availableLogger.fileLogger(errorLogPath);
    }
  }

  log(message) {
    this._logger(message);
  }
}

module.exports = ErrorLogger;
