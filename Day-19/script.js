function Parent() {}
Parent.prototype.say = function() {
  console.log(this.name);
};

const a = { name: "Alice", __proto__: Parent.prototype };
const b = { name: "Bob",   __proto__: Parent.prototype };

a.say(); // ?
b.say(); // ?