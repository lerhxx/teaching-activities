export default {
    // 设置页脚信息
    SET_FOOTER_LINKS(state, links) {
        state.footerLinks = links;
    },
    // 设置首页文章类型
    SET_TYPE_LISTS(state, lists) {
        state.typesLists = lists;
    },
    // 设置首页学院信息
    SET_ACADEMY_LISTS(state, lists) {
        state.academyList = lists;
    },
    // 设置首页教研室类型
    SET_FACULTIES(state, lists) {
        state.facultiesList = lists;
    },
    // 设置文章详情
    SET_ARTICLE(state, article) {
        state.article = article;
    },
    // 设置个人发布文章
    SET_SELF_ARTICLES(state, articles) {
        state.selfArticles = articles;
    },
    // 设置所有文章
    SET_ARTICLES(state, info) {
        state.articles = info.lists;
        state.articleTotal = info.total
    },
    // 设置当前用户个人信息
    SET_USER(state, info) {
        state.userId = info.id;
        state.userRank = info.rank;
        state.userFaculty = info.faculty;
    },
    // 登出，清楚用户信息
    CLEAN_USER(state) {
        state.userId = '';
        state.userRank = '';
        state.userFaculty = '';
    },
    // 更新个人发布文章列表
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
    // 设置用户信息
    SET_USERS(state, info) {
        state.users = info;
        // console.log(info)
    }
}