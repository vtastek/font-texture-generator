function PointerValue(value) {
        this.value = value;
        this.subscribers = [];
        this.functionSubscribers = [];
}
PointerValue.prototype.set = function(value) {
    this.value = value;
};
PointerValue.prototype.update = function(value) {
    this.value = value;
    for(let i = 0; i < this.subscribers.length; i++) {
        var subscriber = this.subscribers[i];
        subscriber.update(this.value);
    }
    for(let i = 0; i < this.functionSubscribers.length; i++) {
        var subscriber = this.functionSubscribers[i];
        subscriber(this.value);
    }
};
PointerValue.prototype.subscribeElement = function(element) {
    element.subscribedTo = this;
    this.subscribers.push(element);
};
PointerValue.prototype.subscribeFunction = function(functionSub) {
    this.functionSubscribers.push(functionSub);
};


function EnhancedElement(domElementId) {
    this.domElement = document.getElementById(domElementId);
    this.subscribedTo = null;

    this.domElement.addEventListener("keyup", (value) => {this.changeEvent(value)});
    this.domElement.addEventListener("change", (value) => {this.changeEvent(value)});
    this.domElement.addEventListener("input", (value) => {this.changeEvent(value)});
}
EnhancedElement.prototype.changeEvent = function(value) {
    this.subscribedTo.update(event.target.value);
};
EnhancedElement.prototype.update = function(value) {
    this.domElement.value = value;
};