export default {
    SET_FOOTER_LINKS(state, links) {
        state.footerLinks = links;
    },
    SET_SEARCH_LISTS(state, lists) {
        state.searchLists = lists;
    },
    SET_ARTICLES(state, lists) {
        state.articles = lists;
    },
    SET_ARTICLE(state, article) {
        state.article = article;
    },
    SET_USER(state, info) {
        state.userId = info.id;
        state.userRank = info.rank;
    },
    SET_SELF_ARTICLES(state, articles) {
        state.selfArticles = articles;
    },
    UPDATE_SELF_ARTICLES(state) {
        state.selfArticles.shift();
    },
    SET_EDITINT_MODE(state, mode) {
        state.isEdit = mode;
    }
}