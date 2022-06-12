function userCreator (name, score){
    const newUser= Object.create(userFunctionStore);
    newUser.name=name;
    newUser.score=score;
    return newUser;
}
const userFunctionStore = {
    increment: function () { this.score++; },
    login: function(){ console.log("You're loggedin");}
};

const user1 = userCreator("Phil", 4);
const user2 = userCreator("julia", 5);
console.log(user1.increment(), user1.score);
console.log(user2.increment(),user2.score)



// ### interlude functions are both objects and functions:/

function multiplyBy2(num){
    return num*2;
}
multiplyBy2.stored=5;
console.log(multiplyBy2(3)); // 6

console.log(multiplyBy2.stored) ;// 5
console.log(multiplyBy2.prototype) // {}
console.log(multiplyBy2.something)  // undefined



// ### complete solution 3

function UserCreator(name, score){
    this.name=name;
    this.score=score;
    console.log(this.__proto__);

}

UserCreator.prototype.increment = function() {
    this.score++;
}

UserCreator.prototype.login = function (){
    console.log("login");
}

const user3 = new UserCreator("Eva", 9)

console.log(user3.increment(),user3.score,);


// why we can't put functions directly in the functions object version

console.log(global);



//### we need to introduce arrow functions - which bind this lexically

function UserCreator(name, score){
    this.name=name;
    this.score=score;
}

UserCreator.prototype.increment = function() {
    const add1 = () => {this.score++;}
    add1();
}

UserCreator.prototype.login = function (){
    console.log("login");
}

const user1 = new UserCreator("Eva", 9)

user1.increment()


// ### the class 'syntactic sugar'

class UserCreator {
    constructor(name, score){
        this.name=name;
        this.score=score;
    }

    increment() {
        this.score++;
    }

    login() {
        console.log("login");
    }
}

const user1 = new UserCreator("Eva", 9)

user1.increment()
