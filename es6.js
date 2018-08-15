// SPREAD

const arr = [1, 2, 3];
const arr2 = [...arr, 4];
const arr3 = [...arr.filter(num => num !== 2)];

const person1 = {
	name: 'Brad',
	age: 36
};

const person2 = {
	...person1,
	email: 'brad@gmail.com'
};

// DESTRUCTURING
const profile = {
	name: 'John Doe',
	address: {
		street: '40 Main st',
		city: 'Boston'
	},
	hobbies: ['movies', 'music']
};

// taking out from the profile
const { name, address, hobbies } = profile;
console.log(name, address, hobbies);

// CLASSES
class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}

	greet() {
		return `Hello, my name is ${this.name} and i am ${this.age}`;
	}
}
const person1 = new Person('John', 33);
const person2 = new Person('Sara', 23);
console.log(person1.greet());

// SUBCLASSES
class Customer extends Person {
	// inherit the methods
	constructor(name, age, balance) {
		super(name, age);
		this.balance = balance;
	}

	info() {
		return `${this.name} owes $${this.balance}.00`;
	}
}

const customer1 = new Customer('kevin', 23, 300);

// MODULES



