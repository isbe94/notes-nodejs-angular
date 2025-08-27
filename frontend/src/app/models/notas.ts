export class Notas {

    constructor(_id='',title='',description=''){
        this._id = _id;
        this.title = title;
        this.description = description;
    }

    _id: String;
    title: String;
    description: String;
}
