define([
	'goo/entities/systems/System',
	'goo/renderer/bounds/BoundingBox'
],
/** @lends */
function (
	System,
	BoundingBox
) {
	"use strict";

	/**
	 * @class Calculates and updates all boundings on entities with both transform, meshrenderer and meshdata components
	 */
	function BoundingUpdateSystem () {
		System.call(this, 'BoundingUpdateSystem', ['TransformComponent', 'MeshRendererComponent', 'MeshDataComponent']);
		this._worldBound = new BoundingBox();
		this._computeWorldBound = null;
	}

	BoundingUpdateSystem.prototype = Object.create(System.prototype);

	BoundingUpdateSystem.prototype.process = function (entities) {
		for (var i = 0; i < entities.length; i++) {
			var entity = entities[i];
			var meshDataComponent = entity.meshDataComponent;
			var transformComponent = entity.transformComponent;
			var meshRendererComponent = entity.meshRendererComponent;

			if (meshDataComponent.autoCompute) {
				meshDataComponent.computeBoundFromPoints();
				meshRendererComponent.updateBounds(meshDataComponent.modelBound, transformComponent.worldTransform);
			} else if (transformComponent._updated) {
				meshRendererComponent.updateBounds(meshDataComponent.modelBound, transformComponent.worldTransform);
				// meshDataComponent.setDirty(false);
			}
		}
		if (this._computeWorldBound && this._computeWorldBound instanceof Function) {
			for (var i = 0; i < entities.length; i++) {
				var mrc = entities[i].meshRendererComponent;
				if (i === 0) {
					mrc.worldBound.clone(this._worldBound);
				} else {
					this._worldBound = this._worldBound.merge(mrc.worldBound);
				}
			}
			this._computeWorldBound(this._worldBound);
			this._computeWorldBound = null;
		}
	};

	BoundingUpdateSystem.prototype.getWorldBound = function (callback) {
		this._computeWorldBound = callback;
	};

	return BoundingUpdateSystem;
});