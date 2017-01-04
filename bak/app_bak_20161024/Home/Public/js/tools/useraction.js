var ActionHelper = {
    usercode: "",
    user_session:"",
    init: function (options) {
        var that = this;
        if (options) {
            if (options.usercode)
                that.usercode = options.usercode;
            if (options.user_session)
                that.user_session = options.user_session;
        }
    },
    record: function (options) {
        var that = this;
        var usercode = that.usercode;
        var user_session = that.user_session;

        if(options){
            if (options.usercode)
                usercode = options.usercode;
            if (options.user_session)
                user_session = options.user_session;
        }
        var instance = new ActionInstance();
        var newoptions = {};

        newoptions.usercode = usercode;
        newoptions.user_session = user_session;
        newoptions.actionData = options;

        instance.log(newoptions);
    }
}

var ActionInstance = function () {
    this.log = function (options) {
        var usercode = "",user_session = "",websitecode = "";
        var action = "", page = "", detail = "";
        var postdata = null,actionData = null;
        var url = "";

        if (options) {
            if (options.usercode)
                usercode = options.usercode;
            if (options.user_session)
                user_session = options.user_session;
            if (options.actionData) {
                actionData = options.actionData;
                if (actionData.websitecode)
                    websitecode = actionData.websitecode;
                if (actionData.action)
                    action = actionData.action;
                if (actionData.page)
                    page = actionData.page;
                if (actionData.detail)
                    detail = actionData.detail;
            }
        }

        if (usercode == null || usercode == "") {
            if (m_usercode)
                usercode = m_usercode;
            else
                usercode = tp.util.getQueryString('usercode');
        }

        if(user_session == null || user_session == "")
        {
            if (m_user_session)
                user_session = m_user_session;
            else
                user_session = tp.util.getQueryString('user_session');
        }
        
        if (websitecode == null || websitecode == "") {
            if (m_websitecode)
                websitecode = m_websitecode;
            else
                websitecode = tp.util.getQueryString('websitecode');

        }

        //postdata = {};
        //postdata.usercode = usercode;
        //postdata.user_session = user_session;
        actionData = "{'sitecode':'" + websitecode + "','action':'" + action + "','page':'" + page + "','detail':'" + detail + "'}";
        //postdata.actiondata = "{'sitecode':'" + websitecode + "','action':'" + action + "','page':'" + page + "','detail':'" + detail + "'}";
        
        url = config.cbs_action_recordactionlog;

        url = tp.util.appendParam(url, "usercode", usercode);
        url = tp.util.appendParam(url, "user_session", user_session);
        actionData = encodeURIComponent(actionData);
        url = tp.util.appendParam(url, "actiondata", actionData);

        //获取数据
        tp.ajax({
            url: url,
            success: function (data) {
                console.log("action-log success.");
            },
            error: function (status) {
                console.log("action-log failed.");
            },
            loading: function () {
                console.log('loading');
            }
        });

    }
}