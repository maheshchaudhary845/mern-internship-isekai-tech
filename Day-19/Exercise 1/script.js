class Person {
    constructor(name, age, gender) {
        this.name = name;
        this.gender = gender;
        this.age = age;
    }

}

class Teacher extends Person {
    constructor(name, age, gender) {
        super(name, age, gender);
    }
    setSubjects(...arr) {
        this.subjects = arr;
    }
    getSubjects() {
        return this.subjects;
    }

    setMarks(stuObject, marksArray) {
        let marksObj = {};
        for (let i = 0; i < marksArray.length; i++) {
            let subjectName = marksArray[i];
            let value = prompt("Enter marks of " + stuObject.name + " in " + subjectName);
            marksObj[subjectName] = value;
        }
        stuObject.marks = marksObj;
    }
    getMarks(stuObject) {
        return stuObject.marks;
    }
}

class Student extends Person {
    constructor(name, age, gender) {
        super(name, age, gender);
        this.marks = {};
    }

    getMarks() {
        return this.marks;
    }

    getResult(subjectsArr){
        let totalMarks = 0;
        let totalOutOfMarks = subjectsArr.length * 100;
        for(let i=0; i<subjectsArr.length; i++){
            totalMarks += Number(this.marks[subjectsArr[i]]);
        }
        let result = (totalMarks/totalOutOfMarks) * 100;
        return result; 
    }
}
let subjects = ["English", "Hindi", "Mathematics", "Science", "Social Studies"];
const tobj = new Teacher("Anjali", 29, "F");
const tobj2 = new Teacher("Danish", 39, "M");

const student1 = new Student("Anand", 15, "M");
const student2 = new Student("Daman", 14, "M");

tobj.setSubjects("Maths", "English", "Science");

tobj.setMarks(student1, subjects);
// tobj2.setMarks(student2, subjects);

// console.log(tobj);

console.log(student1);
// console.log(student2);

console.log(tobj.getMarks(student1));

console.log(student1.getResult(subjects));