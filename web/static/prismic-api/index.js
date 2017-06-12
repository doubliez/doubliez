import Prismic from 'prismic.io';
import PrismicConfig from 'prismic-config';
import Cookies from 'js-cookie';

export default class PrismicApi {
    static async initialize() {
        const accessToken = PrismicConfig.accessToken;
        const api = await Prismic.api(
            PrismicConfig.apiEndpoint, { accessToken });

        return new PrismicApi({
            api,
            endpoint: PrismicConfig.apiEndpoint,
            accessToken,
            linkResolver: PrismicConfig.linkResolver
        });
    }

    constructor(opts) {
        Object.assign(this, opts);
    }

    getPostById(id) {
        return this.api.getByUID('blog_post', id);
    }

    getPosts() {
        return this.api.query(
            Prismic.Predicates.at('document.type', 'blog_post'),
            { orderings : '[my.blog_post.date desc]' }
        );
    }

    async preview(token) {
        const url = await this.api.previewSession(token, this.linkResolver, '/');
        Cookies.set(Prismic.previewCookie, token);
        return url;
    }
}
