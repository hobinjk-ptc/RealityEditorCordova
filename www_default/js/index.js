/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        console.log("start waiting");
        var that = this;
        setTimeout(function() {
            console.log("done waiting");
            that.startVuforia();
        }, 10000);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    startVuforia: function() {

        var options = {
          databaseXmlFile: 'PluginTest.xml',
          targetList: [ 'logo', 'iceland', 'canterbury-grass', 'brick-lane' ],
          overlayMessage: 'Point your camera at a test image...',
          vuforiaLicense: 'AXR4Ej//////AAAAAPE7JB2yU0Ftj7q+fCtgyOYbNN+oOTHpHDx3irmM97K+NKsH15AYRO//0Emx7h6EegBcQTV98aRp64/112oqHAZkiV4eQBg+rPI+DWPk2QygpJLCleWRPspX/nKqY9UJOM6ujGMyF3CyGhwU29rkrE5OMIuU27ZE7brguEv+J7Iq4Zqcdur2eRzJl/Y8MogmwxKmciGZ45idEemnwl158jxZwiJY0NnPJeAcFgcB3ME4jwZ9ET1wobSCF3Z/kxft5W91AXQdUPUjRoyFYxuV09QXtXS2Vwe8IjkG51sEgo7hcKeghH0xMx1yMXGQC0+JaEC+dyBEUFafc4cnAnsmWMIqfF+/9bObJuhHQdBw4FJK',
          autostopOnImageFound: false
        };

        navigator.VuforiaPlugin.startVuforia(
          options,
          function(data) {
            // To see exactly what `data` can return, see 'Success callback `data` API' within the plugin's documentation.
            // console.log(data);

            if (data.markersFound) {
                console.log(data.markersFound);
            }
            // else if (data.loaded) {
            //     console.log("Is data loaded?", data.loaded);

            //     navigator.VuforiaPlugin.getProjectionMatrix(
            //         function(data) {
            //             console.log("getProjectionMatrix");
            //             console.log(data);
            //             projectionMatrix = data;
            //         },
            //         function(data) {
            //             alert("Error: " + data);
            //         }
            //     );

            // }
            else if(data.status.imageFound) {
              alert("Image name: "+ data.result.imageName);
            }
            else if (data.status.manuallyClosed) {
              alert("User manually closed Vuforia by pressing back!");
            }
          },
          function(data) {
            alert("Error: " + data);
          }
        );

        // console.log("start waiting");
        // setTimeout(function() {

        //     console.log("waiting done");
        //     navigator.VuforiaPlugin.getProjectionMatrix(
        //         function(data) {
        //             console.log("getProjectionMatrix");
        //             console.log(data);
        //         },
        //         function(data) {
        //             alert("Error: " + data);
        //         }
        //     );

        // }, 2000);



    }
};

var projectionMatrix;

app.initialize();