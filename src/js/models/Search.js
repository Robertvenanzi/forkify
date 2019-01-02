import axios from 'axios';

export default class search {
    constructor(query) {
        this.query = query;
    }
    async getResults() {
        const key = '83269883b402452f6077c0f190678bb6';
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
            this.result = res.data.recipes;
            //console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}




