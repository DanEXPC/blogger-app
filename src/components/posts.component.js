import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { TransformService } from '../services/transform.service'
import { renderPost } from '../templates/post.template' 

export class PostsComponent extends Component {
    constructor(id, {loader}) {
        super(id)
        this.loader = loader
    }

    init() {
        this.$element.addEventListener('click', buttonHandler.bind(this))
    }

    async onShow() {
        this.loader.show()
        const data = await apiService.fetchPosts()
        const posts = TransformService.fbObjectToArray(data)
        const html = posts.map(post => renderPost(post, {withButton : true}))
        this.loader.hide()
        this.$element.insertAdjacentHTML('afterbegin', html.join(' '))
    }
    
    onHide() {
        this.$element.innerHTML = ''
    }
}

function buttonHandler(event) {
    const $element = event.target
    const id = $element.dataset.id
    const title = $element.dataset.title

    if (id) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []
        const candidate = favorites.find(post => post.id === id)

        if (candidate) {
            $element.textContent = 'Сохранить'
            $element.classList.add('button-primary')
            $element.classList.remove('button-danger')
            favorites = favorites.filter(post => post.id !== id)
        } else {
            $element.textContent = 'Удалить'
            $element.classList.remove('button-primary')
            $element.classList.add('button-danger')
            favorites.push({id, title})
        }

        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}