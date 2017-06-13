import Prismic from 'prismic.io';
import PrismicConfig from 'prismic-config';
import Cookies from 'js-cookie';

import { defer } from 'utils';

const init = Symbol();

export default class PrismicApi
{
    constructor() {
        this[init] = defer();
    }

    async initialize() {
        const accessToken = PrismicConfig.accessToken;

        try {
            const api = await Prismic.api(
                PrismicConfig.apiEndpoint, { accessToken });

            Object.assign(this, {
                api,
                endpoint: PrismicConfig.apiEndpoint,
                accessToken,
                linkResolver: PrismicConfig.linkResolver
            });
        } catch (err) {
            this[init].reject();
        }

        this[init].resolve();
    }

    async getIntro() {
        await this[init].promise;

        return this.api.getSingle('intro');
    }

    async getPostById(id) {
        await this[init].promise;

        return this.api.getByUID('blog_post', id);
    }

    async getPosts() {
        await this[init].promise;

        return this.api.query(
            Prismic.Predicates.at('document.type', 'blog_post'),
            { orderings: '[my.blog_post.date desc]' }
        );
    }

    async preview(token) {
        await this[init].promise;

        const url = await this.api.previewSession(token, this.linkResolver, '/');
        Cookies.set(Prismic.previewCookie, token);
        return url;
    }
}
