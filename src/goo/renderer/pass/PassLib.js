define([
	'goo/renderer/shaders/ShaderLib',
	'goo/renderer/pass/FullscreenPass',
	'goo/renderer/pass/BloomPass',
	'goo/renderer/pass/BlurPass',
	'goo/renderer/pass/SSAOPass',
	'goo/renderer/Util'
], function(
	ShaderLib,
	FullscreenPass,
	BloomPass,
	BlurPass,
	SSAOPass,
	Util
) {
	'use strict';
	var PassLib = {};

	PassLib.Bloom = (function() {
		var pass;
		return {
			create: function() {
				return pass = new BloomPass();
			},
			update: function(config) {
				var options = config.options || {};
				if (options.opacity !== undefined) {
					pass.copyMaterial.uniforms.opacity = options.opacity / 100;
				}
				if (options.size !== undefined) {
					pass.convolutionMaterial.uniforms.size = options.size;
				}
				if (options.brightness !== undefined) {
					pass.bcMaterial.uniforms.brightness = options.brightness / 100;
				}
				if (options.contrast !== undefined) {
					pass.bcMaterial.uniforms.contrast = options.contrast / 100;
				}
				if (config.enabled !== undefined) {
					pass.enabled = config.enabled;
				}
			},
			get: function() {
				return pass;
			},
			options: [
				{
					key: 'opacity',
					name: 'Opacity',
					type: 'int',
					control: 'slider',
					min: 0,
					max: 100,
					'default': 100
				},
				{
					key: 'size',
					name: 'Size',
					type: 'float',
					control: 'slider',
					min: 0,
					max: 10,
					decimals: 1,
					'default': 2
				},
				{
					key: 'brightness',
					name: 'Gain',
					type: 'int',
					control: 'slider',
					min: -100,
					max: 100,
					'default': 0
				},
				{
					key: 'contrast',
					name: 'Intensity',
					type: 'int',
					control: 'slider',
					min: -100,
					max: 100,
					'default': 0
				}
			]
		};
	}());
	PassLib.Vignette = (function() {
		var shader, pass;
		return {
			create: function() {
				shader = Util.clone(ShaderLib.vignette);
				return pass = new FullscreenPass(shader);
			},
			update: function(config) {
				var options = config.options;
				if(options.offset !== undefined) {
					shader.uniforms.offset = options.offset;
				}
				if(options.darkness !== undefined) {
					shader.uniforms.darkness = options.darkness;
				}
				if (config.enabled !== undefined) {
					pass.enabled = config.enabled;
				}
			},
			get: function() {
				return pass;
			},
			options: [
				{
					key: 'offset',
					type: 'float',
					control: 'slider',
					name: 'Offset',
					min: 0,
					max: 10,
					decimals: 1,
					'default': 1
				},
				{
					key: 'darkness',
					type: 'float',
					control: 'slider',
					name: 'Darkness',
					min: 0,
					max: 2,
					decimals: 2,
					'default': 1.5
				}
			]
		};
	}());
	PassLib.Sepia = (function() {
		var pass;
		return {
			create: function() {
				return pass = new FullscreenPass(Util.clone(ShaderLib.sepia));
			},
			update: function(config) {
				var options = config.options;
				if(options.amount !== undefined) {
					pass.material.uniforms.amount = options.amount / 100;
				}
				if (config.enabled !== undefined) {
					pass.enabled = config.enabled;
				}
			},
			get: function() {
				return pass;
			},
			options: [
				{
					key: 'amount',
					name: 'Amount',
					type: 'int',
					control: 'slider',
					min: 0,
					max: 100,
					'default': 100
				}
			]
		};
	}());
	PassLib.Grain = (function() {
		var shader, pass;
		return {
			name: 'Film Grain',
			create: function() {
				shader = Util.clone(ShaderLib.film);
				return pass = new FullscreenPass(shader);
			},
			update: function(config) {
				var options = config.options;
				if(options.nIntensity !== undefined) {
					shader.uniforms.nIntensity = options.nIntensity / 100;
				}
				if (options.sIntensity !== undefined) {
					shader.uniforms.sIntensity = options.sIntensity / 100;
				}
				if (options.sCount !== undefined) {
					shader.uniforms.sCount = options.sCount;
				}
				if (config.enabled !== undefined) {
					pass.enabled = config.enabled;
				}
			},
			get: function() {
				return pass;
			},
			options: [
				{
					key: 'nIntensity',
					type: 'int',
					control: 'slider',
					name: 'Noise',
					min: 0,
					max: 100,
					'default': 50
				},
				{
					key: 'sIntensity',
					type: 'int',
					control: 'slider',
					name: "Line Intensity",
					min: 0,
					max: 100,
					'default': 50
				},
				{
					key: 'sCount',
					type: 'int',
					control: 'slider',
					name: "Line Count",
					min: 1,
					max: 4096,
					'default': 1024
				}
			]
		};
	}());
	PassLib.Noise = (function() {
		var shader, pass;
		return {
			create: function() {
				shader = Util.clone(ShaderLib.noise);
				return pass = new FullscreenPass(shader);
			},
			update: function(config) {
				var options = config.options;
				if(options.nIntensity !== undefined) {
					shader.uniforms.nIntensity = options.nIntensity / 100;
				}
				if (config.enabled !== undefined) {
					pass.enabled = config.enabled;
				}
			},
			get: function() {
				return pass;
			},
			options: [
				{
					key: 'nIntensity',
					type: 'int',
					control: 'slider',
					name: 'Noise',
					min: 0,
					max: 100,
					'default': 50
				}
			]
		};
	}());
	PassLib.RgbShift = (function() {
		var shader, pass;
		return {
			create: function() {
				shader = Util.clone(ShaderLib.rgbshift);
				return pass = new FullscreenPass(shader);
			},
			update: function(config) {
				var options = config.options;
				if(options.amount !== undefined) {
					shader.uniforms.amount = options.amount;
				}
				if(options.angle !== undefined) {
					shader.uniforms.angle = options.angle;
				}
				if (config.enabled !== undefined) {
					pass.enabled = config.enabled;
				}
			},
			get: function() {
				return pass;
			},
			options: [
				{
					key: 'amount',
					type: 'float',
					control: 'slider',
					name: 'Amount',
					min: 0,
					max: 0.05,
					decimals: 3,
					'default': 0.005
				},
				{
					key: 'angle',
					type: 'float',
					control: 'slider',
					name: 'Angle',
					min: 0,
					max: 6.28,
					decimals: 1,
					'default': 0
				}
			]
		};
	}());
	PassLib.Bleach = (function() {
		var shader, pass;
		return {
			create: function() {
				shader = Util.clone(ShaderLib.bleachbypass);
				return pass = new FullscreenPass(shader);
			},
			update: function(config) {
				var options = config.options;
				if(options.opacity !== undefined) {
					shader.uniforms.opacity = options.opacity;
				}
				if (config.enabled !== undefined) {
					pass.enabled = config.enabled;
				}
			},
			get: function() {
				return pass;
			},
			options: [
				{
					key: 'opacity',
					type: 'float',
					control: 'slider',
					name: 'Opacity',
					min: 0,
					max: 1,
					decimals: 2,
					'default': 1
				}
			]
		};
	}());
	PassLib.HSB = (function() {
		var shader, pass;
		return {
			create: function() {
				shader = Util.clone(ShaderLib.hsb);
				return pass = new FullscreenPass(shader);
			},
			update: function(config) {
				var options = config.options;
				if(options.hue !== undefined) {
					shader.uniforms.hue = options.hue;
				}
				if(options.saturation !== undefined) {
					shader.uniforms.saturation = options.saturation;
				}
				if(options.brightness !== undefined) {
					shader.uniforms.brightness = options.brightness;
				}
				if (config.enabled !== undefined) {
					pass.enabled = config.enabled;
				}
			},
			get: function() {
				return pass;
			},
			options: [
				{
					key: 'hue',
					type: 'float',
					control: 'slider',
					name: 'Hue',
					min: -1,
					max: 1,
					decimals: 2,
					'default': 0
				},
				{
					key: 'saturation',
					type: 'float',
					control: 'slider',
					name: 'Saturation',
					min: -1,
					max: 1,
					decimals: 2,
					'default': 0
				},
				{
					key: 'brightness',
					type: 'float',
					control: 'slider',
					name: 'Brightness',
					min: -1,
					max: 1,
					decimals: 2,
					'default': 0
				}
			]
		};
	}());
	PassLib.Colorify = (function() {
		var shader, pass;
		return {
			name: 'Tint',
			create: function() {
				shader = Util.clone(ShaderLib.colorify);
				return pass = new FullscreenPass(shader);
			},
			update: function(config) {
				var options = config.options;
				if(options.color !== undefined) {
					shader.uniforms.color = options.color;
				}
				if(options.amount !== undefined) {
					shader.uniforms.amount = options.amount;
				}
				if (config.enabled !== undefined) {
					pass.enabled = config.enabled;
				}
			},
			get: function() {
				return pass;
			},
			options: [
				{
					key: 'color',
					type: 'color',
					name: 'Color',
					'default': [1.0, 1.0, 1.0]
				},
				{
					key: 'amount',
					type: 'float',
					control: 'slider',
					name: 'Amount',
					min: 0,
					max: 1,
					decimals: 2,
					'default': 1
				}
			]
		};
	}());
	PassLib.Hatch = (function() {
		var shader, pass;
		return {
			name: 'CrossHatch',
			create: function() {
				shader = Util.clone(ShaderLib.hatch);
				return pass = new FullscreenPass(shader);
			},
			update: function(config) {
				var options = config.options;
				if(options.width !== undefined) {
					shader.uniforms.width = options.width;
				}
				if(options.spread !== undefined) {
					shader.uniforms.spread = options.spread;
				}
				if (config.enabled !== undefined) {
					pass.enabled = config.enabled;
				}
			},
			get: function() {
				return pass;
			},
			options: [
				{
					key: 'width',
					type: 'float',
					control: 'slider',
					name: 'Width',
					min: 0,
					max: 10,
					decimals: 1,
					'default': 2
				},
				{
					key: 'spread',
					type: 'int',
					control: 'slider',
					name: 'Spread',
					min: 1,
					max: 50,
					'default': 8
				}
			]
		};
	}());
	PassLib.Dot = (function() {
		var shader, pass;
		return {
			name: 'DotScreen',
			create: function() {
				shader = Util.clone(ShaderLib.dotscreen);
				return pass = new FullscreenPass(shader);
			},
			update: function(config) {
				var options = config.options;
				if(options.angle !== undefined) {
					shader.uniforms.angle = options.angle;
				}
				if(options.scale !== undefined) {
					shader.uniforms.scale = options.scale;
				}
				if(options.sizex !== undefined) {
					shader.uniforms.tSize[0] = options.sizex;
				}
				if(options.sizey !== undefined) {
					shader.uniforms.tSize[1] = options.sizey;
				}
				if (config.enabled !== undefined) {
					pass.enabled = config.enabled;
				}
			},
			get: function() {
				return pass;
			},
			options: [
				{
					key: 'angle',
					type: 'float',
					control: 'slider',
					name: 'Angle',
					min: 0,
					max: 10,
					decimals: 2,
					'default': 1.57
				},
				{
					key: 'scale',
					type: 'float',
					control: 'slider',
					name: 'Scale',
					min: 0,
					max: 10,
					decimals: 2,
					'default': 1
				},
				{
					key: 'sizex',
					type: 'int',
					control: 'slider',
					name: 'SizeX',
					min: 0,
					max: 1024,
					'default': 256
				},
				{
					key: 'sizey',
					type: 'int',
					control: 'slider',
					name: 'SizeY',
					min: 0,
					max: 1024,
					'default': 256
				}
			]
		};
	}());
	PassLib.Contrast = (function() {
		var shader, pass;
		return {
			create: function() {
				shader = Util.clone(ShaderLib.brightnesscontrast);
				return pass = new FullscreenPass(shader);
			},
			update: function(config) {
				var options = config.options;
				if(options.brightness !== undefined) {
					shader.uniforms.brightness = options.brightness;
				}
				if(options.contrast !== undefined) {
					shader.uniforms.contrast = options.contrast;
				}
				if(options.saturation !== undefined) {
					shader.uniforms.saturation = options.saturation;
				}
				if (config.enabled !== undefined) {
					pass.enabled = config.enabled;
				}
			},
			get: function() {
				return pass;
			},
			options: [
				{
					key: 'brightness',
					type: 'float',
					control: 'slider',
					name: 'Brightness',
					min: -1,
					max: 1,
					decimals: 2,
					'default': 0
				},
				{
					key: 'contrast',
					type: 'float',
					control: 'slider',
					name: 'Contrast',
					min: 0,
					max: 1,
					'default': 0
				},
				{
					key: 'saturation',
					type: 'float',
					control: 'slider',
					name: 'Saturation',
					min: -1,
					max: 1,
					decimals: 2,
					'default': 0
				}
			]
		};
	}());

	return PassLib;
});