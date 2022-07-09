# The Hard Parts of Object Oriented JavaScript

### oop -and enormously popular paradigm for structuring our complex code

    -- easy to add features and functionality 
    -- easy for us and others developers to reason about (clear structure)
    -- performant (efficient in terms of memory)
    we need to organize our code as it gets more complex
    so it's not just endless series of commands

### let's suppose we're building a quiz game with users
    
    some of our uses 
    name: phil
    score: 4
    
    name: julia
    score: 5

    functionality   
    + ability to increase score
    
    what would be the best way to store this data and 
    functionality ?

### objects - store functions with their associated data!

    const user1 = {
    name: phil,
    score: 4,
    increament: function(){
        user.score++;
        }
    }
    user1.increament();
    this is the principle of encapsulation.
    let's keep creating our object 

### note we would in reality have a lot different relevant functionality for our user object 
    -- ability to increase score
    -- ability to decrease score 
    -- delete user
    -- log in user 
    -- log out user 
    -- add avatar 
    -- get user score
    -- (100s more applicable function)

### creating user2 'dot notation'

    const user2 = {}
    user2.name = "Julia";
    user2.score = 5;
    user2.increment = function (){
        user2.score++;
    }

### creating user3 using Object.create

    const user3 = Object.create(null);
    user3.name = "Eva";
    user3.score = 9;
    user3.increament = function(){
        user3.score++;
    }
    our code is getting repetitive, we're breaking DRY principle
    and suppose we have millions of users!
    what could we do ? 

### solution 1 generate objects using fucntion 
    
    function userCreator(name, score){
        const newUser={}
        newUser.name=name;
        newUser.score=score;
        newUser.increment = function(){
            newUser.score++;
        };
        return newUSer;
    }
    const user1 = userCreator("Phil", 4);
    const user2 = userCreator("julia", 5);
    user1.increment()
    what makes this approach untenable ?
    => increment method is stored individually on each object 
    
    problem:
    
    each time we create a new user we make space in our computer's memory 
    for all our data and functions. But our functions are just copies 
    is there a better way ?
    
    benifits:
        
    it's simple and easy to reason about!
    
### solution 2:
    store the increment function in just one object and have the interpreter, if
    it doesn't find the function on user1, look up to that object to check if it's there 
    
    how to make this link ?

### using the prototype chain 
    
    const functionStore = {
    increment: function () { this.score++; }
    login: function(){ console.log("You're loggedin")}
    
    };
    const user1 = { 
        name:"Phil",
        score:4,
    }

    user1.name // name is a property of user1 object 
    user1.increment // Error! incfement is not!

    link user! and functionStore so the interpreter, on not finding .increment,
    makes sure to check up in functionStore where it would find it 

    
### solution 2 in full 
    
    function userCreator(name, score){
        const newUser= Object.create(userFunctionStore);
        newUser.name=name;
        newUser.score=score;
        return newUser;
        };
    const userFunctionStore = { 
        increment: function () { this.score++; }
        login: function(){ console.log("You're loggedin")}
    };
    
    const user1 = userCreator("Phil", 4);
    const user2 = userCreator("julia", 5);
    user1.increment()
    
    problem:
    
    no problems! it's beautiful 
    maybe a little long-winded 
    const newUser = Object.create(functionStore);
    ...
    return newUser;
    write this every single time - but it's 6 words!
    super sophisticated but not standard 

### solution 3 introducing the keyword that automates the hard work: new 
    
    const user1 = new userCreator("Phil", 4);

    when we call the constructor function with new in front we automate 3 things 
    
    1. create a new user object // this 
    2. sets the __proto__ bond 
    3. return the new user object 
    

    but now we need to adjust how we write the body of userCreator how can we:
        -- refer to the auto-created object ?
        -- know where to put our single copies of function ?

