export class Task {
    id: string;
    name: string;
    completed: boolean;

    constructor(id: string, name: string, completed: boolean = false) {
        this.id = id;
        this.name = name;
        this.completed = completed;
    }
}