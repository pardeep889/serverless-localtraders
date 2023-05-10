// console.log("start");

try {
    // abc
//  console.log("I am in try")
    setTimeout(() => {
        console.log("in timeout", abc)
    }, 3000)

} catch (error) {
    console.log(error)
    console.log("I am in error")
}



// console.log("out")