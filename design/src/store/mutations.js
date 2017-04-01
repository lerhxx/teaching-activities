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
    SET_ARTICLES(state, info) {
        state.articles = info.lists;
        state.articleTotal = info.total
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
    UPDATE_SELF_ARTICLES(state, id) {
        let len = state.selfArticles.length,
            i = 0;
        for(; i < len; ++i) {
            if(state.selfArticles[i]._id === id){
                state.selfArticles.splice(i, 1);
                break;
            }
        }
    },
    SET_EDITINT_MODE(state, mode) {
        state.isEdit = mode;
    },
    SET_USERS(state, info) {
        state.users = info;
        // console.log(info)
    }
}