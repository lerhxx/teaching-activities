export default {
    SET_FOOTER_LINKS(state, links) {
        state.footerLinks = links;
    },
    SET_SEARCH_LISTS(state, lists) {
        state.searchLists = lists;
    },
    SET_ARTICLES(state, lists) {
        let now = new Date().getTime();
        state.notHoldArticles = [];
        state.holdArticles = [];
        lists.forEach(function(value) {
            new Date(value.endTime).getTime() > now ? state.notHoldArticles.push(value) : state.heldArticles.push(value);
        })
    },
    SET_ARTICLE(state, article) {
        state.article = article;
    },
    SET_USER(state, info) {
        state.userId = info.id;
        state.userRank = info.rank;
        state.userFaculty = info.faculty;
    },
    SET_SELF_ARTICLES(state, articles) {
        state.selfArticles = articles;
    },
    UPDATE_SELF_ARTICLES(state) {
        state.selfArticles.shift();
    },
    SET_EDITINT_MODE(state, mode) {
        state.isEdit = mode;
    },
    SET_USERS(state, info) {
        state.users = info;
        console.log(info)
    }
}