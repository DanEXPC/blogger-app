import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { TransformService } from '../services/transform.service'

export class PostsComponent extends Component {
    constructor(id) {
        super(id)
    }

    async onShow() {
        const data = await apiService.fetchPosts()
        const posts = TransformService.fbObjectToArray(data)
        console.log(posts)
    } 
}