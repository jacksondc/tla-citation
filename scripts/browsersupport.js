//Add functions to facilitate cross-browser support, especially for experimental javascript features

//Add endsWith support to browsers without support
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
};
