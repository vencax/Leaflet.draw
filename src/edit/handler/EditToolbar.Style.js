// Color is depended on Jquery and Spectrum.js
// Spectrum was picked for the community support and features with pallets, alpha, touch and multi instance
// This is included for demo only. You should grab the latest version
// of it here: https://github.com/bgrins/spectrum
// Specrum is dependent on jquery but that's cool :P

L.EditToolbar.Styleable = L.Handler.extend({
	statics: {
		TYPE: 'styleable'
	},

	includes: L.Mixin.Events,

	initialize: function (map, options) {
		this._styleable = this; // cache this to target in jquery
		
		L.Handler.prototype.initialize.call(this, map);

		L.Util.setOptions(this, options);
		
		this._map = map;

		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.EditToolbar.Styleable.TYPE;

		this._setColor('#fe57a1', '0.2'); // Set color for all tools on load
        this._setStroke(4);
        this._createControls();
	},

	enable: function () {
	},

    disable: function () {
    },

	addHooks: function () {
		//this.fire('enable');
	},
	
	removeHooks: function () {
	},
	
    _createControls: function () {

        var styleable = this._styleable,
            selectStroke = this._createSelect(10);

        selectStroke.addEventListener('change', function() {
            styleable._setStroke(this.value); 
        });

        $(document).ready(function(){ // initialize after dom creation
            // Color is depended on Jquery and Spectrum.js
            $('.leaflet-draw-edit-styleable').spectrum({
                chooseText: 'Ok',
                color: 'rgba(254,87,161,0.2)', //Hot pink all the things! 
                showAlpha: true,
                showPalette: true,
                palette: [ ],
                change: function(color) {
                    styleable._setColor(color.toHexString(), color.alpha);
                }
            });
            $('.leaflet-draw-edit-styleable').spectrum("container").append(selectStroke);
        });
    },
	_createSelect: function (n) {
        this._select = L.DomUtil.create('div', 'leaflet-draw-layer-edit-styleable-stroke')
        
        var label = L.DomUtil.create('label', 'leaflet-draw-layer-edit-styleable-stroke-label');
        label.textContent = 'Stroke Width:';
        
        
		var select = L.DomUtil.create('select','leaflet-draw-layer-edit-styleable-stroke-select');
		//this._sel.setAttribute('class','');

		for ( var i = 1; n >= i; i++) {
			var opt = L.DomUtil.create("option",'stroke-size-' + i);
			opt.setAttribute('style','font-size: ' + i + 'px');
			opt.value = i
			opt.text = i;
			select.add(opt);
		}
        this._select.appendChild(label);
        this._select.appendChild(select);

		return this._select;
	},

	_setColor: function (color, opacity) {
        // Edit selected item in edit mode
        if (L.previousLayer != null ) {
            L.previousLayer.setStyle({
                color: color,
                opacity: opacity
            });
            L.previousLayer.edited = true;
        }

		// Use global var of toolbar that gets set on L.Control.Draw initialization
		L.toolbarDraw.setDrawingOptions({ 
			polyline: { shapeOptions: { color: color, opacity: opacity } },
			polygon: { shapeOptions: { color: color, fillOpacity: opacity } },
			rectangle: { shapeOptions: { color: color, fillOpacity: opacity } },
			circle: { shapeOptions: { color: color, fillOpacity: opacity } }
		});
	},

	_setStroke: function (weight) {
        // Edit selected item in edit mode
        if (L.previousLayer != null ) {
            L.previousLayer.setStyle({
                weight: weight
            });
            L.previousLayer.edited = true;
        }

		L.toolbarDraw.setDrawingOptions({ 
			polyline: { shapeOptions: { weight: weight } },
			polygon: { shapeOptions: { weight: weight } },
			rectangle: { shapeOptions: { weight: weight } },
			circle: { shapeOptions: { weight: weight } }
		});
	},
});