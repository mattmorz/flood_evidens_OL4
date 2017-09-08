/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Control.js
 * @requires OpenLayers/Layer/Vector.js
 * @requires OpenLayers/Layer/Grid.js
 */

/**
 * Class: OpenLayers.Control.ExportMap
 * Control to export the map as an image.
 *
 * Inherits from:
 *  - <OpenLayers.Control>
 */
OpenLayers.Control.ExportMap = OpenLayers.Class(OpenLayers.Control, {

    /**
     * Property: type
     * {String} The type of <OpenLayers.Control> -- When added to a
     *     <Control.Panel>, 'type' is used by the panel to determine how to
     *     handle our events.
     */
    type: OpenLayers.Control.TYPE_BUTTON,

    /**
     * Method: trigger
     * Draws all visible canvas layers on a single canvas element.
     *
     * Parameters:
     * canvas - {Canvas} Optional - the canvas on which the layers are drawn.
     *      If no argument is given, a new canvas element is created.
     *
     * Returns:
     * {Canvas}
     */
    trigger: function (canvas) {
        this.setUpCanvas(canvas);

        var layers = this.map.layers;
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];

            if (layer.visibility === false) {
                // if the layer is not shown, we don't want to export it
                continue;
            }

            if (layer instanceof OpenLayers.Layer.Vector) {
                this.exportVectorLayer(layer);
            } else if (layer instanceof OpenLayers.Layer.Grid) {
                this.exportGridLayer(layer);
            } else {
                // can't export this type of layer, skip
            }
        }

        return this.canvas;
    },

    /**
     * Method: setUpCanvas
     * Sets the size of the canvas element. If no argument is given,
     * a new canvas element is created.
     *
     * Parameters:
     * canvas - {Canvas} Optional
     */
    setUpCanvas: function (canvas) {
        if (canvas === undefined) {
            this.canvas = document.createElement("canvas");
        } else {
            this.canvas = canvas;
        }

        this.canvasContext = this.canvas.getContext('2d');

        this.canvas.width = this.map.viewPortDiv.clientWidth;
        this.canvas.height = this.map.viewPortDiv.clientHeight;
    },

    /**
     * Method: exportVectorLayer
     * Draws a vector layer.
     *
     * Parameters:
     * layer - {<OpenLayers.Layer.Vector>} The vector layer to draw.
     */
    exportVectorLayer: function (layer) {
        if (!(layer.renderer instanceof OpenLayers.Renderer.Canvas)) {
            return;
        }

        var canvasRenderer = layer.renderer;
        if (canvasRenderer.canvas !== null) {
            var canvasContext = canvasRenderer.canvas;
            this.drawLayer(canvasContext.canvas);
        }
    },

    /**
     * Method: exportGridLayer
     * Draws a Grid layer.
     *
     * Parameters:
     * layer - {<OpenLayers.Layer.Grid>} The Grid layer to draw.
     */
    exportGridLayer: function (layer) {
        if (layer.useCanvas !== OpenLayers.Layer.Grid.ONECANVASPERLAYER) {
            return;
        }

        if (layer.canvas !== null) {
            this.drawLayer(layer.canvas);
        }
    },

    /**
     * Method: drawLayer
     * Draws a layer's canvas on the export canvas.
     *
     * Parameters:
     * layerCanvas - {Canvas} The canvas to draw.
     */
    drawLayer: function (layerCanvas) {
        this.canvasContext.drawImage(layerCanvas, 0, 0,
            this.canvas.width, this.canvas.height);
        //iExport=0;
        //$('#hide_legend').hide();
        //$('#hide_demo').hide();

        //New Method from StackExchange solution
        //get transform value
        /**var transform=$('.gm-style>div:first>div').css('transform')
         var comp=transform.split(',') //split up the transform matrix
         var mapleft=parseFloat(comp[4]) //get left value
         var maptop=parseFloat(comp[5])  //get top value
         $('.gm-style>div:first>div').css({ //get the map container. not sure if stable
					'transform':'none',
					'left':mapleft,
					'top':maptop,
				  });
         html2canvas($('#map'),
         {
           useCORS: true,
           onrendered: function(canvas)
           {
             //var dataUrl= canvas.toDataURL('image/png');exportedImage
             var element = document.getElementById("exportedImage");
              element.appendChild(canvas)
              //document.body.appendChild(canvas);
             //window.open (dataUrl);
             $('.gm-style>div:first>div').css({
               left:0,
               top:0,
               'transform':transform
             })
           }
         });**/
    },

    CLASS_NAME: "OpenLayers.Control.ExportMap"
});
