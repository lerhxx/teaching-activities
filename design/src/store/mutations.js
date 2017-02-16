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
    }
}