### interlude functions are both objects and functions:/

    function multiplyBy2(num){
    return num*2;
    }
    multiplyBy2.stored=5;
    console.log(multiplyBy2(3)); // 6

    console.log(multiplyBy2.stored) ;// 5
    console.log(multiplyBy2.prototype) // {}

    we could use the fact that all functions have a default property 
    on their object version, 'prototype', which is itself an object - to 
    replace our functionStore object 
    
### complete solution 3 
    
    function UserCreator(name, score){ 
        this.name=name;
        this.score=score;
    }
    
    UserCreator.prototype.increment = function() {
        this.score++;
    }

    UserCreator.prototype.login = function (){  
        console.log("login");
    }

    const user1 = new UserCreator("Eva", 9)

    user1.increment()
    
    benifits
        -- faster to write 
        -- still typical practice in professional code 

### what if we have to organize our code inside one of our shared functions - perhaps by defining a new inner function 
    
        
    function UserCreator(name, score){ 
        this.name=name;
        this.score=score;
    }
    
    UserCreator.prototype.increment = function() {
        function add1(){    // func dec 
             this.score++;
        }
      //  const add1 = function() {this.score++;} // func exp
        add1();
   
    }

    UserCreator.prototype.login = function (){  
        console.log("login");
    }

    const user1 = new UserCreator("Eva", 9)

    user1.increment()
    

### we need to introduce arrow functions - which bind this lexically 
    
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
    
    ### solving scope with arrow function  
    instead we get a new way of declaring the add1 function such that when it's called 
    it's this assignment is automatically what's called static or lexically scoped 
    that means it's going to automatically refer to the this from where it was born 
    this will be same where the function was saved 
    

### biggest gotcha in oop 
    
    calling functions inside a method and it refering to nothing that we wanted, (window/global object)
    the this being miss assigned 

### solving scope with arrow function

    the this inside of its execution context is going to refer to whatever the this 
    was when it was defined 
    in other words arrow function says my this will be what it was when i was defined 
    lexical static scoping mean where i was born, where i'm saved 
    determines something about me when i get called , well what is the thing ?
    it's what my this assignment is 
    

    
### solution 4 

    we're writing our shared methods seperately from our object 'constructor'
    itself (off in the User.prototype object )
    
    other languages let us do this all in one place . ES2015 lets us do so 


### the class 'syntactic sugar'

    //////////////////////////////////////////////////////////////////
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
    //////////////////////////////////////////////////////////////////
  

     function UserCreator(name, score){ 
        this.name=name;
        this.score=score;
    }
    
    UserCreator.prototype.increment = function() {
        this.score++;
    }

    UserCreator.prototype.login = function (){  
        console.log("login");
    }

    const user1 = new UserCreator("Eva", 9)

    user1.increment()

    //////////////////////////////////////////////////////////////////
    
    same thing under the hood 
    
    benifits 
    -- emerging as a new standard 
    -- feels more like style of other languages (e.g. java, python)

    problem 
    -- 99% of developers have no idea how it works and therefore fail interviews
    
### javaScript uses this __proto__ link to give objects, functions and arrays a bunch of bonus functionality. all objects by default __proto__
    
    const obj = {
        num:3
    }
    obj.num // 3
    obj.hasOwnProperty("num") // ? where's this method 
    Object.prototype // {hasOwnProperty: FUNCTION}

    --  with Object.create we override the default __proto__ reference to 
        Object.prototype and replace with functionStore
    --  But functionStore is an object so it has a __proto__ reference to 
        Object.prototype- we just intercede in the chain 

### arrays and functions are also objects so they get access to all the functions in the Object.prototype but also more goodies 
    function multuplyBy2(num){
        return num*2;
    }

    multiplyBy2.toString() // where is this method ?
    Function.prototype // {toString: FUNCTION, call: FUNCTION, bind : FUNCTION}
    multiplyBy2.hasOwnProperty("score") // where's this function ?
    Function.prototype.__proto__ // Object.prototype {hasOwnProperty: FUNCTION}
    
    core diagrammed version of what is the most like intricate, fincky parts of javascript 




