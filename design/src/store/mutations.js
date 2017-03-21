export default {
    SET_FOOTER_LINKS(state, links) {
        state.footerLinks = links;
    },
    SET_TYPE_LISTS(state, lists) {
        state.typesLists = lists;
    },
    SET_ACADEMY_LISTS(state, lists) {
        state.academyList = lists;
    },
    SET_FACULTIES(state, lists) {
        state.facultiesList = lists;
    },
    SET_ARTICLES(state, lists) {
        console.log(lists.length)
        state.noMoreArticle = lists.length === 0;
        state.articles = lists;
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
        // console.log(info)
    }
}