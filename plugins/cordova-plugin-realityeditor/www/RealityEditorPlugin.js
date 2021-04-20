/**
 * RealityEditorPlugin module, used within our Cordova front-end to both start and stop a Vuforia image recognition session.
 *
 * @type {object}
 */
var RealityEditorPlugin = {
  /**
   * The plugin class to route messages to.
   * @type {string}
   */
  pluginClass: 'RealityEditorPlugin',

  pause: function(res, rej) {
    RealityEditorPlugin.exec(res, rej, 'setPause', []);
  },

  resume: function(res, rej) {
    RealityEditorPlugin.exec(res, rej, 'setResume', []);
  },

  /**
   * Handle an error from one of the plugin methods. If a callback is defined, an error message is passed to it. If not,
   * the error message is logged to the console.
   *
   * @param {string} err A (hopefully) helpful error message.
   * @param {function|null} callback A callback for when an error occurs.
   */
  errorHandler: function(err, callback) {
    if(typeof callback !== 'undefined') {
      callback(err);
    } else {
      console.log('Received error from Vuforia Plugin:');
      console.log(err);
    }
  },

  /**
   * Trigger a method within our native plugin, passing the options we need.
   *
   * @param {function} success A callback to handle successful execution of our native method.
   * @param {function|null} error A callback to handle any errors in the execution of our native method. Can be null.
   * @param {string} method The method we should execute on our native plugin.
   * @param {Array.<string|boolean>} options The options we should pass to our native method. Can be null.
   */
  exec: function(success, error, method, options) {
    cordova.exec(
      // Register the success callback
      success,
      // Register the error callback
      function errorCallback(err) {
        RealityEditorPlugin.errorHandler(err, error);
      },
      // Define what native class to route messages to
      RealityEditorPlugin.pluginClass,
      // Execute this method on the above native class
      method,
      // Provide an array of arguments to the above method
      options
    );
  }
};

module.exports = RealityEditorPlugin;
